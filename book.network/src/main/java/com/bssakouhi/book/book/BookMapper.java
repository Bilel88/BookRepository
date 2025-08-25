package com.bssakouhi.book.book;

import com.bssakouhi.book.file.FileUtils;
import com.bssakouhi.book.history.BookTransactionHistory;
import org.springframework.stereotype.Service;

@Service
public class BookMapper {

    public Book toBook(BookRequest  request){
        return Book.builder()
                .id(request.id())
                .title(request.title())
                .authorName(request.authorName())
                .synopsis(request.synopsis())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }

    public BooKResponse toBookResponse(Book book) {
        return BooKResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthorName())
                .isbn(book.getIsbn())
                .synopsis(book.getSynopsis())
                .rate(book.getRate())
                .archived(book.isArchived())
                .shareable(book.isShareable())
                .owner(book.getOwner().fullName())
                .cover(FileUtils.reaFileFromLocation(book.getBookCover()))
                .build();
    }

    public BorrowedBooKResponse toBorrowedBookResponse(BookTransactionHistory bookTransactionHistory) {
        return BorrowedBooKResponse.builder()
                .id(bookTransactionHistory.getId())
                .title(bookTransactionHistory.getBook().getTitle())
                .authorName(bookTransactionHistory.getBook().getAuthorName())
                .isbn(bookTransactionHistory.getBook().getIsbn())
                .rate(bookTransactionHistory.getBook().getRate())
                .returned(bookTransactionHistory.isReturned())
                .returnApproved(bookTransactionHistory.isReturnApproved())
                .build();
    }
}
