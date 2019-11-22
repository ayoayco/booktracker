import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    addToLibrary(owner: string, book?: any) {
        this.firestore
            .collection('libraries')
            .doc(owner)
            .collection('books')
            .doc(book.isbn)
            .set({...book, timestamp: new Date()});
    }

    listBooks(owner: string) {
        return this.firestore
            .collection('libraries')
            .doc(owner)
            .collection('books', ref => ref.orderBy('timestamp', 'desc'))
            .snapshotChanges();
    }

    removeFromLibrary(owner: string, book: any) {
        return this.firestore
            .collection('libraries')
            .doc(owner)
            .collection('books')
            .doc(book.payload.doc.id)
            .delete();
    }

    getLibrary(owner: string) {
        return this.firestore
            .collection('libraries')
            .doc(owner)
            .get();
    }
}
