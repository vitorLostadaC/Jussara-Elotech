package com.api.registerpeople.services;

import com.api.registerpeople.repositories.ContactRepository;

public class ContactService {

    final ContactRepository contactRepository;

    public ContactService(ContactRepository peopleRepository) {
        this.contactRepository = peopleRepository;
    }


}
