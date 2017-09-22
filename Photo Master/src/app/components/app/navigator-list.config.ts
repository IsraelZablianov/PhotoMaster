import GetHero from "../../route-components/get-hero/get-hero";
import VideoToGifCreatorContainer from "../../route-components/gif-creator/video-to-gif-container";
import { RouteNavigatorConfig } from "../../shared-types/routes";
import { Crop } from "../../route-components/crop/crop";

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
        component: VideoToGifCreatorContainer
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
        iconAlt: "Crop",
        title: "Crop",
        component: Crop   
    },
];
