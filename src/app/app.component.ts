import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { LibraryService } from './library.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'book-tracker';
    isLoggedIn = true;
    isDialogOpen = false;
    openBookDetails;
    myBooks;

    constructor(
        private libraryService: LibraryService,
        private bookService: BookService
    ) {}

    ngOnInit() {
        this.libraryService.listBooks('ayoayco').subscribe(savedBooks => {
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
        this.libraryService.addToLibrary('ayoayco', book);
        this.bookService.addBook(book);
        console.log('add', book);
    }
    deleteBook(book: any) {
        this.libraryService.removeFromLibrary('ayoayco', book);
    }
    openBook(book: any) {
        console.log('open', book);
        this.openBookDetails = book;
    }
    closeBook(event: any) {
        this.openBookDetails = undefined;
    }
    login(event: any) {
        this.isLoggedIn = true;
    }
}
