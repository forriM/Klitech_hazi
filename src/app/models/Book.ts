/**
 * Model representing books
 */
export interface Book {
    authors: string[];
    characters: string[];
    country: string;
    isbn: string;
    mediaType: string;
    name: string;
    numberOfPages: number;
    povCharacters: string[];
    publisher: string;
    released: string;
    url: string;
}
