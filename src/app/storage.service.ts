import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    addToLocalStorage(key: string, item: any) {
        window.localStorage[key] = JSON.stringify(item);
    }

    getFromLocalStorage(key: string): any {
        return JSON.parse(window.localStorage[key]) || undefined;
    }
}
