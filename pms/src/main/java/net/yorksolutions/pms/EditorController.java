package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/editor")
public class EditorController {
    private final PMSService service;

    @Autowired
    public EditorController(@NonNull PMSService service) {
        this.service = service;
    }

    @GetMapping("/allProcess")
    @CrossOrigin
    public List<Process> getAllProcess() {
        return service.getAllProcess();
    }

    @PostMapping("/createProcess")
    @CrossOrigin
    public Process createProcess(@RequestBody Process process) {
        return service.addProcess(process);
    }

    @PutMapping("/updateProcess/{id}")
    @CrossOrigin
    public Optional<Process> updateProcess(@PathVariable(value = "id") Long processId, @RequestBody Process process) {
        return service.updateProcess(processId, process);
    }

    @DeleteMapping("/deleteProcess/{id}")
    @CrossOrigin
    public void deleteProcess(@PathVariable(value = "id") Long processId) {
        service.deleteProcess(processId);
    }

    public void setService(PMSService service) {
    }
}
