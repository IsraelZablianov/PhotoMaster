export enum GifCreationType {
    ImagesToGif = 1,
    VideoToGif = 2
}

export type GifCreationConfig = VideoToGifConfig;

export interface VideoToGifConfig {
    maxIntervalValue?: number;
    minIntervalValue?: number;
}