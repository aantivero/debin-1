package com.aantivero.debin1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Debin.
 */
@Entity
@Table(name = "debin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Debin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "desde")
    private ZonedDateTime desde;

    @Column(name = "hasta")
    private ZonedDateTime hasta;

    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "monto", precision=10, scale=2)
    private BigDecimal monto;

    @ManyToOne(optional = false)
    @NotNull
    private AliasCBU pagador;

    @ManyToOne(optional = false)
    @NotNull
    private AliasCBU cobrador;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDesde() {
        return desde;
    }

    public Debin desde(ZonedDateTime desde) {
        this.desde = desde;
        return this;
    }

    public void setDesde(ZonedDateTime desde) {
        this.desde = desde;
    }

    public ZonedDateTime getHasta() {
        return hasta;
    }

    public Debin hasta(ZonedDateTime hasta) {
        this.hasta = hasta;
        return this;
    }

    public void setHasta(ZonedDateTime hasta) {
        this.hasta = hasta;
    }

    public Boolean isActivo() {
        return activo;
    }

    public Debin activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public Debin monto(BigDecimal monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public AliasCBU getPagador() {
        return pagador;
    }

    public Debin pagador(AliasCBU aliasCBU) {
        this.pagador = aliasCBU;
        return this;
    }

    public void setPagador(AliasCBU aliasCBU) {
        this.pagador = aliasCBU;
    }

    public AliasCBU getCobrador() {
        return cobrador;
    }

    public Debin cobrador(AliasCBU aliasCBU) {
        this.cobrador = aliasCBU;
        return this;
    }

    public void setCobrador(AliasCBU aliasCBU) {
        this.cobrador = aliasCBU;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Debin debin = (Debin) o;
        if (debin.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, debin.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Debin{" +
            "id=" + id +
            ", desde='" + desde + "'" +
            ", hasta='" + hasta + "'" +
            ", activo='" + activo + "'" +
            ", monto='" + monto + "'" +
            '}';
    }
}
