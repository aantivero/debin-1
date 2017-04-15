package com.aantivero.debin1.repository;

import com.aantivero.debin1.domain.Debin;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Debin entity.
 */
@SuppressWarnings("unused")
public interface DebinRepository extends JpaRepository<Debin,Long> {

}
