import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../../../../services/services/book.service';
import { PageResponseBooKResponse } from '../../../../services/models/page-response-book-response';
import { BooKResponse } from '../../../../services/models';

@Component({
  selector: 'app-my-books',
  standalone: false,
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss'
})
export class MyBooks  implements OnInit{

  bookResponse: PageResponseBooKResponse = {};
   page = 0;
   size = 3;

constructor(
  private bookService: BookService,
  private router: Router
){}

ngOnInit(): void {
 this.findAllBooks();
}

private findAllBooks(){
 this.bookService.findAllBooksByOwner({
  page: this.page,
  size: this.size
  }).subscribe({
  next: (books) => {
    this.bookResponse = books;
   }
  })
}
goToFirstPage(): void{
  this.page = 0;
  this.findAllBooks();
}
goToPreviousPage(): void{
   this.page --;
  this.findAllBooks();
}
goToPage(page: number): void{
   this.page = page;
  this.findAllBooks();
}
goToNextPage(): void{

}
goToLastPage(): void{
    this.page ++;
  this.findAllBooks();
}

get isLastPage(): boolean {
  return this.page == this.bookResponse.totalPages as number - 1;
 }

 borrowBook(book: BooKResponse){
console.log('Book to borrow:', book);
  this.bookService.borrowBook( {
     'book_id': book.id as number
  }).subscribe({
    next: (response) => {
      console.log('Réponse reçue:', response);

    },error: (err) => {
    console.error('Erreur lors de l\'emprunt du livre:', err);
  }
  })
 }

  archiveBook(book: BooKResponse) {
    return this.bookService.updateArchivedStatus( {
      'book_id': book.id as number
    }).subscribe( {
      next: () => {
      book.archived = !book.archived
      },error: (err) => {

        }
      
    });

 }

  shareBook(book: BooKResponse) {
  this.bookService.updateShareableStatus({
    'book_id': book.id as number
  }).subscribe({
    next: () => {
      book.shareable = !book.shareable
    }
  });
 }

  editBook(book: BooKResponse) {
   this.router.navigate(['books', 'manage', book.id]);
 }
}