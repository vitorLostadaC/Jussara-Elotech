package com.api.registerpeople.services;

import com.api.registerpeople.models.PeopleModel;
import com.api.registerpeople.repositories.PeopleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PeopleService {

    final PeopleRepository peopleRepository;

    public PeopleService(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }


    public PeopleModel save(PeopleModel peopleModel) {
        return peopleRepository.save(peopleModel);
    }

    public boolean existsByCpf(String cpf) {
        return peopleRepository.existsByCpf(cpf);
    }

    public Page<PeopleModel> findAll(Pageable pageable) {
        return peopleRepository.findAll(pageable);
    }

    public Optional<PeopleModel> findById(UUID id) {
        return peopleRepository.findById(id);
    }

    @Transactional
    public void delete(PeopleModel peopleModel) {
        peopleRepository.delete(peopleModel);
    }
}
