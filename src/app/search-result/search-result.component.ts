import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    @Input() results = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    getAuthors(book) {
        let authorString = '';

        if (!book || !book.authors) {
            return '';
        }

        if (book.authors.length === 1) {
            authorString = book.authors[0];
        }

        if (book.authors.length > 1) {
            for (let i = 0; i < book.authors.length; i++) {
                authorString += book.authors[i];
                if (i <= book.authors.length - 2) {
                    authorString += ', ';
                }
                if (i === book.authors.length - 2) {
                    authorString += 'and ';
                }
            }
        }
        return book.authors ? `by ${authorString}` : ``;
    }

}
