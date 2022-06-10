package net.yorksolutions.pms;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@ExtendWith(MockitoExtension.class)
public class EditorServiceTest {

    @InjectMocks
    EditorService service;

    @Mock
     private Set<Stage> list;

    @Mock
    ProcessRepository repository;

//    @Test
//    void itShouldListAllProcessesWhenGetAllProcessIsCalled() {
//        Set<Stage> list = (Set<Stage>) mock(Set.class);
//
//    }


}
