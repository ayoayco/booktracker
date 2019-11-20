import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

    @Input() isOpen = false;
    @Output() closeDialog = new EventEmitter();

    constructor() { }
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

}
