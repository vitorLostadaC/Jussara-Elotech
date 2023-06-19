package com.api.registerpeople.repositories;

import com.api.registerpeople.models.PeopleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PeopleRepository extends JpaRepository<PeopleModel, UUID> {
    boolean existsByCpf(String cpf);

}
