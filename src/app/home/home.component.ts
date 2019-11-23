import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @Output() login = new EventEmitter();

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
    }

    authenticate() {
        // this.login.emit();
        this.authenticationService.login()
            .then(_ => this.login.emit(this.authenticationService.user$))
            .catch(err => console.error(err));
    }

}
