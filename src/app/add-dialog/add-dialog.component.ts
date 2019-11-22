import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';

@Component({
    selector: 'app-add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements AfterViewInit, OnInit {

    @Input() isOpen = false;
    @Output() closeDialog = new EventEmitter();
    @Output() onBookSelected = new EventEmitter();
    @ViewChild('searchField') searchField: ElementRef;
    @ViewChild('modal') modal: ElementRef;

    isLoading = false;
    results = undefined;
    previousQuery = '';
    previousSubscription;

    constructor(
        private http: HttpClient,
        private book: BookService
    ) { }
    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    getDisplay() {
        let display = 'none';
        if (this.isOpen) {
            display = 'block';
        }
        return display;
    }

    onCloseClick() {
        this.modal.nativeElement.scrollTop = 0;
        setTimeout(() => {
            this.closeDialog.emit();
        }, 10);
        // this.resetDialog();
    }

    bookSelected(book) {
        this.onBookSelected.emit(book);
    }

    search(event: any) {
        const query = `${encodeURI(event.target.value)}`;
        const url = `https://openlibrary.org/search.json?q=${query}&mode=ebooks`;
        if (query === '') {
            this.results = undefined;
        }
        if (query !== this.previousQuery) {
            this.previousQuery = query;
            this.results = undefined;
        } else {
            return;
        }

        if (!!this.previousSubscription) {
            this.previousSubscription.unsubscribe();
        }

        this.isLoading = true;
        this.previousSubscription = this.http.get(url)
            .subscribe( (res: any) => {
                if (res && res.docs && res.docs.length) {
                    const returnResults = [];

                    res.docs.forEach((book: any) => {
                        let thumbnailUrl = '';
                        const hasIsbn = book.isbn && book.isbn.length;
                        const hasAuthors = book.author_name && book.author_name.length;
                        if (book && hasIsbn && hasAuthors) {
                            const isbn = book.isbn[0];
                            const url2 = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`;
                            this.http.get(url2).subscribe((bookDetails: any) => {
                                const details = bookDetails[`ISBN:${isbn}`];
                                thumbnailUrl = this.book.getHighRes(details.thumbnail_url, 'M');
                                returnResults.push({
                                    authors: this.book.getAuthors(book.author_name),
                                    title: this.book.getTitleCase(book.title),
                                    isbn: book.isbn,
                                    book,
                                    thumbnailUrl
                                });
                            });
                        } else {
                            console.log(`ISBN: ${book.isbn}, authors: ${book.author_name}`, book);
                        }

                    });

                    this.results = returnResults;
                    console.log(this.results);
                } else {
                    this.results = [];
                }
            }, err => {},
            () => {
                this.isLoading = false;
            });
    }

    private resetDialog() {
        this.results = undefined;
        this.searchField.nativeElement.value = '';
    }
}
