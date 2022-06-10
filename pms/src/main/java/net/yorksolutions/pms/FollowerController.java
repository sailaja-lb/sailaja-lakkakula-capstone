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
    public List<ProcessResponse> getAllProcess() {
        return editorService.getAllProcess();
    }
//    @PostMapping("/startProcess")
//    @CrossOrigin
//    public void startProcess() {}
//
//    @PostMapping("/startProcess")
//    @CrossOrigin
//    public void startProcess() {}

}
