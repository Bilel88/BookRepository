import { Component, OnInit } from '@angular/core';
import { BorrowedBooKResponse, FeedbackRequest, PageResponseBorrowedBooKResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: false,
  templateUrl: './borrowed-book-list.html',
  styleUrl: './borrowed-book-list.scss'
})
export class BorrowedBookList implements OnInit{

  borrowedBooks: PageResponseBorrowedBooKResponse = {};
  size: number = 5;
  page: number = 0;
  selectedBooks: BorrowedBooKResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = { bookId: 0, comment: '', note: 0};

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ){

  }
  ngOnInit(): void {
    this.findAllBroowedBooks();
  }

  findAllBroowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe( {
      next: (resp) => {
        this.borrowedBooks = resp;
      }
    })
  }

returnBorrowedBook(book: BorrowedBooKResponse) {
  this.selectedBooks = book;
  this.feedbackRequest.bookId = book.id as number;
}

goToFirstPage(): void{
  this.page = 0;
  this.findAllBroowedBooks();
}
goToPreviousPage(): void{
   this.page --;
  this.findAllBroowedBooks();
}
goToPage(page: number): void{
   this.page = page;
  this.findAllBroowedBooks();
}
goToNextPage(): void{

}
goToLastPage(): void{
    this.page ++;
  this.findAllBroowedBooks();
}

get isLastPage(): boolean {
  return this.page == this.borrowedBooks.totalPages as number - 1;
 }

 returnBook (withFeedback: boolean){
  this.bookService.returnBorrowedBook({
    'book_id': this.selectedBooks?.id as number
  }).subscribe({
    next: () => {
      if(withFeedback){
        this.giveFeedback();
      }
      this.selectedBooks = undefined;
      this.findAllBroowedBooks();
    }
  })
 }
  giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {

      }
    })
  }
}
