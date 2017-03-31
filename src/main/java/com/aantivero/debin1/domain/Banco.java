package com.aantivero.debin1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Banco.
 */
@Entity
@Table(name = "banco")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Banco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "denominacion", nullable = false)
    private String denominacion;

    @NotNull
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @OneToMany(mappedBy = "banco")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Sucursal> sucursals = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public Banco denominacion(String denominacion) {
        this.denominacion = denominacion;
        return this;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public String getCodigo() {
        return codigo;
    }

    public Banco codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Set<Sucursal> getSucursals() {
        return sucursals;
    }

    public Banco sucursals(Set<Sucursal> sucursals) {
        this.sucursals = sucursals;
        return this;
    }

    public Banco addSucursal(Sucursal sucursal) {
        this.sucursals.add(sucursal);
        sucursal.setBanco(this);
        return this;
    }

    public Banco removeSucursal(Sucursal sucursal) {
        this.sucursals.remove(sucursal);
        sucursal.setBanco(null);
        return this;
    }

    public void setSucursals(Set<Sucursal> sucursals) {
        this.sucursals = sucursals;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Banco banco = (Banco) o;
        if (banco.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, banco.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Banco{" +
            "id=" + id +
            ", denominacion='" + denominacion + "'" +
            ", codigo='" + codigo + "'" +
            '}';
    }
}
