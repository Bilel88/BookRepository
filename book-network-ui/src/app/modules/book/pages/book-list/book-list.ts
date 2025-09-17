import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../../../../services/services/book.service';
import { PageResponseBooKResponse } from '../../../../services/models/page-response-book-response';
import { BooKResponse } from '../../../../services/models';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit{

  bookResponse: PageResponseBooKResponse = {};
   page = 0;
   size = 3;
   message: string = '';
   level: string ="success"

constructor(
  private bookService: BookService,
  private router: Router
){}

ngOnInit(): void {
 this.findAllBooks();
}

private findAllBooks(){
 this.bookService.findAllBooks({
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
  this.message = '';
console.log('Book to borrow:', book);
  this.bookService.borrowBook( {
     'book_id': book.id as number
  }).subscribe({
    next: (response) => {
      console.log('Réponse reçue:', response);
      this.level = "success";
        this.message = 'Book successfully added to your list';
    },error: (err) => {
    console.error('Erreur lors de l\'emprunt du livre:', err);
    this.level = "error";
    this.message = 'Erreur lors de l\'emprunt du livre';
  }
  })

 }
}
