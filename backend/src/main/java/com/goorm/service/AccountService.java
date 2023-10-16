package com.goorm.service;

import com.goorm.Repository.AccountRepository;
import com.goorm.domain.Account;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Boolean login(String kakaoId){

        if(!accountRepository.existsAccountByKakaoId(kakaoId)){
            return false;
        }


        return true;
    }

    @Transactional
    public void signUp(String kakaoId,String nickName){

        accountRepository.save(Account.of(kakaoId,nickName));
    }
}
