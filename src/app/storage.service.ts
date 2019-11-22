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
        const data = window.localStorage[key];
        if (data) {
            return JSON.parse(data) || undefined;
        }
        return null;
    }
}
