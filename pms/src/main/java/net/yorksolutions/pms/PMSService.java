package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PMSService {
    final ProcessRepository repository;

    @Autowired
    public PMSService(@NonNull ProcessRepository repository) {
        this.repository = repository;
    }

    public List<Process> getAllProcess() {
        List<Process> processList = repository.findAll();
        return processList;
    }

    public Process addProcess(Process process) {
        return repository.save(new Process(process.title, process.status, process.stages));
    }

    public Process updateProcessWith(Process oldProcess, Process newProcess) {
        oldProcess.title = newProcess.title;
        oldProcess.status = newProcess.status;
        oldProcess.stages = newProcess.stages;
        return oldProcess;
    }

    public Optional<Process> updateProcess(Long processId, Process process) {
        return repository.findById(processId)
                .map(oldProcess -> {
                    Process updatedProcess = updateProcessWith(oldProcess, process);
                    return repository.save(updatedProcess);

                });
    }

    public void deleteProcess(Long processId) {
        repository.deleteById(processId);
    }
}
