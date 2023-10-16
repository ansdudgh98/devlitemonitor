package com.goorm.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GrafanaAdminSession extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "grafana_admin_session_id", unique = true)
    private Long id;

    @Column(name = "session_value")
    private String sessionValue;

    public GrafanaAdminSession(String sessionValue) {
        this.sessionValue = sessionValue;
    }

}
