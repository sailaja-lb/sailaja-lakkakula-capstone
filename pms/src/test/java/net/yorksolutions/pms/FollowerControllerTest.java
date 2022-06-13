package net.yorksolutions.pms;

import org.apache.tomcat.jni.Proc;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
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
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FollowerControllerTest {
    @LocalServerPort
    int port;

    @InjectMocks
    FollowerController controller;

    @MockBean
    PMSService service;

    @Test
    void itShouldListAllProcessesWhenGetAllProcessIsCalled() {
        List<Process> processList = new ArrayList<>();
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "", stages);
        processList.add(p1);
        when(service.getAllProcess()).thenReturn(processList);
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/follower/allProcess";
        final ResponseEntity<Process[]> response = rest.getForEntity(url, Process[].class);
        assertEquals(processList, Arrays.asList(response.getBody()));
    }
}
