import * as React from 'react';
import { SideNavbar, SideNavbarProps, MenuIcon } from '../side-navbar/side-navbar';
import { Link } from 'react-router-dom'
const crop = require("../../../images/crop-images/crop.png");

export interface HeaderProps {
    title: string;
    sideNavbarProps?: SideNavbarProps;
}

export interface HeaderState {
    showSideNav: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            showSideNav: false
        };
    }

    render(): JSX.Element {
        return (
            <div className="header">
                <div className="header-title">
                    {this.props.title}
                </div>
                <MenuIcon onClick={() => { this.openMenu() }} className="menu-icon" />
                <SideNavbar navStyle={{ width: '70%', backgroundColor: '#393939', color: "#fff" }}
                    {...this.props.sideNavbarProps}
                    showNav={this.state.showSideNav}
                    onHideNav={() => { this.closeMenu() }}>
                    <div>
                        <div className="side-nav-header">
                            {this.props.sideNavbarProps && this.props.sideNavbarProps.title || this.props.title}
                        </div>
                        <div className="side-nav-body">
                            <ul className="routes">
                                <li>
                                    {/* <RouteItem></RouteItem> */}
                                    <Link to="/">
                                        <div className="route-item">
                                            <div className="route-item-icon-wrapper">
                                                <img className="route-item-icon-wrapper" src={crop} alt="crop" />
                                            </div>
                                            <div className="route-item-body">
                                                <div className="description">
                                                    Cat & Crop
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </SideNavbar>
            </div>
        );
    }

    openMenu(): void {
        this.setState({
            showSideNav: true
        });
    }

    closeMenu(): void {
        this.setState({
            showSideNav: false
        });
    }
}

