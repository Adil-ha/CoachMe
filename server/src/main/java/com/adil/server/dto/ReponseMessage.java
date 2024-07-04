package com.adil.server.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReponseMessage {
    private String message;
    private Object data;
}
