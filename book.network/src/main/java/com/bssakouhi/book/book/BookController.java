package com.bssakouhi.book.book;

import com.bssakouhi.book.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name = "Book")
public class BookController {

    private final BookService service;

    @PostMapping("/addBook")
    public ResponseEntity<Integer> saveBook (
            @Valid @RequestBody  BookRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.save(request,connectedUser));
    }

    @GetMapping("{book-id}")
    public ResponseEntity<BooKResponse> findById (@PathVariable("book-id") Integer bookId){
        return ResponseEntity.ok(service.findById(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BooKResponse>> findAllBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllBook(page,size,connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BooKResponse>> findAllBooksByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllBooksByOwner(page,size,connectedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedBooKResponse>> findAllBorrowedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllBorrowedBook(page,size,connectedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BorrowedBooKResponse>> findAllReturnedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllReturnedBook(page,size,connectedUser));
    }

    @PatchMapping("/shareable/{book_id}")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("book_id") Integer bookId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.updateShareableStatus(bookId,connectedUser));
    }

    @PatchMapping("/archived/{book_id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("book_id") Integer bookId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.updateArchivedStatus(bookId,connectedUser));
    }

    @PostMapping("/borrow/{book_id}")
    public ResponseEntity<Integer> borrowBook(
            @PathVariable("book_id") Integer bookId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.borrowBook(bookId, connectedUser));
    }

    @PatchMapping("/borrow/return/{book_id}")
    public ResponseEntity<Integer> returnBorrowedBook(
            @PathVariable("book_id") Integer bookId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.returnBorrowedBook(bookId, connectedUser));
    }

    @PatchMapping("/borrow/return/approve/{book_id}")
    public ResponseEntity<Integer> approveReturnBorrowedBook(
            @PathVariable("book_id") Integer bookId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.approveReturnBorrowedBook(bookId, connectedUser));
    }

    @PostMapping(value = "/cover/{book_id}", consumes = "multipart/form-data")
    public ResponseEntity<Integer> uploadBookCoverPicture(
            @PathVariable("book_id") Integer bookId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ){
        service.uploadBookCoverPicture(file, connectedUser, bookId);
        return ResponseEntity.ok(service.approveReturnBorrowedBook(bookId, connectedUser));
    }

}
