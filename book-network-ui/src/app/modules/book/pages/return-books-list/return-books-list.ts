import { Component, OnInit } from '@angular/core';
import { BorrowedBooKResponse, FeedbackRequest, PageResponseBorrowedBooKResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
@Component({
  selector: 'app-return-books',
  standalone: false,
  templateUrl: './return-books-list.html',
  styleUrl: './return-books-list.scss'
})
export class ReturnBooksList implements OnInit {

     returnedBooks: PageResponseBorrowedBooKResponse = {};
     size: number = 5;
     page: number = 0;
     message = '';
     level: 'success' |'error' = 'success';
   
     constructor(
       private bookService: BookService
     ){
   
     }
     ngOnInit(): void {
       this.findAllReturnedBooks();
     }
   
     approvedBookReturn(book: BorrowedBooKResponse) {
      if(!book.returned){
        return;
      }
      this.bookService.approveReturnBorrowedBook({
        'book_id': book.id as number
      }).subscribe( {
        next: () => {
          this.level ='success';
          this.message = 'Book  return approved';
          this.findAllReturnedBooks();
        }
      })
      }
      
     findAllReturnedBooks() {
       this.bookService.findAllReturnedBooks({
         page: this.page,
         size: this.size
       }).subscribe( {
         next: (resp) => {
           this.returnedBooks = resp;
         }
       })
     }
   
   goToFirstPage(): void{
     this.page = 0;
     this.findAllReturnedBooks();
   }
   goToPreviousPage(): void{
      this.page --;
     this.findAllReturnedBooks();
   }
   goToPage(page: number): void{
      this.page = page;
     this.findAllReturnedBooks();
   }
   goToNextPage(): void{
   
   }
   goToLastPage(): void{
       this.page ++;
     this.findAllReturnedBooks();
   }
   
   get isLastPage(): boolean {
     return this.page == this.returnedBooks.totalPages as number - 1;
    }
}