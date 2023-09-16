package com.project.bloomevents.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginDetailsDTO {
    private int loginId;
    private String email;
    private String password;
    private int userId;

    public LoginDetailsDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
