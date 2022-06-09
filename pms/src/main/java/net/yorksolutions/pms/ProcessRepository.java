package net.yorksolutions.pms;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessRepository extends CrudRepository<Process, Long> {
    List<Process> findAll();

    void deleteById(Long id);

}
