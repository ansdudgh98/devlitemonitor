package com.goorm.service.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GrafanaCreateAccountRequest {

    private String email;
    private String login;
    private String name;
    private String password;


}
