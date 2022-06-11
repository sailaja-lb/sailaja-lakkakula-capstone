package net.yorksolutions.pms;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class EditorServiceTest {

    @InjectMocks
    EditorService service;

    @Mock
    ProcessRepository repository;
    @Mock
    StageRepository stageRepository;
//    @Mock
//    ChoiceRepository choiceRepository;
//    @Mock
//    StageResponseRepository stageResponseRepository;
//    @Mock
//    ProcessTokenRepository processTokenRepository;


//    @Test
//    void itShouldReturnResponseWhenCalledGetAllProcess() {
//        List<Process> expectedProcessList = new ArrayList<>();
//        List<ProcessResponse> expectedResponse = new ArrayList<>();
//        List<StageResponse> expectedStageResponse = new ArrayList<>();
//
//
//        choiceList.add(new Choice(1L, "testChoiceText"));
//        stageList.add(new Stage("Test Stage Desc", 1,"multiple", choiceList));
//        expectedProcessList.add(new Process("Test Process", stageList));
//
//
//        when(repository.findAll()).thenReturn(expectedProcessList);
//        List<ProcessResponse> actualProcess = service.getAllProcess();
//        assertEquals(expectedResponse, actualResponse);
//    }

//    @Test
//    void itShouldDeleteAProcessWhenDeleteProcessIsCalled(){
//        ArgumentCaptor<Long> argumentCaptor = ArgumentCaptor.forClass(Long.class);
//        doNothing().when(repository).deleteById(argumentCaptor.capture());
//        service.deleteProcess(10);
//        assertEquals(10, argumentCaptor.getValue());
//
//    }

//    @Test
//    void itShouldReturnProcessIdWhenAddProcessCalled() {
//        List<Stage> stages = new ArrayList<>();
//        List<Process> expectedProcessList = new ArrayList<>();
//        stages.add(new Stage("prompt",1));
//
//        Process process = new Process("Test Process");
//        process.setId(5L);
//
//        ArgumentCaptor<Process> processArgumentCaptor = ArgumentCaptor.forClass(Process.class);
//        when(repository.save(processArgumentCaptor.capture())).thenReturn(process);
//
////        Long returnedProcessId = editorService.addProcess(process);
////        assertEquals(5L, returnedProcessId);
////        assertEquals(process, processArgumentCaptor.getValue());
//    }


}
