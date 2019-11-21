import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'book-tracker';
    isDialogOpen = false;
    myBooks;
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
        console.log('add', book);
    }
    openBook(book) {
        console.log('open', book);
    }
}
