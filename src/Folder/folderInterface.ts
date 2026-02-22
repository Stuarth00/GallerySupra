export interface FolderPhoto {
    id: string;
    previewUrl: string;
}

export interface Folder {
    id: string,
    name: string,
    photos: FolderPhoto[],
}