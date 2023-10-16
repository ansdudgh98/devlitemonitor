package com.goorm.controller.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountCreateReq {
    private String grafanaId;
    private String grafanaPw;
    private String grafanaEmail;
    private String name;


    public AccountCreateReq(String grafanaId, String grafanaPw, String grafanaEmail, String name) {
        this.grafanaId = grafanaId;
        this.grafanaPw = grafanaPw;
        this.grafanaEmail = grafanaEmail;
        this.name = name;
    }
}
