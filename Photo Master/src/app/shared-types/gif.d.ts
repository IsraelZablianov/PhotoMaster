export type Gif = any; 

export interface GifOptions {
    repeat: number;
    quality: number;
    workers: number;
    workerScript: string;
    background: string;
    width: number;
    height: number;
    transparent: string | number;
    dither: boolean;
    debug: boolean;
}