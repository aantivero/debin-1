package com.aantivero.debin1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A AliasCBU.
 */
@Entity
@Table(name = "alias_cbu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AliasCBU implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 22, max = 22)
    @Pattern(regexp = "[0-9]+")
    @Column(name = "cbu", length = 22, nullable = false)
    private String cbu;

    @OneToOne
    @JoinColumn(unique = true)
    private Sucursal sucursal;

    @OneToOne
    @JoinColumn(unique = true)
    private Banco banco;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCbu() {
        return cbu;
    }

    public AliasCBU cbu(String cbu) {
        this.cbu = cbu;
        return this;
    }

    public void setCbu(String cbu) {
        this.cbu = cbu;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public AliasCBU sucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public Banco getBanco() {
        return banco;
    }

    public AliasCBU banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    public User getUser() {
        return user;
    }

    public AliasCBU user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AliasCBU aliasCBU = (AliasCBU) o;
        if (aliasCBU.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, aliasCBU.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AliasCBU{" +
            "id=" + id +
            ", cbu='" + cbu + "'" +
            '}';
    }
}
