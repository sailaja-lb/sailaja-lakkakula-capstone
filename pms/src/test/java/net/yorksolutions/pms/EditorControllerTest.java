package net.yorksolutions.pms;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest( webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EditorControllerTest {

    @LocalServerPort
    int port;

    @InjectMocks
    EditorController controller;

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

    @Test
    void itShouldCreateAProcessWhenCalled() {
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/createProcess";
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "started", stages);
        when(service.addProcess(any())).thenReturn(p1);
        final ResponseEntity<Process> response = rest.postForEntity(url, p1, Process.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(p1, response.getBody());
    }

    @Test
    void itShouldUpdateProcess() {
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title", "", stages);
        p1.setId(2L);
        Process updatedProcess = new Process("Updated Title", "", stages);
        updatedProcess.setId(2L);
        when(service.updateProcess(2L, p1)).thenReturn(Optional.of(updatedProcess));
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/updateProcess/2";
        final ResponseEntity<Process> response = rest.exchange(url, HttpMethod.PUT, new HttpEntity<>(p1), Process.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedProcess, response.getBody());
    }
    @Test
    void itShouldDeleteAProcess() {
        ArgumentCaptor<Long> processIdCaptor = ArgumentCaptor.forClass(Long.class);
        doNothing().when(service).deleteProcess(processIdCaptor.capture());
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/deleteProcess/5";
        rest.delete(url);
        assertEquals(5L, processIdCaptor.getValue());
    }

//    @Test
//    void itShouldGetAllFinishedProcesses() {
//        List<Process> processList = new ArrayList<>();
//        expected.add(new StageResponse());
//        when(service.getAllFinishedProcessFollowings()).thenReturn(expected);
//
//
//        TestRestTemplate rest = new TestRestTemplate();
//        String url = "http://localhost:" + port + "/editor/getFinishedProcessFollowings";
//
//        final ResponseEntity<StageResponse[]> response = rest.getForEntity(url, StageResponse[].class);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//
//        assertEquals(expected, Arrays.asList(response.getBody()));
//    }
}
