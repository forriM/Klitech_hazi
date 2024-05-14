/**
 * Model for coupling filters for books
 */
export interface BookFilter {
    name?: string
    fromReleaseDate?: Date;
    toReleaseDate?: Date
}