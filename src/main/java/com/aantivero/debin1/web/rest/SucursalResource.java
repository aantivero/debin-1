package com.aantivero.debin1.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.aantivero.debin1.domain.Sucursal;

import com.aantivero.debin1.repository.SucursalRepository;
import com.aantivero.debin1.web.rest.util.HeaderUtil;
import com.aantivero.debin1.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Sucursal.
 */
@RestController
@RequestMapping("/api")
public class SucursalResource {

    private final Logger log = LoggerFactory.getLogger(SucursalResource.class);

    private static final String ENTITY_NAME = "sucursal";
        
    private final SucursalRepository sucursalRepository;

    public SucursalResource(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    /**
     * POST  /sucursals : Create a new sucursal.
     *
     * @param sucursal the sucursal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sucursal, or with status 400 (Bad Request) if the sucursal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sucursals")
    @Timed
    public ResponseEntity<Sucursal> createSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to save Sucursal : {}", sucursal);
        if (sucursal.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new sucursal cannot already have an ID")).body(null);
        }
        Sucursal result = sucursalRepository.save(sucursal);
        return ResponseEntity.created(new URI("/api/sucursals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sucursals : Updates an existing sucursal.
     *
     * @param sucursal the sucursal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sucursal,
     * or with status 400 (Bad Request) if the sucursal is not valid,
     * or with status 500 (Internal Server Error) if the sucursal couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sucursals")
    @Timed
    public ResponseEntity<Sucursal> updateSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to update Sucursal : {}", sucursal);
        if (sucursal.getId() == null) {
            return createSucursal(sucursal);
        }
        Sucursal result = sucursalRepository.save(sucursal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sucursal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sucursals : get all the sucursals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sucursals in body
     */
    @GetMapping("/sucursals")
    @Timed
    public ResponseEntity<List<Sucursal>> getAllSucursals(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Sucursals");
        Page<Sucursal> page = sucursalRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sucursals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sucursals/:id : get the "id" sucursal.
     *
     * @param id the id of the sucursal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sucursal, or with status 404 (Not Found)
     */
    @GetMapping("/sucursals/{id}")
    @Timed
    public ResponseEntity<Sucursal> getSucursal(@PathVariable Long id) {
        log.debug("REST request to get Sucursal : {}", id);
        Sucursal sucursal = sucursalRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sucursal));
    }

    /**
     * DELETE  /sucursals/:id : delete the "id" sucursal.
     *
     * @param id the id of the sucursal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sucursals/{id}")
    @Timed
    public ResponseEntity<Void> deleteSucursal(@PathVariable Long id) {
        log.debug("REST request to delete Sucursal : {}", id);
        sucursalRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
