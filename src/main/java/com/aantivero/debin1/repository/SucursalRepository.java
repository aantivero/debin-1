package com.aantivero.debin1.repository;

import com.aantivero.debin1.domain.Banco;
import com.aantivero.debin1.domain.Sucursal;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Sucursal entity.
 */
@SuppressWarnings("unused")
public interface SucursalRepository extends JpaRepository<Sucursal,Long> {

    public Set<Sucursal> findAllByBanco(Banco banco);
}
