export interface FolderPhoto {
    id: string;
    previewUrl: string;
    urls: {
        regular: string;
        small: string;
        full: string;
        raw: string;
    }
    alt_description: string;
    user: {
        name: string;
    }
}

export interface Folder {
    id: string,
    name: string,
    photos: FolderPhoto[],
}