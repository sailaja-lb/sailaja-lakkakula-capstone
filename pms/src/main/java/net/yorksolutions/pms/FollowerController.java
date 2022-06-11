package net.yorksolutions.pms;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follower")
public class FollowerController {
    private final FollowerService service;

    private final EditorService editorService;

    public FollowerController(@NonNull FollowerService service, EditorService editorService) {
        this.service = service;
        this.editorService = editorService;
    }

    @GetMapping("/allProcess")
    @CrossOrigin
    public List<Process> getAllProcess() {
        return editorService.getAllProcess();
    }

    @PutMapping("/startProcess/{id}")
    @CrossOrigin
    public void startProcess(@PathVariable(value = "id") Long processId, @RequestBody Process process) {
        return editorService.updateProcessStatus(processId, );
    }
//    @PostMapping("/startProcess")
//    @CrossOrigin
//    public void startProcess() {}
//
//    @PostMapping("/startProcess")
//    @CrossOrigin
//    public void startProcess() {}

}
