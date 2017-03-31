package com.aantivero.debin1.repository;

import com.aantivero.debin1.domain.AliasCBU;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the AliasCBU entity.
 */
@SuppressWarnings("unused")
public interface AliasCBURepository extends JpaRepository<AliasCBU,Long> {

    @Query("select aliasCBU from AliasCBU aliasCBU where aliasCBU.user.login = ?#{principal.username}")
    List<AliasCBU> findByUserIsCurrentUser();

}
