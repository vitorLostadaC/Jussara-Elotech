package com.api.registerpeople.repositories;

import com.api.registerpeople.models.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactRepository extends JpaRepository<ContactModel, UUID> {
}
