const deadpull = require("../../../images/template-images/deadpull.png");
const spiderMan = require("../../../images/template-images/spider-man.png");
const spiderMan2 = require("../../../images/template-images/spider-man-2.png");
const ironMan = require("../../../images/template-images/iron-man.png");

export interface ImageTemplate {
    imageUrl: string;
    className: string;
}

export const imageTemplates: ImageTemplate[] = [
    {
        imageUrl: deadpull,
        className: "deadpull"
    },
    {
        imageUrl: spiderMan,
        className: "spider-man"
    },
    {
        imageUrl: ironMan,
        className: "iron-man"
    },
    {
        imageUrl: spiderMan2,
        className: "spider-man"
    }
]; 