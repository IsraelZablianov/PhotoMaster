import * as React from "react";
import { Link } from "react-router-dom";
import { RouteNavigatorConfig } from "./navigator-list";

export interface RouteNavigatorProps extends RouteNavigatorConfig {

}

export interface RouteNavigatorState {
    
}

export default class RouteNavigator extends React.Component<RouteNavigatorProps, RouteNavigatorState> {
    render(): JSX.Element {
        return (
            <Link to={this.props.link}>
            <div className="route-item">
                <div className="route-item-icon-wrapper">
                    <img className="route-item-icon-wrapper" src={this.props.icon} alt={this.props.iconAlt} />
                </div>
                <div className="route-item-body">
                    <div className="title">
                        {this.props.title}
                    </div>
                </div>
            </div>
        </Link>
        );
    }
}