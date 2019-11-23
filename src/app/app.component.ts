import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BookService } from './book.service';
import { LibraryService } from './library.service';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'book-tracker';
    isDialogOpen = false;
    openBookDetails;
    userId;
    myBooks;
    booksListSubscription: any;

    constructor(
        private libraryService: LibraryService,
        private bookService: BookService,
        private channgeDetector: ChangeDetectorRef,
        public authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.authenticationService.user$.subscribe(user => {
            this.userId = user.uid;
            this.subscribeBooksList();
        });
    }

    ngOnDestroy() {
        this.booksListSubscription.unsubscribe();
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
        this.libraryService.addToLibrary(this.userId, book);
        this.bookService.addBook(book);
        console.log('add', book);
    }
    deleteBook(book: any) {
        this.libraryService.removeFromLibrary(this.userId, book);
    }
    openBook(book: any) {
        console.log('open', book);
        this.openBookDetails = book;
    }
    closeBook(event: any) {
        this.openBookDetails = undefined;
    }
    subscribeBooksList() {
        if (this.userId && !this.booksListSubscription) {
            this.booksListSubscription = this.libraryService.listBooks(this.userId).subscribe(savedBooks => {
                this.myBooks = savedBooks.map(saved => ({
                    ...saved.payload.doc.data(),
                    payload: saved.payload
                }));
                console.log('updated books', this.myBooks);
                this.channgeDetector.detectChanges();
            });
            console.log(`subscribed to books list of ${this.userId}`);
        }
    }
    login(user: any) {
        console.log('User logged in.');
        user.subscribe(u => {
            this.userId = u.uid;
            this.subscribeBooksList();
        });
        this.channgeDetector.detectChanges();
    }
    logout() {
        this.authenticationService.logout()
            .then(() => console.log('User logged out.'))
            .catch(err => console.error(err));
    }
}
