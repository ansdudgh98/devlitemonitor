package com.goorm.service;

import com.goorm.Repository.AccountRepository;
import com.goorm.Repository.GrafanaAccountRepository;
import com.goorm.controller.request.AccountCreateReq;
import com.goorm.controller.request.GrafanaCreateOrgAndAccountReq;
import com.goorm.domain.Account;
import com.goorm.domain.GrafanaAccount;
import com.goorm.service.request.AccountCreateReqeust;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GrafanaService {

    private final GrafanaApi grafanaApi;
    private final GrafanaAccountRepository grafanaAccountRepository;
    private final AccountRepository accountRepository;

    public String createGrafanaOrgAndAccount(GrafanaCreateOrgAndAccountReq request, String loginId) {
        Integer orgNum = grafanaApi.createOrg(request.getOrgName());
        Integer accountId = grafanaApi.createGrafanaAccount(new AccountCreateReqeust(request.getGrafanaEmail(), request.getGrafanaId(), request.getName(), request.getGrafanaPw()));
        grafanaApi.joinGrafanaAccountToOrgRoleByAdmin(request.getGrafanaId(), orgNum);
        grafanaApi.deleteGrafanaAccountFromMainOrg(accountId);

        Account findAccount = accountRepository.findAccountByKakaoId(loginId);


        grafanaAccountRepository.save(GrafanaAccount.forOrgAdminAccount(accountId, request.getGrafanaId()
                , request.getGrafanaPw(), request.getName(),
                request.getOrgName(), orgNum, findAccount));

        return UUID.randomUUID().toString().substring(0,5);
    }

    public void createGrafanaAccount(AccountCreateReq request, String loginId) {
        Integer accountId = grafanaApi.createGrafanaAccount(new AccountCreateReqeust(request.getGrafanaEmail(), request.getGrafanaId(), request.getName(), request.getGrafanaPw()));
        grafanaApi.deleteGrafanaAccountFromMainOrg(accountId);

        Account findAccount = accountRepository.findAccountByKakaoId(loginId);

        grafanaAccountRepository.save(GrafanaAccount.account(accountId,
                request.getGrafanaId(),
                request.getGrafanaPw(),
                request.getName(),
                findAccount));

    }
}


