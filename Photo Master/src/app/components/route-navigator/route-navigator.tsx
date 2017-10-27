import * as React from "react";
import { Link } from "react-router-dom";
import { RouteNavigatorConfig } from "../../shared-types/routes";

export interface RouteNavigatorProps {
    routeNavigatorConfig: RouteNavigatorConfig;
    onSelect?: (config?: RouteNavigatorConfig) => void;
}

export interface RouteNavigatorState {
    
}

export default class RouteNavigator extends React.Component<RouteNavigatorProps, RouteNavigatorState> {
    render(): JSX.Element {
        const config = this.props.routeNavigatorConfig;
        return config && (
            <Link to={config.link} onClick={() => this.onSelect()}>
            <div className="route-item">
                <div className="route-item-icon-wrapper">
                    <img className="route-item-icon-wrapper" src={config.icon} alt={config.iconAlt} />
                </div>
                <div className="route-item-body">
                    <div className="title">
                        {config.title}
                    </div>
                </div>
            </div>
        </Link>
        );
    }

    onSelect(): void {
        const { onSelect, routeNavigatorConfig } = this.props
        onSelect && onSelect(routeNavigatorConfig);
    }
}