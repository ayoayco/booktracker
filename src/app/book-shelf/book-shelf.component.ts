import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-book-shelf',
    templateUrl: './book-shelf.component.html',
    styleUrls: ['./book-shelf.component.scss']
})
export class BookShelfComponent implements OnInit {
    @Input() results = [];
    @Input() isLoading;
    @Output() bookSelected = new EventEmitter();
    @Output() dialogClosed = new EventEmitter();

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    onBookClick(book) {
        this.bookSelected.emit(book);
        this.dialogClosed.emit();
    }

}
