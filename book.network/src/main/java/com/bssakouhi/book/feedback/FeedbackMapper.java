package com.bssakouhi.book.feedback;

import com.bssakouhi.book.book.Book;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {

    public Feedback toFeedback(FeedbackRequest req){
        return Feedback.builder()
                .note(req.note())
                .comment(req.comment())
                .book(Book.builder()
                        .id(req.bookId())
                        .archived(false)
                        .shareable(false)
                        .build()
                )
                .build();
    }

    public FeedbackResponse toFeedbackResponses(Feedback f, Integer id) {
        return FeedbackResponse.builder()
                .note(f.getNote())
                .comment(f.getComment())
                .ownFeedback(Objects.equals(f.getCreatedBy(),id))
                .build();
    }
}
