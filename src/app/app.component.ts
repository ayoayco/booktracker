import { Component, OnInit } from '@angular/core';
import { StorageService } from './storage.service';

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

    constructor(private storage: StorageService) {}

    ngOnInit() {
        const savedBooks = this.storage.getFromLocalStorage('myBooks');
        if (savedBooks) {
            this.myBooks = savedBooks;
        }
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
        this.storage.addToLocalStorage('myBooks', this.myBooks);
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
