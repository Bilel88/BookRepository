package com.bssakouhi.book.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BooKResponse {

    private  Integer id;

    private  String title;

    private  String authorName;

    private  String isbn;

    private  String synopsis;

    private  String owner;

    private  byte[] cover;

    private  double rate;

    private  boolean archived;

    private  boolean shareable;


}
