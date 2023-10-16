package com.goorm.Repository;

import com.goorm.domain.GrafanaAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrafanaAccountRepository extends JpaRepository<GrafanaAccount, Long> {
}
