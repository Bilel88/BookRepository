import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';

import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-manage-book',
  standalone: false,
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss'
})
export class ManageBook implements OnInit{

  errorMsg: Array<string>= [];
  selectBookCover: any;
  selectedPicture: string | undefined;
    bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(
  private bookService: BookService,
  private router: Router,
  private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.findById({
        'book-id': bookId
      }).subscribe({
        next: (book) =>{
          this.bookRequest ={
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          }
          if(book.cover){
             this.selectedPicture='data:image/jpg;base64,' + book.cover;
          }
        }
      })
    }
  }
  onFileSelected(event: any) {
    this.selectBookCover = event.target.files[0];
    console.log("******onFileSelected****" +this.selectBookCover);
    if(this.selectBookCover){
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      } 
        reader.readAsDataURL(this.selectBookCover);
    }
}

saveBook() {
   console.log("📤 [saveBook] Préparation à l'envoi...");

  // 🔍 Vérification de tous les champs du body
  console.log("📦 Contenu de bookRequest avant envoi :");
  console.log("  • id:", this.bookRequest.id);
  console.log("  • title:", this.bookRequest.title);
  console.log("  • authorName:", this.bookRequest.authorName);
  console.log("  • isbn:", this.bookRequest.isbn);
  console.log("  • synopsis:", this.bookRequest.synopsis);
  console.log("  • shareable:", this.bookRequest.shareable);

  // 🚨 Si body est incomplet ou nul
  if (!this.bookRequest || !this.bookRequest.title || !this.bookRequest.authorName || !this.bookRequest.isbn || !this.bookRequest.synopsis) {
    console.error("❌ [saveBook] Body invalide ou incomplet. Requête annulée.");
    return;
  }

  console.log("✅ [saveBook] Payload prêt à être envoyé :", JSON.stringify(this.bookRequest));
console.log("📤 Payload à envoyer :", JSON.stringify(this.bookRequest));
 this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        console.log("**************");
        this.bookService.uploadBookCoverPicture({
          'book_id': bookId,
          body: {
            file: this.selectBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
