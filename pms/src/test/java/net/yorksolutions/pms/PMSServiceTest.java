package net.yorksolutions.pms;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PMSServiceTest {

    @InjectMocks
    PMSService service;

    @Mock
    ProcessRepository repository;

    //getAllProcess
    @Test
    void itShouldReturnAllProcessWhenCalledGetAllProcess() {
        List<Process> expectedProcessList = new ArrayList<>();
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "", stages);
        expectedProcessList.add(p1);
        when(repository.findAll()).thenReturn(expectedProcessList);
        List<Process> actualProcess = service.getAllProcess();
        assertEquals(expectedProcessList, actualProcess);
    }

    //addProcess
    @Test
    void itShouldReturnNewProcessWhenCalledAddProcess() {
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "", stages);
        ArgumentCaptor<Process> processArgumentCaptor = ArgumentCaptor.forClass(Process.class);
        when(repository.save(processArgumentCaptor.capture())).thenReturn(p1);
        Process actualProcess = service.addProcess(p1);
        assertEquals(p1, actualProcess);
    }

    //updateProcess
    @Test
    void itShouldReturnUpdatedProcessWhenUpdateProcessIsCalled(){
        List<Stage> stages = new ArrayList<>();
        Process p1 = new Process("title1", "", stages);
        p1.setId(1L);
        Process updatedProcess = new Process("Updated title", "", stages);
        updatedProcess.setId(p1.getId());
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        when(repository.findById(longArgumentCaptor.capture())).thenReturn(Optional.of(p1));
        ArgumentCaptor<Process> processArgumentCaptor = ArgumentCaptor.forClass(Process.class);
        when(repository.save(processArgumentCaptor.capture())).thenReturn(p1);
        Optional<Process> actualProcessReturned = service.updateProcess(1L, updatedProcess);
        assertEquals(updatedProcess, actualProcessReturned.get());

    }

    //deleteProcess
    @Test
    void itShouldDeleteProcessWhenDeleteProcessIsCalled() {
        ArgumentCaptor<Long> argumentCaptor = ArgumentCaptor.forClass(Long.class);
        doNothing().when(repository).deleteById(argumentCaptor.capture());
        service.deleteProcess(1L);
        assertEquals(1L, argumentCaptor.getValue());
    }

    //updateProcessWith
    @Test
    void itShouldUpdateProcessDetailsWithOtherProcessDetails() {
        List<Stage> stages = new ArrayList<>();
        Process actual = new Process("title1", "", stages);
        actual.setId(1L);
        Process updated = new Process("Update title", "", stages);
        updated.setId(actual.getId());
        Process expected = service.updateProcessWith(actual, updated);
        assertEquals(expected, updated);

    }

}
