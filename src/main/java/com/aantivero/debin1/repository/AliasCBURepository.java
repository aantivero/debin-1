package com.aantivero.debin1.repository;

import com.aantivero.debin1.domain.AliasCBU;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the AliasCBU entity.
 */
@SuppressWarnings("unused")
public interface AliasCBURepository extends JpaRepository<AliasCBU,Long> {

    @Query("select aliasCBU from AliasCBU aliasCBU where aliasCBU.user.login = ?#{principal.username}")
    List<AliasCBU> findByUserIsCurrentUser();

    Page<AliasCBU> findByUserLogin(String currentUserLogin, Pageable pageable);

    Optional<AliasCBU> findOneByNombre(String nombre);

    Optional<AliasCBU> findOneByCbu(String cbu);
}
