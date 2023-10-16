package com.goorm.service;

import com.goorm.Repository.GrafanaSessionRepository;
import com.goorm.service.request.OrgAccountSetData;
import com.goorm.service.request.AccountCreateReqeust;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class GrafanaApi {

    private final RestTemplate restTemplate;
    private final GrafanaSessionRepository grafanaSessionRepository;
    @Value("${grafana.account.loginId}")
    private String adminId;
    @Value("${grafana.account.loginPw}")
    private String adminPW;
    @Value("${grafana.host.URL}")
    private String hostURL;


    private HttpHeaders createHeader(String sessionValue) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("Cookie", "grafana_session=" + sessionValue);

        return headers;
    }

    public String getGrafanaSession() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        HttpEntity<GrafanaLoginRequestData> entity = new HttpEntity<>(new GrafanaLoginRequestData(adminId, adminPW), headers);

        ResponseEntity<String> exchange = restTemplate.exchange(hostURL + "/login"
                , HttpMethod.POST
                , entity
                , String.class);
        HttpHeaders responseHeaders = exchange.getHeaders();
        List<String> cookies = responseHeaders.get("Set-Cookie");

        String sessionValue;

        for (String s : cookies) {
            if (s.contains("grafana_session=")) {
                sessionValue = extractSessionValueByHeader(s);
                return sessionValue;
            }
        }

        return null;
    }

    private String getGrafanaSessionValue() {
        String sessionValue;
        try {
            sessionValue = grafanaSessionRepository
                    .findGrafanaAdminSession()
                    .get()
                    .getSessionValue();
        } catch (NoSuchElementException e) {
            sessionValue = getGrafanaSession();
        }

        return sessionValue;
    }

    private String extractSessionValueByHeader(String input) {
        int startIndex = input.indexOf("=");

        if (startIndex != -1) {
            // 세미콜론(;)의 인덱스를 찾습니다.
            int endIndex = input.indexOf(";", startIndex);

            if (endIndex != -1) {
                // 부분 문자열을 추출합니다.
                return input.substring(startIndex + 1, endIndex);
            } else {
                throw new IllegalArgumentException("잘못된 세션 값이 입력되었습니다. 그라파나 서버를 확인해보세요.");

            }
        } else {
            throw new IllegalArgumentException("잘못된 세션 값이 입력되었습니다. 그라파나 서버를 확인해보세요.");
        }
    }

    public Integer createOrg(String orgName) {
        HttpHeaders headers = createHeader(getGrafanaSessionValue());
        HttpEntity<OrgRequestData> entity = new HttpEntity<>(new OrgRequestData(orgName), headers);
        ResponseEntity<OrgResponseData> response;
        try {
            response = restTemplate.exchange(hostURL + "/api/orgs", HttpMethod.POST, entity, OrgResponseData.class);
        } catch (NoSuchElementException e) {
            getGrafanaSession();
            response = restTemplate.exchange(hostURL + "/api/orgs", HttpMethod.POST, entity, OrgResponseData.class);
        }

        return response.getBody().getOrgId();
    }

    public Integer createGrafanaAccount(AccountCreateReqeust request) {
        HttpHeaders headers = createHeader(getGrafanaSessionValue());
        HttpEntity<AccountCreateReqeust> createAccountEntity = new HttpEntity<>(request, headers);

        ResponseEntity<CreateAccountResponse> response = restTemplate.exchange(
                hostURL + "/api/admin/users",
                HttpMethod.POST,
                createAccountEntity,
                CreateAccountResponse.class);

        return response.getBody().getId();
    }




    public void joinGrafanaAccountToOrgRoleByAdmin(String grafanaId, int orgNum) {
        HttpHeaders headers = createHeader(getGrafanaSessionValue());
        OrgAccountSetData orgAccountSetData = OrgAccountSetData.createOrgAccountRoleByAdmin(grafanaId);
        HttpEntity<OrgAccountSetData> orgEntity = new HttpEntity<>(orgAccountSetData, headers);
        restTemplate.exchange(hostURL + "/api/orgs/" + orgNum + "/users",
                HttpMethod.POST,
                orgEntity,
                String.class);
    }


    public void deleteGrafanaAccountFromMainOrg(int grafanaAccountId) {
        HttpHeaders headers = createHeader(getGrafanaSessionValue());
        HttpEntity<Object> deleteMainURL = new HttpEntity<>(headers);
        restTemplate.exchange(hostURL + "/api/orgs/" + 1 + "/users/" + grafanaAccountId,
                HttpMethod.DELETE,
                deleteMainURL,
                String.class);
    }


}

@Data
@AllArgsConstructor
class GrafanaLoginRequestData {

    private String user;
    private String password;
}

@Data
@AllArgsConstructor
class OrgRequestData {
    private String name;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class OrgResponseData {
    private int orgId;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class UserCreateResponseData {
    private String message;
    private String userId;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class CreateAccountResponse {
    private int id;
    private String message;
}

