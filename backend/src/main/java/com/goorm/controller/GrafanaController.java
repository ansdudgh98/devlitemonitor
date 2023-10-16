package com.goorm.controller;

import com.goorm.controller.argumentResolver.LoginAccountId;
import com.goorm.controller.request.AccountCreateReq;
import com.goorm.controller.request.GrafanaCreateOrgAndAccountReq;
import com.goorm.service.GrafanaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/grafana")
@RequiredArgsConstructor
public class GrafanaController {

    private final GrafanaService grafanaService;


    @PostMapping("/createOrg")
    public String CreateOrgAndOrgAccountId(@RequestBody GrafanaCreateOrgAndAccountReq grafanaCreateOrgAndAccountReq,
                                         @LoginAccountId String id) {

        log.info("create Account Req : {}", grafanaCreateOrgAndAccountReq.getGrafanaId());
        return grafanaService.createGrafanaOrgAndAccount(grafanaCreateOrgAndAccountReq, id);

    }

    @PostMapping("/createAccount")
    public void createAccount(@RequestBody AccountCreateReq request,
                              @LoginAccountId String id) {
        grafanaService.createGrafanaAccount(request, id);
    }


}
