package com.aantivero.debin1.web.rest;

import com.aantivero.debin1.Debin1App;

import com.aantivero.debin1.domain.Debin;
import com.aantivero.debin1.domain.AliasCBU;
import com.aantivero.debin1.domain.AliasCBU;
import com.aantivero.debin1.repository.DebinRepository;
import com.aantivero.debin1.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.math.BigDecimal;
import java.util.List;

import static com.aantivero.debin1.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DebinResource REST controller.
 *
 * @see DebinResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Debin1App.class)
public class DebinResourceIntTest {

    private static final ZonedDateTime DEFAULT_DESDE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DESDE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_HASTA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HASTA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final BigDecimal DEFAULT_MONTO = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTO = new BigDecimal(2);

    @Autowired
    private DebinRepository debinRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDebinMockMvc;

    private Debin debin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DebinResource debinResource = new DebinResource(debinRepository);
        this.restDebinMockMvc = MockMvcBuilders.standaloneSetup(debinResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Debin createEntity(EntityManager em) {
        Debin debin = new Debin()
            .desde(DEFAULT_DESDE)
            .hasta(DEFAULT_HASTA)
            .activo(DEFAULT_ACTIVO)
            .monto(DEFAULT_MONTO);
        // Add required entity
        AliasCBU pagador = AliasCBUResourceIntTest.createEntity(em);
        em.persist(pagador);
        em.flush();
        debin.setPagador(pagador);
        // Add required entity
        AliasCBU cobrador = AliasCBUResourceIntTest.createEntity(em);
        em.persist(cobrador);
        em.flush();
        debin.setCobrador(cobrador);
        return debin;
    }

    @Before
    public void initTest() {
        debin = createEntity(em);
    }

    @Test
    @Transactional
    public void createDebin() throws Exception {
        int databaseSizeBeforeCreate = debinRepository.findAll().size();

        // Create the Debin
        restDebinMockMvc.perform(post("/api/debins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debin)))
            .andExpect(status().isCreated());

        // Validate the Debin in the database
        List<Debin> debinList = debinRepository.findAll();
        assertThat(debinList).hasSize(databaseSizeBeforeCreate + 1);
        Debin testDebin = debinList.get(debinList.size() - 1);
        assertThat(testDebin.getDesde()).isEqualTo(DEFAULT_DESDE);
        assertThat(testDebin.getHasta()).isEqualTo(DEFAULT_HASTA);
        assertThat(testDebin.isActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testDebin.getMonto()).isEqualTo(DEFAULT_MONTO);
    }

    @Test
    @Transactional
    public void createDebinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = debinRepository.findAll().size();

        // Create the Debin with an existing ID
        debin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDebinMockMvc.perform(post("/api/debins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debin)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Debin> debinList = debinRepository.findAll();
        assertThat(debinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDebins() throws Exception {
        // Initialize the database
        debinRepository.saveAndFlush(debin);

        // Get all the debinList
        restDebinMockMvc.perform(get("/api/debins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(debin.getId().intValue())))
            .andExpect(jsonPath("$.[*].desde").value(hasItem(sameInstant(DEFAULT_DESDE))))
            .andExpect(jsonPath("$.[*].hasta").value(hasItem(sameInstant(DEFAULT_HASTA))))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.intValue())));
    }

    @Test
    @Transactional
    public void getDebin() throws Exception {
        // Initialize the database
        debinRepository.saveAndFlush(debin);

        // Get the debin
        restDebinMockMvc.perform(get("/api/debins/{id}", debin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(debin.getId().intValue()))
            .andExpect(jsonPath("$.desde").value(sameInstant(DEFAULT_DESDE)))
            .andExpect(jsonPath("$.hasta").value(sameInstant(DEFAULT_HASTA)))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDebin() throws Exception {
        // Get the debin
        restDebinMockMvc.perform(get("/api/debins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDebin() throws Exception {
        // Initialize the database
        debinRepository.saveAndFlush(debin);
        int databaseSizeBeforeUpdate = debinRepository.findAll().size();

        // Update the debin
        Debin updatedDebin = debinRepository.findOne(debin.getId());
        updatedDebin
            .desde(UPDATED_DESDE)
            .hasta(UPDATED_HASTA)
            .activo(UPDATED_ACTIVO)
            .monto(UPDATED_MONTO);

        restDebinMockMvc.perform(put("/api/debins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDebin)))
            .andExpect(status().isOk());

        // Validate the Debin in the database
        List<Debin> debinList = debinRepository.findAll();
        assertThat(debinList).hasSize(databaseSizeBeforeUpdate);
        Debin testDebin = debinList.get(debinList.size() - 1);
        assertThat(testDebin.getDesde()).isEqualTo(UPDATED_DESDE);
        assertThat(testDebin.getHasta()).isEqualTo(UPDATED_HASTA);
        assertThat(testDebin.isActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testDebin.getMonto()).isEqualTo(UPDATED_MONTO);
    }

    @Test
    @Transactional
    public void updateNonExistingDebin() throws Exception {
        int databaseSizeBeforeUpdate = debinRepository.findAll().size();

        // Create the Debin

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDebinMockMvc.perform(put("/api/debins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debin)))
            .andExpect(status().isCreated());

        // Validate the Debin in the database
        List<Debin> debinList = debinRepository.findAll();
        assertThat(debinList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDebin() throws Exception {
        // Initialize the database
        debinRepository.saveAndFlush(debin);
        int databaseSizeBeforeDelete = debinRepository.findAll().size();

        // Get the debin
        restDebinMockMvc.perform(delete("/api/debins/{id}", debin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Debin> debinList = debinRepository.findAll();
        assertThat(debinList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Debin.class);
    }
}
