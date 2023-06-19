package com.api.registerpeople.controllers;

import com.api.registerpeople.DTOS.ContactDTO;
import com.api.registerpeople.DTOS.PeopleDTO;
import com.api.registerpeople.models.ContactModel;
import com.api.registerpeople.models.PeopleModel;
import com.api.registerpeople.services.PeopleService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/people")
public class PeopleController {

    final PeopleService peopleService;

    public PeopleController(PeopleService peopleRepository) {
        this.peopleService = peopleRepository;
    }


    @PostMapping
    public ResponseEntity<Object> registerPeople(@RequestBody @Valid PeopleDTO peopleDTO) {

        if (peopleService.existsByCpf(peopleDTO.getCpf())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cpf ja existe.");
        }

        if (peopleDTO.getBirthday().isAfter(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Data de aniversario invalida");
        }

        var peopleModel = new PeopleModel();
        BeanUtils.copyProperties(peopleDTO, peopleModel);

        var contactsDTO = peopleDTO.getContacts();
        List<ContactModel> contacts = new ArrayList<>();

        for (ContactDTO contactDTO : contactsDTO) {
            var contactModel = new ContactModel();
            BeanUtils.copyProperties(contactDTO, contactModel);
            contacts.add(contactModel);
        }

        peopleModel.setContacts(contacts);

        return ResponseEntity.status(HttpStatus.CREATED).body(peopleService.save(peopleModel));
    }

    @GetMapping
    public ResponseEntity<Page<PeopleModel>> getAllPeople(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(peopleService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOnePeople(@PathVariable(value = "id") UUID id) {
        Optional<PeopleModel> peopleModalOptional = peopleService.findById(id);
        if (peopleModalOptional.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa não encontrada");
        }
        return ResponseEntity.status(HttpStatus.OK).body(peopleModalOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePeople(@PathVariable(value = "id") UUID id) {
        Optional<PeopleModel> peopleModalOptional = peopleService.findById(id);
        if (peopleModalOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa não encontrada");
        }
        peopleService.delete(peopleModalOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Pessoa deletada com sucesso!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePeople(@PathVariable(value = "id") UUID id, @RequestBody @Valid PeopleDTO peopleDTO) {
        Optional<PeopleModel> peopleModalOptional = peopleService.findById(id);
        if (peopleModalOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa não encontrada");
        }

        var peopleModel = new PeopleModel();
        peopleModel.setId(peopleModalOptional.get().getId());
        peopleModel.setContacts(peopleModalOptional.get().getContacts());


        return ResponseEntity.status(HttpStatus.OK).body(peopleService.save(peopleModel));
    }


}
