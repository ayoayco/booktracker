import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    @Input() results = [];
    @Input() isLoading;

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    onBookClick(book) {
        console.log(book);
    }

}
