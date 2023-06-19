package com.api.registerpeople.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity()
@Table(name = "contacts")
public class ContactModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = false, length = 255)
    private String name;

    @Column(nullable = false, unique = false)
    private String phone;

    @Column(nullable = false, unique = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "people_id")
    @JsonIgnore
    private PeopleModel people;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public PeopleModel getPeople() {
        return people;
    }

    public void setPeople(PeopleModel people) {
        this.people = people;
    }

    @Override
    public String toString() {
        return "ContactModel{" + '\n' +
                "id=" + id + '\n' +
                ", name='" + name + '\n' +
                ", phone='" + phone + '\n' +
                ", email='" + email + '\n' +
                ", people='" + people + '\n' +
                '}' + '\n';
    }
}
