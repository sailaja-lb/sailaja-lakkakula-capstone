package net.yorksolutions.pms;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends CrudRepository<Stage, Long> {
}
