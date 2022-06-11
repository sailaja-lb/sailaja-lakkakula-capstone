package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EditorService {
    final ProcessRepository repository;
    private Map<UUID, Long> tokenMap = new HashMap<>();

    //final RestTemplate rest;

    @Autowired
    public EditorService(@NonNull ProcessRepository repository) {
        this.repository = repository;
        //rest = new RestTemplate();
    }
//
//    public EditorService(ProcessRepository repository, RestTemplate rest) {
//        this.repository = repository;
//        this.rest = rest;
//    }

//    public List<ProcessResponse> getAllProcess() {
//        List<Process> processList = repository.findAll();
//        List<ProcessResponse> response = new ArrayList<>();
//        for (Process process : processList) {
//            ProcessResponse p = new ProcessResponse();
//            UUID pToken = UUID.randomUUID();
//            p.setToken(pToken);
//            tokenMap.put(pToken, process.getId());
//            p.setTitle(process.getTitle());
//            p.setStatus(process.getStatus());
//            List<StageResponse> stageResponses = new ArrayList<>();
//            for (Stage stage : process.getStages()) {
//                StageResponse s = new StageResponse();
//                UUID sToken = UUID.randomUUID();
//                s.setToken(sToken);
//                tokenMap.put(sToken, stage.getId());
//                s.setAnswer(stage.getAnswer());
//                s.setChoices(stage.getChoices());
//                s.setPrompt(stage.getPrompt());
//                s.setOrder(stage.getOrder());
//                s.setResType(stage.getResType());
//                stageResponses.add(s);
//            }
//            p.setStages(stageResponses);
//            response.add(p);
//        }
//        return response;
//    }

    public List<Process> getAllProcess() {
        List<Process> processList = repository.findAll();
        return processList;
    }

    public void addProcess(Process process) {
        repository.save(new Process(process.title, process.status, process.stages));
    }

    public Process updateProcessWith(Process oldProcess, Process newProcess) {
        oldProcess.title = newProcess.title;
        oldProcess.status = newProcess.status;
        oldProcess.stages = newProcess.stages;
        return oldProcess;
    }

    public Optional<Process> updateProcess(Long processId, Process newProcess) {
//        Long processId = tokenMap.get(token);
        return repository.findById(processId)
                .map(oldProcess -> {
                    Process updatedProcess = updateProcessWith(oldProcess, newProcess);
                    return repository.save(updatedProcess);

                });
    }


    public Optional<Process> updateProcessStatus(Long processId, Process newProcess) {
        return repository.findById(processId).map()
    }

    public void deleteProcess(Long processId) {
//        Long processId = tokenMap.get(token);
        repository.deleteById(processId);
    }
}
