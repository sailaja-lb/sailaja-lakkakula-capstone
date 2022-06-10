package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/editor")
public class EditorController {
    private final EditorService service;

    @Autowired
    public EditorController(@NonNull EditorService service) {
        this.service = service;
    }

    @GetMapping("/allProcess")
    @CrossOrigin
    public List<ProcessResponse> getAllProcess() {
        return service.getAllProcess();
    }

    @PostMapping("/createProcess")
    @CrossOrigin
    public void createProcess(@RequestBody Process process) {
        service.addProcess(process);
    }

    @PutMapping("/updateProcess/{id}")
    @CrossOrigin
    public Optional<Process> updateProcess(@PathVariable(value = "id") Long processId, @RequestBody Process process) {
        return service.updateProcess(processId, process);
    }

    @DeleteMapping("/deleteProcess/{token}")
    @CrossOrigin
    public void deleteProcess(@PathVariable(value = "token") UUID token) {
        service.deleteProcess(token);
    }

    public void setService(EditorService service) {
    }
}
