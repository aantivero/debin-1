package com.aantivero.debin1.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.aantivero.debin1.domain.AliasCBU;

import com.aantivero.debin1.repository.AliasCBURepository;
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
 * REST controller for managing AliasCBU.
 */
@RestController
@RequestMapping("/api")
public class AliasCBUResource {

    private final Logger log = LoggerFactory.getLogger(AliasCBUResource.class);

    private static final String ENTITY_NAME = "aliasCBU";
        
    private final AliasCBURepository aliasCBURepository;

    public AliasCBUResource(AliasCBURepository aliasCBURepository) {
        this.aliasCBURepository = aliasCBURepository;
    }

    /**
     * POST  /alias-cbus : Create a new aliasCBU.
     *
     * @param aliasCBU the aliasCBU to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aliasCBU, or with status 400 (Bad Request) if the aliasCBU has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alias-cbus")
    @Timed
    public ResponseEntity<AliasCBU> createAliasCBU(@Valid @RequestBody AliasCBU aliasCBU) throws URISyntaxException {
        log.debug("REST request to save AliasCBU : {}", aliasCBU);
        if (aliasCBU.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new aliasCBU cannot already have an ID")).body(null);
        }
        AliasCBU result = aliasCBURepository.save(aliasCBU);
        return ResponseEntity.created(new URI("/api/alias-cbus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alias-cbus : Updates an existing aliasCBU.
     *
     * @param aliasCBU the aliasCBU to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aliasCBU,
     * or with status 400 (Bad Request) if the aliasCBU is not valid,
     * or with status 500 (Internal Server Error) if the aliasCBU couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alias-cbus")
    @Timed
    public ResponseEntity<AliasCBU> updateAliasCBU(@Valid @RequestBody AliasCBU aliasCBU) throws URISyntaxException {
        log.debug("REST request to update AliasCBU : {}", aliasCBU);
        if (aliasCBU.getId() == null) {
            return createAliasCBU(aliasCBU);
        }
        AliasCBU result = aliasCBURepository.save(aliasCBU);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aliasCBU.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alias-cbus : get all the aliasCBUS.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of aliasCBUS in body
     */
    @GetMapping("/alias-cbus")
    @Timed
    public ResponseEntity<List<AliasCBU>> getAllAliasCBUS(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of AliasCBUS");
        Page<AliasCBU> page = aliasCBURepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/alias-cbus");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /alias-cbus/:id : get the "id" aliasCBU.
     *
     * @param id the id of the aliasCBU to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aliasCBU, or with status 404 (Not Found)
     */
    @GetMapping("/alias-cbus/{id}")
    @Timed
    public ResponseEntity<AliasCBU> getAliasCBU(@PathVariable Long id) {
        log.debug("REST request to get AliasCBU : {}", id);
        AliasCBU aliasCBU = aliasCBURepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(aliasCBU));
    }

    /**
     * DELETE  /alias-cbus/:id : delete the "id" aliasCBU.
     *
     * @param id the id of the aliasCBU to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alias-cbus/{id}")
    @Timed
    public ResponseEntity<Void> deleteAliasCBU(@PathVariable Long id) {
        log.debug("REST request to delete AliasCBU : {}", id);
        aliasCBURepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
