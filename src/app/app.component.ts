import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'book-tracker';
    isDialogOpen = false;
    openBookDetails;
    myBooks;

    constructor(
        private bookService: BookService
    ) {}

    ngOnInit() {
        this.bookService.listBooks().subscribe(savedBooks => {
            this.myBooks = savedBooks.map(saved => ({
                ...saved.payload.doc.data(),
                payload: saved.payload
            }));
        });
    }

    dialogOpened(event: any) {
        this.isDialogOpen = true;
    }
    dialogClosed(event: any) {
        this.isDialogOpen = false;
    }
    addBook(book: any) {
        if (!this.myBooks) {
            this.myBooks = [];
        }
        this.myBooks.unshift(book);
        this.bookService.addBook(book);
        console.log('add', book);
    }
    openBook(book: any) {
        console.log('open', book);
        this.openBookDetails = book;
    }
    closeBook(event: any) {
        this.openBookDetails = undefined;
    }
}
