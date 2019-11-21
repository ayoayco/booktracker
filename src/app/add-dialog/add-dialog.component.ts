import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements AfterViewInit, OnInit {

    @Input() isOpen = false;
    @Output() closeDialog = new EventEmitter();
    @ViewChild('searchField') searchField: ElementRef;

    results = [];
    previousQuery = '';
    previousSubscription;

    constructor(private http: HttpClient) { }
    ngOnInit() {
    }

    ngAfterViewInit() {
        this.searchField.nativeElement.focus();
    }

    getDisplay() {
        let display = 'none';
        if (this.isOpen) {
            display = 'block';
        }
        return display;
    }

    onCloseClick() {
        this.closeDialog.emit();
    }

    search(event: any) {
        const query = `${encodeURI(event.target.value)}`;
        const url = `https://openlibrary.org/search.json?q=${query}&mode=ebooks`;
        if (query === '') {
            this.results = [];
        }
        if (query !== this.previousQuery) {
            this.previousQuery = query;
        }

        if (!!this.previousSubscription) {
            this.previousSubscription.unsubscribe();
        }

        this.previousSubscription = this.http.get(url)
            .subscribe( (res: any) => {
                if (res && res.docs && res.docs.length) {
                    const returnResults = [];

                    res.docs.forEach((book: any) => {
                        let thumbnailUrl = '';
                        if (book && book.isbn && book.isbn.length) {
                            const isbn = book.isbn[0];
                            const url2 = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`;
                            this.http.get(url2).subscribe((bookDetails: any) => {
                                const details = bookDetails[`ISBN:${isbn}`];
                                thumbnailUrl = this.getMediumThumbnail(details.thumbnail_url);
                                returnResults.push({
                                    authors: book.author_name,
                                    title: book.title,
                                    isbn: book.isbn,
                                    thumbnailUrl
                                });
                            });
                        }

                    });

                    this.results = returnResults;
                    console.log(this.results);
                }
            });
    }

    private getMediumThumbnail(url: string): string {
        return url ? url.replace('-S.', '-M.') : '';
    }

}
