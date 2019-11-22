import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(
        private firestore: AngularFirestore
    ) { }

    addBook(data): Promise<any> {
        return this.firestore
            .collection('books')
            .add({...data, timestamp: new Date()});
    }

    listBooks(): Observable<DocumentChangeAction<any>[]> {
        return this.firestore
            .collection('books', ref => ref.orderBy('timestamp', 'desc'))
            .snapshotChanges();
    }

    deleteBook(book): Promise<void> {
        return this.firestore
            .collection('books')
            .doc(book.payload.doc.id)
            .delete();
    }

    getHighRes(url: string, size: string): string {
        if (url && url.indexOf('-S.') > -1) {
            return url.replace('-S.', `-${size}.`);
        }
        if (url && url.indexOf('-M.') > -1) {
            return url.replace('-M.', `-${size}.`);
        }
    }

    getAuthors(authors) {
        let authorString = '';

        if (!authors) {
            return '';
        }

        if (authors.length === 1) {
            authorString = authors[0];
        }

        if (authors.length > 1) {
            for (let i = 0; i < authors.length; i++) {
                authorString += authors[i];
                if (i <= authors.length - 2) {
                    authorString += ', ';
                }
                if (i === authors.length - 2) {
                    authorString += 'and ';
                }
            }
        }
        return authors ? authorString : ``;
    }

    getTitleCase(title: string): string {
        // TODO: return title case
        return title;
    }


}
