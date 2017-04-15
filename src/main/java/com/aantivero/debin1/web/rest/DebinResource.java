package com.aantivero.debin1.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.aantivero.debin1.domain.Debin;

import com.aantivero.debin1.repository.DebinRepository;
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
 * REST controller for managing Debin.
 */
@RestController
@RequestMapping("/api")
public class DebinResource {

    private final Logger log = LoggerFactory.getLogger(DebinResource.class);

    private static final String ENTITY_NAME = "debin";
        
    private final DebinRepository debinRepository;

    public DebinResource(DebinRepository debinRepository) {
        this.debinRepository = debinRepository;
    }

    /**
     * POST  /debins : Create a new debin.
     *
     * @param debin the debin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new debin, or with status 400 (Bad Request) if the debin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/debins")
    @Timed
    public ResponseEntity<Debin> createDebin(@Valid @RequestBody Debin debin) throws URISyntaxException {
        log.debug("REST request to save Debin : {}", debin);
        if (debin.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new debin cannot already have an ID")).body(null);
        }
        Debin result = debinRepository.save(debin);
        return ResponseEntity.created(new URI("/api/debins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /debins : Updates an existing debin.
     *
     * @param debin the debin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated debin,
     * or with status 400 (Bad Request) if the debin is not valid,
     * or with status 500 (Internal Server Error) if the debin couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/debins")
    @Timed
    public ResponseEntity<Debin> updateDebin(@Valid @RequestBody Debin debin) throws URISyntaxException {
        log.debug("REST request to update Debin : {}", debin);
        if (debin.getId() == null) {
            return createDebin(debin);
        }
        Debin result = debinRepository.save(debin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, debin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /debins : get all the debins.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of debins in body
     */
    @GetMapping("/debins")
    @Timed
    public ResponseEntity<List<Debin>> getAllDebins(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Debins");
        Page<Debin> page = debinRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/debins");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /debins/:id : get the "id" debin.
     *
     * @param id the id of the debin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the debin, or with status 404 (Not Found)
     */
    @GetMapping("/debins/{id}")
    @Timed
    public ResponseEntity<Debin> getDebin(@PathVariable Long id) {
        log.debug("REST request to get Debin : {}", id);
        Debin debin = debinRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(debin));
    }

    /**
     * DELETE  /debins/:id : delete the "id" debin.
     *
     * @param id the id of the debin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/debins/{id}")
    @Timed
    public ResponseEntity<Void> deleteDebin(@PathVariable Long id) {
        log.debug("REST request to delete Debin : {}", id);
        debinRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
