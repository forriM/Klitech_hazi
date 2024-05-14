
/**
 * Model for characters received from the api
 */
export interface Character {
    aliases: string[];
    allegiances: string[];
    books: string[];
    born: string;
    culture: string;
    died: string;
    father: string;
    mother: string;
    name: string;
    playedBy: string[];
    povBooks: any[];
    spouse: string;
    titles: string[];
    tvSeries: string[];
    gender: string;
    url: string;
}

