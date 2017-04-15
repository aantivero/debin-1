package com.aantivero.debin1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.aantivero.debin1.domain.enumeration.Moneda;

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

    @NotNull
    @Size(min = 6, max = 20)
    @Column(name = "nombre", length = 20, nullable = false)
    private String nombre;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "moneda", nullable = false)
    private Moneda moneda;

    @NotNull
    @Column(name = "saldo", precision=10, scale=2, nullable = false)
    private BigDecimal saldo;

    @NotNull
    @Column(name = "debin", nullable = false)
    private Boolean debin;

    @NotNull
    @Column(name = "pagador", nullable = false)
    private Boolean pagador;

    @NotNull
    @Column(name = "cobrador", nullable = false)
    private Boolean cobrador;

    @ManyToOne
    private Sucursal sucursal;

    @ManyToOne
    private Banco banco;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "pagador")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Debin> debinpagadors = new HashSet<>();

    @OneToMany(mappedBy = "cobrador")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Debin> debincobradors = new HashSet<>();

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

    public String getNombre() {
        return nombre;
    }

    public AliasCBU nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public AliasCBU moneda(Moneda moneda) {
        this.moneda = moneda;
        return this;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public AliasCBU saldo(BigDecimal saldo) {
        this.saldo = saldo;
        return this;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public Boolean isDebin() {
        return debin;
    }

    public AliasCBU debin(Boolean debin) {
        this.debin = debin;
        return this;
    }

    public void setDebin(Boolean debin) {
        this.debin = debin;
    }

    public Boolean isPagador() {
        return pagador;
    }

    public AliasCBU pagador(Boolean pagador) {
        this.pagador = pagador;
        return this;
    }

    public void setPagador(Boolean pagador) {
        this.pagador = pagador;
    }

    public Boolean isCobrador() {
        return cobrador;
    }

    public AliasCBU cobrador(Boolean cobrador) {
        this.cobrador = cobrador;
        return this;
    }

    public void setCobrador(Boolean cobrador) {
        this.cobrador = cobrador;
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

    public Set<Debin> getDebinpagadors() {
        return debinpagadors;
    }

    public AliasCBU debinpagadors(Set<Debin> debins) {
        this.debinpagadors = debins;
        return this;
    }

    public AliasCBU addDebinpagador(Debin debin) {
        this.debinpagadors.add(debin);
        debin.setPagador(this);
        return this;
    }

    public AliasCBU removeDebinpagador(Debin debin) {
        this.debinpagadors.remove(debin);
        debin.setPagador(null);
        return this;
    }

    public void setDebinpagadors(Set<Debin> debins) {
        this.debinpagadors = debins;
    }

    public Set<Debin> getDebincobradors() {
        return debincobradors;
    }

    public AliasCBU debincobradors(Set<Debin> debins) {
        this.debincobradors = debins;
        return this;
    }

    public AliasCBU addDebincobrador(Debin debin) {
        this.debincobradors.add(debin);
        debin.setCobrador(this);
        return this;
    }

    public AliasCBU removeDebincobrador(Debin debin) {
        this.debincobradors.remove(debin);
        debin.setCobrador(null);
        return this;
    }

    public void setDebincobradors(Set<Debin> debins) {
        this.debincobradors = debins;
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
            ", nombre='" + nombre + "'" +
            ", moneda='" + moneda + "'" +
            ", saldo='" + saldo + "'" +
            ", debin='" + debin + "'" +
            ", pagador='" + pagador + "'" +
            ", cobrador='" + cobrador + "'" +
            '}';
    }
}
