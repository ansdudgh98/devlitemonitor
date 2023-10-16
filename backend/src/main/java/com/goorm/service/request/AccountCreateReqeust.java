package com.goorm.service.request;

import lombok.Data;

@Data
public class AccountCreateReqeust {
    private String email;
    private String login;
    private String name;
    private String password;

    public AccountCreateReqeust(String email, String login, String name, String password) {
        this.email = email;
        this.login = login;
        this.name = name;
        this.password = password;
    }
}
