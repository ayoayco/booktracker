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
            this.myBooks = savedBooks.map(saved => saved.payload.doc.data());
        });
    }

    dialogOpened() {
        this.isDialogOpen = true;
    }
    dialogClosed() {
        this.isDialogOpen = false;
    }
    addBook(book) {
        if (!this.myBooks) {
            this.myBooks = [];
        }
        this.myBooks.unshift(book);
        this.bookService.addBook(book);
        console.log('add', book);
    }
    openBook(book) {
        console.log('open', book);
        this.openBookDetails = book;
    }
    closeBook() {
        this.openBookDetails = undefined;
    }
}
