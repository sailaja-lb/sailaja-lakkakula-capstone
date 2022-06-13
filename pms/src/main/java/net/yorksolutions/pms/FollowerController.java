package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/follower")
public class FollowerController {

    private final PMSService editorService;

    @Autowired
    public FollowerController(@NonNull PMSService editorService) {
        this.editorService = editorService;
    }

    @GetMapping("/allProcess")
    @CrossOrigin
    public List<Process> getAllProcess() {
        return editorService.getAllProcess();
    }


}
