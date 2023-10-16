package com.goorm.controller;

import com.goorm.controller.response.CommonErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(IllegalArgumentException.class)
    public CommonErrorResponse noSessionError() {
        return new CommonErrorResponse("401", "세션값이 없습니다.");
    }
}
