package com.adil.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
    private Long id;
    private String number;
    private String street;
    private String town;
    private String code;
    private String country;
    private Long userId;
}
