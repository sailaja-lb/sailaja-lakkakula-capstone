package net.yorksolutions.pms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FollowerService {
    final StageRepository repository;

    final RestTemplate rest;

    @Autowired
    public FollowerService(@NonNull StageRepository repository) {
        this.repository = repository;
        rest = new RestTemplate();
    }

    public FollowerService(StageRepository repository, RestTemplate rest) {
        this.repository = repository;
        this.rest = rest;
    }


}
