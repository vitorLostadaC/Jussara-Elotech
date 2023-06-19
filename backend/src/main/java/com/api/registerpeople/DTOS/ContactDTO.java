package com.api.registerpeople.DTOS;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ContactDTO {

    @Size(max = 255)
    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    // TODO tem q validar email
    private String email;

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

    @Override
    public String toString() {
        return "ContactDTO{" +
                "name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
