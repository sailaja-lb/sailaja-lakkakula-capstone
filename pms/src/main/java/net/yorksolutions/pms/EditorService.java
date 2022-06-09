package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class EditorService {
    final ProcessRepository repository;

    final RestTemplate rest;

    @Autowired
    public EditorService(@NonNull ProcessRepository repository) {
        this.repository = repository;
        rest = new RestTemplate();
    }

    public EditorService(ProcessRepository repository, RestTemplate rest) {
        this.repository = repository;
        this.rest = rest;
    }

    public List<Process> getAllProcess() {
        return repository.findAll();
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
        return repository.findById(processId)
                .map(oldProcess -> {
                    Process updatedProcess = updateProcessWith(oldProcess, newProcess);
                    return repository.save(updatedProcess);

                });
    }
    public void deleteProcess(Long processId) {
        repository.deleteById(processId);
    }
}
