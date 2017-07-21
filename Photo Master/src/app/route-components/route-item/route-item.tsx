import * as React from "react";
import { Link } from "react-router-dom";

export interface RouteItemProps {
    linkTo: string;
    icon: string;
    iconAlt?: string;
    title: string;
    description: string;
}

export interface RouteItemState {
    
}

export default class RouteItem extends React.Component<RouteItemProps, RouteItemState> {
    render(): JSX.Element {
        return (
            <Link to={this.props.linkTo}>
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