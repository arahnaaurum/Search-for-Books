export type Book = {
    id: string;
    volumeInfo:  {
        title: string;
        authors: string[];
        description: string;
        categories: string[];
        imageLinks: {
            thumbnail: string;
        }
        
    }
}

export type BookList = {
    items: Book[];
    totalItems: number;
}