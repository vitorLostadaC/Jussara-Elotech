package com.api.registerpeople.DTOS;

import org.hibernate.validator.constraints.br.CPF;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Arrays;

public class PeopleDTO {

    @Size(max = 255)
    @NotBlank
    private String name;

    @Size(max = 11)
    @CPF()
    @NotBlank
    private String cpf;

    // TODO tem q validar que a data nao pode ser maior q hoje
    private LocalDateTime birthday;

    // TODO tem q validar se tem pelo menos 1 contato
    @Valid
    private com.api.registerpeople.DTOS.ContactDTO[] contacts;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDateTime getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDateTime birthday) {
        this.birthday = birthday;
    }

    public ContactDTO[] getContacts() {
        return contacts;
    }

    public void setContacts(ContactDTO[] contacts) {
        this.contacts = contacts;
    }

    @Override
    public String toString() {
        return "PeopleDTO{" +
                "name='" + name + '\'' +
                ", cpf='" + cpf + '\'' +
                ", birthday=" + birthday +
                ", contacts=" + Arrays.toString(contacts) +
                '}';
    }
}
