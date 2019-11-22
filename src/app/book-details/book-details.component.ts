import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../book.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
    @Input() book;
    @Output() closeDetails = new EventEmitter();
    @Output() deleteBook = new EventEmitter();

    constructor(private bookService: BookService) { }

    ngOnInit() {
    }

    delete() {
        this.deleteBook.emit(this.book);
        setTimeout(() => this.closeDetails.emit(), 10);
    }

    onCloseClick() {
        this.closeDetails.emit();
    }

    getDisplay() {
        let display = 'none';
        if (this.book !== undefined) {
            display = 'block';
        }
        return display;
    }

    getInfoUrl(book: any) {
        const url = book.book[`ISBN:${book.isbn}`].info_url;
        return url;
    }

}
