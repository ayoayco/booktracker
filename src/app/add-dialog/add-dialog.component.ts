import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

    @Input() isOpen = false;
    @Output() closeDialog = new EventEmitter();

    results = [];
    previousQuery = '';
    previousSubscription;

    constructor(private http: HttpClient) { }
    ngOnInit() {
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
        const url = `https://openlibrary.org/search.json?q=${query}&limit=10&mode=ebooks`;
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
                    this.results = res.docs.map((book: any) => ({
                        authors: book.author_name,
                        title: book.title,
                        isbn: book.isbn
                    }));
                    console.log(this.results);
                }
            });
    }

}
