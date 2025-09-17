import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth-guard';

import { Main } from '../../modules/book/pages/main/main'
import { BookList } from '../../modules/book/pages/book-list/book-list'
import { MyBooks } from './pages/my-books/my-books';
import { ManageBook } from './pages/manage-book/manage-book';
import { BorrowedBookList } from './pages/borrowed-book-list/borrowed-book-list';
import { ReturnBooksList } from './pages/return-books-list/return-books-list';

const routes: Routes = [
    {
    path: '',
    component: Main,
    canActivate: [authGuard],
    children: [
    {
      path: '',
      component: BookList,
      canActivate: [authGuard]
    },
    {
      path: 'my-books',
      component: MyBooks,
      canActivate: [authGuard]
    },
    {
      path: 'manage',
      component: ManageBook,
      canActivate: [authGuard]
    },
    {
      path: 'manage/:bookId',
      component: ManageBook,
      canActivate: [authGuard]
    },
    {
      path: 'my-borrowed-books',
      component: BorrowedBookList
    },
    {
      path: 'my-returned-books',
      component: ReturnBooksList,
      canActivate: [authGuard]
    }
  ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
