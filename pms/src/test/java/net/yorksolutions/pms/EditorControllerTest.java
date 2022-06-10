package net.yorksolutions.pms;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EditorControllerTest {

    @LocalServerPort
    int port;

    @Autowired
    EditorController controller;

    @Mock
    EditorService service;

    @BeforeEach
    void setup() {
        controller.setService(service);
    }

//    @Test
//    void itShouldListAllProcessesWhenGetAllProcessIsCalled() {
//        TestRestTemplate rest = new TestRestTemplate();
//        String url = "http://localhost:" + port + "/allProcess";
//        when(service.getAllProcess()).thenReturn(token);
//        final ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//    }

//    @Test
//    void itShouldDeleteAProcessWithGivenIdWhenCalled() {
//        TestRestTemplate rest = new TestRestTemplate();
//        final Long id = 1L;
//        String url = "http://localhost:" + port + "/deleteProcess/{id}";
//        doThrow(new ResponseStatusException(HttpStatus.ACCEPTED)).when(service).deleteProcess(id);
//        final ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
//        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
//    }

}
