import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
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
