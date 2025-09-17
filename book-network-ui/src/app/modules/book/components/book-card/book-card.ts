import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooKResponse } from '../../../../services/models/book-response';

@Component({
  selector: 'app-book-card',
  standalone: false,
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})

export class BookCard {
  private _book: BooKResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;

  get book(): BooKResponse {
    return this._book;
  }

  @Input()
   set book(value: BooKResponse) {
      this._book = value;
  }

  get bookCover(): string | undefined {
  if(this._book.cover){
    console.log("******************");
   return 'data:image/png;base64,' + this._book.cover;
   }
   return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  @Output() private share: EventEmitter<BooKResponse> = new EventEmitter<BooKResponse>();
  
  @Output() private archive: EventEmitter<BooKResponse> = new EventEmitter<BooKResponse>();
  
  @Output() private addToWaitingList: EventEmitter<BooKResponse> = new EventEmitter<BooKResponse>();
  
  @Output()  borrow: EventEmitter<BooKResponse> = new EventEmitter<BooKResponse>();
  
  @Output() private edit: EventEmitter<BooKResponse> = new EventEmitter<BooKResponse>();
  
  @Output() private datails: EventEmitter<BooKResponse> = new EventEmitter<BooKResponse>();
  


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }



  onShowDetails(): void{
    this.datails.emit(this._book)
  }

  onBorrow(): void{
     console.log("******BORROW CLICKED*******");
    this.borrow.emit(this.book)
  }

  onAddToWaitingList(): void{
    this.addToWaitingList.emit(this._book)
  }

  onEdit(): void{
    this.edit.emit(this._book)
  }

  onShare(): void{
    this.share.emit(this._book)
  }

  onArchive(): void{
    this.archive.emit(this._book)
  }

}
