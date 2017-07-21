import GetHero from "../../route-components/get-hero/get-hero";

const crop = require("../../../images/icon-images/crop.png");
const hero = require("../../../images/template-images/spider-man.png");

export interface RouteNavigatorConfig {
    link: string;
    icon: string;
    iconAlt?: string;
    title: string;
    description?: string;
}
export interface RouteItemConfig {
    component?: React.ComponentType;
}

type NavigatorListConfig = RouteItemConfig & RouteNavigatorConfig;

export const navigatorList: NavigatorListConfig[] = [
    {
        link: "/",
        icon: crop,
        iconAlt: "Cat & Crop",
        title: "Cat & Crop"   
    },
    {
        link: "/get-hero",
        icon: hero,
        iconAlt: "Hero",
        title: "Get A Hero",
        component: GetHero
    }
];
