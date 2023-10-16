package com.goorm.controller.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GrafanaCreateOrgAndAccountReq {

    private String grafanaId;
    private String grafanaPw;
    private String grafanaEmail;
    private String name;
    private String orgName;

    public GrafanaCreateOrgAndAccountReq(String grafanaId, String grafanaPw, String grafanaEmail, String name, String orgName) {
        this.grafanaId = grafanaId;
        this.grafanaPw = grafanaPw;
        this.grafanaEmail = grafanaEmail;
        this.name = name;
        this.orgName = orgName;
    }
}
