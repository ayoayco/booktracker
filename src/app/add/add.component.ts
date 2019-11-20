import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    @Output() openDialog = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onClick() {
        // open add dialog
        this.openDialog.emit();
    }

}
