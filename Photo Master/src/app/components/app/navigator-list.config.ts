import GetHero from "../../route-components/get-hero/get-hero";
import GifCreator from "../../route-components/gif-creator/gif-creator";
import { RouteNavigatorConfig } from "../../shared-types/routes";

const crop = require("../../../images/icon-images/crop.png");
const gif = require("../../../images/icon-images/gif3.png");
const hero = require("../../../images/template-images/deadpull.png");

export interface RouteItemConfig {
    component?: React.ComponentType;
}

type NavigatorListConfig = RouteItemConfig & RouteNavigatorConfig;

export const navigatorList: NavigatorListConfig[] = [
    {
        link: "/gif-creator",
        icon: gif,
        iconAlt: "GIF",
        title: "Make A GIF",
        component: GifCreator
    },
    {
        link: "/get-hero",
        icon: hero,
        iconAlt: "Hero",
        title: "Get A Hero",
        component: GetHero
    },
    {
        link: "/",
        icon: crop,
        iconAlt: "Cat & Crop",
        title: "Cat & Crop"   
    },
];
