package com.goorm.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final AccountService accountService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();

        // nameAttributeKey
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        String nickName = extractNickName(attributes.get("properties").toString());
        String id = attributes.get("id").toString();

        log.info("nickname: {}",nickName);
        log.info("id:{}",id);


        if (!accountService.login(id)) {
            accountService.signUp(id, nickName);
        }

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("USER"))
                , attributes
                , userNameAttributeName);
    }

    private String extractNickName(String input) {
        int startIndex = input.indexOf("{nickname=");

        if (startIndex != -1) {
            // "{nickname=" 이후의 문자열을 추출
            String substring = input.substring(startIndex + "{nickname=".length());

            // "}" 문자열을 찾기
            int endIndex = substring.indexOf("}");

            if (endIndex != -1) {
                // "}" 이전의 문자열을 추출
                return substring.substring(0, endIndex);
            }
        }

        return null;
    }

}
