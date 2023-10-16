package com.goorm.Repository;

import com.goorm.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    boolean existsAccountByKakaoId(String kakaoId);
    @Query(value = "select a from Account a where a.kakaoId = :kakaoId ")
    Account findAccountByKakaoId(@Param("kakaoId") String kakaoId);

}
