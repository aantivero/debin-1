package com.aantivero.debin1.repository;

import com.aantivero.debin1.domain.Sucursal;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Sucursal entity.
 */
@SuppressWarnings("unused")
public interface SucursalRepository extends JpaRepository<Sucursal,Long> {

}
