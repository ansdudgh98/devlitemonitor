package com.goorm.Repository;

import com.goorm.domain.GrafanaAdminSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrafanaSessionRepository extends JpaRepository<GrafanaAdminSession, Long> {

    @Query("select g from GrafanaAdminSession g order by g.createdDate desc limit 1")
    Optional<GrafanaAdminSession> findGrafanaAdminSession();

}
