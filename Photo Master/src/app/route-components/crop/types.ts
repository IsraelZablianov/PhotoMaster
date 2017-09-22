export interface ImageSize {
    w: number,// selection width,
    h: number,// selection height,
    l: number,// selection offsetLeft,
    t: number,// selection offsetTop
}

export interface  CurrentCropStateObject {
    0: string, //imageObject
    1: ImageSize
}