export interface Position2D {
    x: number;
    y: number;
}

export interface AvatarEditor {
    getImageScaledToCanvas: () => HTMLCanvasElement;
    getCroppingRect: () => any;
}