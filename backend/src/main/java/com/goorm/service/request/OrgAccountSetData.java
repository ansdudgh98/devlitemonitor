package com.goorm.service.request;

import lombok.Data;

@Data
public class OrgAccountSetData {
    private String loginOrEmail;
    private String role;

    private OrgAccountSetData(String loginOrEmail,String role) {
        this.loginOrEmail = loginOrEmail;
        this.role = role;
    }

    public static OrgAccountSetData createOrgAccountRoleByAdmin(String loginOrEmail){
        return new OrgAccountSetData(loginOrEmail,"admin");
    }

}
