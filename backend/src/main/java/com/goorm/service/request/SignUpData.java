package com.goorm.service.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignUpData {

    private String  name;
    private String email;
    private String login;
    private String password;

}
