package com.goorm.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String redirectToClient(HttpSession session, HttpServletResponse response) {

        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);
        return "redirect:https://front.devlitemonitor.com";

    }


    @GetMapping("/sessioncheck")
    @ResponseBody
    public void sessionCheck(HttpSession session) {

        String id = (String) session.getAttribute("id");

        if (id == null) {
            throw new IllegalArgumentException();
        }

    }

    @GetMapping("/check1")
    @ResponseBody
    public String check() {
        return "ok";
    }



}
