package com.goorm.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "account_id", unique = true)
    private Long id;

    @Column(name = "kakao_id", unique = true)
    private String kakaoId;

    @Column(name = "profile_name", unique = true)
    private String profileName;

    @Builder
    private Account(String kakaoId, String profileName) {
        this.kakaoId = kakaoId;
        this.profileName = profileName;
    }

    public static Account of(String kakaoId,String profileName){
        return Account.builder()
                .kakaoId(kakaoId)
                .profileName(profileName).build();
    }


}
