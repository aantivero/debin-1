package com.aantivero.debin1.web.rest;

import com.aantivero.debin1.Debin1App;

import com.aantivero.debin1.domain.AliasCBU;
import com.aantivero.debin1.repository.AliasCBURepository;
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
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.aantivero.debin1.domain.enumeration.Moneda;
/**
 * Test class for the AliasCBUResource REST controller.
 *
 * @see AliasCBUResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Debin1App.class)
public class AliasCBUResourceIntTest {

    private static final String DEFAULT_CBU = "8";
    private static final String UPDATED_CBU = "16";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Moneda DEFAULT_MONEDA = Moneda.PESO;
    private static final Moneda UPDATED_MONEDA = Moneda.DOLAR;

    private static final BigDecimal DEFAULT_SALDO = new BigDecimal(1);
    private static final BigDecimal UPDATED_SALDO = new BigDecimal(2);

    private static final Boolean DEFAULT_DEBIN = false;
    private static final Boolean UPDATED_DEBIN = true;

    private static final Boolean DEFAULT_PAGADOR = false;
    private static final Boolean UPDATED_PAGADOR = true;

    private static final Boolean DEFAULT_COBRADOR = false;
    private static final Boolean UPDATED_COBRADOR = true;

    @Autowired
    private AliasCBURepository aliasCBURepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAliasCBUMockMvc;

    private AliasCBU aliasCBU;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AliasCBUResource aliasCBUResource = new AliasCBUResource(aliasCBURepository);
        this.restAliasCBUMockMvc = MockMvcBuilders.standaloneSetup(aliasCBUResource)
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
    public static AliasCBU createEntity(EntityManager em) {
        AliasCBU aliasCBU = new AliasCBU()
            .cbu(DEFAULT_CBU)
            .nombre(DEFAULT_NOMBRE)
            .moneda(DEFAULT_MONEDA)
            .saldo(DEFAULT_SALDO)
            .debin(DEFAULT_DEBIN)
            .pagador(DEFAULT_PAGADOR)
            .cobrador(DEFAULT_COBRADOR);
        return aliasCBU;
    }

    @Before
    public void initTest() {
        aliasCBU = createEntity(em);
    }

    @Test
    @Transactional
    public void createAliasCBU() throws Exception {
        int databaseSizeBeforeCreate = aliasCBURepository.findAll().size();

        // Create the AliasCBU
        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isCreated());

        // Validate the AliasCBU in the database
        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeCreate + 1);
        AliasCBU testAliasCBU = aliasCBUList.get(aliasCBUList.size() - 1);
        assertThat(testAliasCBU.getCbu()).isEqualTo(DEFAULT_CBU);
        assertThat(testAliasCBU.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAliasCBU.getMoneda()).isEqualTo(DEFAULT_MONEDA);
        assertThat(testAliasCBU.getSaldo()).isEqualTo(DEFAULT_SALDO);
        assertThat(testAliasCBU.isDebin()).isEqualTo(DEFAULT_DEBIN);
        assertThat(testAliasCBU.isPagador()).isEqualTo(DEFAULT_PAGADOR);
        assertThat(testAliasCBU.isCobrador()).isEqualTo(DEFAULT_COBRADOR);
    }

    @Test
    @Transactional
    public void createAliasCBUWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aliasCBURepository.findAll().size();

        // Create the AliasCBU with an existing ID
        aliasCBU.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCbuIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setCbu(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setNombre(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMonedaIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setMoneda(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSaldoIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setSaldo(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDebinIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setDebin(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPagadorIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setPagador(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCobradorIsRequired() throws Exception {
        int databaseSizeBeforeTest = aliasCBURepository.findAll().size();
        // set the field null
        aliasCBU.setCobrador(null);

        // Create the AliasCBU, which fails.

        restAliasCBUMockMvc.perform(post("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isBadRequest());

        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAliasCBUS() throws Exception {
        // Initialize the database
        aliasCBURepository.saveAndFlush(aliasCBU);

        // Get all the aliasCBUList
        restAliasCBUMockMvc.perform(get("/api/alias-cbus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aliasCBU.getId().intValue())))
            .andExpect(jsonPath("$.[*].cbu").value(hasItem(DEFAULT_CBU.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].moneda").value(hasItem(DEFAULT_MONEDA.toString())))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.intValue())))
            .andExpect(jsonPath("$.[*].debin").value(hasItem(DEFAULT_DEBIN.booleanValue())))
            .andExpect(jsonPath("$.[*].pagador").value(hasItem(DEFAULT_PAGADOR.booleanValue())))
            .andExpect(jsonPath("$.[*].cobrador").value(hasItem(DEFAULT_COBRADOR.booleanValue())));
    }

    @Test
    @Transactional
    public void getAliasCBU() throws Exception {
        // Initialize the database
        aliasCBURepository.saveAndFlush(aliasCBU);

        // Get the aliasCBU
        restAliasCBUMockMvc.perform(get("/api/alias-cbus/{id}", aliasCBU.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aliasCBU.getId().intValue()))
            .andExpect(jsonPath("$.cbu").value(DEFAULT_CBU.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.moneda").value(DEFAULT_MONEDA.toString()))
            .andExpect(jsonPath("$.saldo").value(DEFAULT_SALDO.intValue()))
            .andExpect(jsonPath("$.debin").value(DEFAULT_DEBIN.booleanValue()))
            .andExpect(jsonPath("$.pagador").value(DEFAULT_PAGADOR.booleanValue()))
            .andExpect(jsonPath("$.cobrador").value(DEFAULT_COBRADOR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAliasCBU() throws Exception {
        // Get the aliasCBU
        restAliasCBUMockMvc.perform(get("/api/alias-cbus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAliasCBU() throws Exception {
        // Initialize the database
        aliasCBURepository.saveAndFlush(aliasCBU);
        int databaseSizeBeforeUpdate = aliasCBURepository.findAll().size();

        // Update the aliasCBU
        AliasCBU updatedAliasCBU = aliasCBURepository.findOne(aliasCBU.getId());
        updatedAliasCBU
            .cbu(UPDATED_CBU)
            .nombre(UPDATED_NOMBRE)
            .moneda(UPDATED_MONEDA)
            .saldo(UPDATED_SALDO)
            .debin(UPDATED_DEBIN)
            .pagador(UPDATED_PAGADOR)
            .cobrador(UPDATED_COBRADOR);

        restAliasCBUMockMvc.perform(put("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAliasCBU)))
            .andExpect(status().isOk());

        // Validate the AliasCBU in the database
        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeUpdate);
        AliasCBU testAliasCBU = aliasCBUList.get(aliasCBUList.size() - 1);
        assertThat(testAliasCBU.getCbu()).isEqualTo(UPDATED_CBU);
        assertThat(testAliasCBU.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAliasCBU.getMoneda()).isEqualTo(UPDATED_MONEDA);
        assertThat(testAliasCBU.getSaldo()).isEqualTo(UPDATED_SALDO);
        assertThat(testAliasCBU.isDebin()).isEqualTo(UPDATED_DEBIN);
        assertThat(testAliasCBU.isPagador()).isEqualTo(UPDATED_PAGADOR);
        assertThat(testAliasCBU.isCobrador()).isEqualTo(UPDATED_COBRADOR);
    }

    @Test
    @Transactional
    public void updateNonExistingAliasCBU() throws Exception {
        int databaseSizeBeforeUpdate = aliasCBURepository.findAll().size();

        // Create the AliasCBU

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAliasCBUMockMvc.perform(put("/api/alias-cbus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aliasCBU)))
            .andExpect(status().isCreated());

        // Validate the AliasCBU in the database
        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAliasCBU() throws Exception {
        // Initialize the database
        aliasCBURepository.saveAndFlush(aliasCBU);
        int databaseSizeBeforeDelete = aliasCBURepository.findAll().size();

        // Get the aliasCBU
        restAliasCBUMockMvc.perform(delete("/api/alias-cbus/{id}", aliasCBU.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AliasCBU> aliasCBUList = aliasCBURepository.findAll();
        assertThat(aliasCBUList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AliasCBU.class);
    }
}
