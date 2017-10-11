export interface DynamicModalEffects {
    ScaleUp: Effect;
    SlideFromRight: Effect;
    SlideFromBottom: Effect;
    Newspaper: Effect;
    Fall: Effect;
    SideFall: Effect;
    FlipHorizontal3D: Effect;
    FlipVertical3D: Effect;
    Sign3D: Effect;
    SuperScaled: Effect;
    RotateFromBottom3D: Effect;
    RotateFromLeft3D: Effect;
}

export interface Effect {
    transition: {// transition for the modal window
        property: string,
        duration: number,//miliseconds
        timingfunction: string
    },
    begin: {//beginning style of transition
        [key: string]: string;
    },
    end: {// end style of transition
        [key: string]: string;
    }
}

export interface ModalStyle {
    overlay?: {
        [key: string]: string;
    },
    content?: {
        [key: string]: string;
    }
}