package net.yorksolutions.pms;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest( webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EditorControllerTest {

    @LocalServerPort
    int port;

    @InjectMocks
    EditorController editorController;

    @MockBean
    PMSService service;

    @BeforeEach
    void setup() {
        Mockito.reset(service);
    }

    @Test
    void itShouldListAllProcessesWhenGetAllProcessIsCalled() {
        List<Process> processList = new ArrayList<>();
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "", stages);
        processList.add(p1);
        when(service.getAllProcess()).thenReturn(processList);
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/allProcess";
        final ResponseEntity<Process[]> response = rest.getForEntity(url, Process[].class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(processList, Arrays.asList(response.getBody()));
    }

    //    @Test
//    void itShouldDeleteAProcessWithGivenIdWhenCalled() {
//        TestRestTemplate rest = new TestRestTemplate();
//        final Long id = 1L;
//        String url = "http://localhost:" + port + "/deleteProcess/{id}";
//        doThrow(new ResponseStatusException(HttpStatus.ACCEPTED)).when(service).deleteProcess(id);
//        final ResponseEntity<Void> response = rest.delete(url);
//        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
//    }
    @Test
    void itShouldCreateAProcessWhenCalled() {
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/createProcess";
//        List<Process> processList = new ArrayList<>();
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "started", stages);
//        processList.add(p1);
        when(service.addProcess(any())).thenReturn(p1);
        final ResponseEntity<Process> response = rest.postForEntity(url, p1, Process.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println(port);
        assertEquals(p1, response.getBody());
    }

}
