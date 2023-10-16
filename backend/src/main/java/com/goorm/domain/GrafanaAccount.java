package com.goorm.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GrafanaAccount extends BaseEntity {

    @Id
    @Column(name = "grafana_account_id", unique = true)
    private Integer id;

    @Column(name = "login_id", unique = true)
    private String loginId;

    @Column(name = "password")
    private String password;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "org", unique = true)
    private String org;

    @Column(name = "org_num", unique = true)
    private Integer orgNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @Builder
    private GrafanaAccount(Integer id, String loginId, String password, String name, String org, Integer orgNum, Account account) {
        this.id = id;
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.org = org;
        this.orgNum = orgNum;
        this.account = account;
    }


    public static GrafanaAccount forOrgAdminAccount(Integer id, String loginId, String password,
                                                    String name, String org, Integer orgNum, Account account) {
        return GrafanaAccount.builder()
                .id(id)
                .loginId(loginId)
                .password(password)
                .name(name)
                .org(org)
                .orgNum(orgNum)
                .account(account).build();
    }


    public static GrafanaAccount account(Integer id, String loginId, String password,
                                         String name, Account account) {
        return GrafanaAccount.builder()
                .id(id)
                .loginId(loginId)
                .password(password)
                .name(name)
                .org(null)
                .orgNum(null)
                .account(account).build();
    }
}
