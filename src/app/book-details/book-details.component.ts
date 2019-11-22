import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../book.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
    @Input() book;
    @Output() closeDetails = new EventEmitter();

    constructor(private bookService: BookService) { }

    ngOnInit() {
    }

    onCloseClick() {
        this.closeDetails.emit();
    }

    getDisplay() {
        let display = 'none';
        if (this.book !== undefined) {
            display = 'block';
        }
        return display;
    }

}
