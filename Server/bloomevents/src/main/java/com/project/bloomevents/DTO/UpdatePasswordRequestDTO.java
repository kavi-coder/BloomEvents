package com.project.bloomevents.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequestDTO {
    private String oldPw;
    private String newPw;
}
