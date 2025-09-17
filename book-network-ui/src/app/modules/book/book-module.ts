import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing-module';
import { Main } from './pages/main/main';
import { Menu } from './components/menu/menu';
import { BookList } from './pages/book-list/book-list';
import { BookCard } from './components/book-card/book-card';
import { Rating } from './components/rating/rating';
import { MyBooks } from './pages/my-books/my-books';
import { ManageBook } from './pages/manage-book/manage-book';
import { FormsModule } from '@angular/forms';
import { BorrowedBookList } from './pages/borrowed-book-list/borrowed-book-list';
import { ReturnBooksList } from './pages/return-books-list/return-books-list';


@NgModule({
  declarations: [
    Main,
    Menu,
    BookList,
    BookCard,
    Rating,
    MyBooks,
    ManageBook,
    BorrowedBookList,
    ReturnBooksList
  ],
  imports: [
    FormsModule,
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
