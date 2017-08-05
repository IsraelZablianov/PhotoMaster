import * as React from 'react';
import { SideNavbar, SideNavbarProps, MenuIcon } from '../side-navbar/side-navbar';
import RouteNavigator from "../route-navigator/route-navigator";
import 'react-sticky-header/styles.css';
import { navigatorList } from "../app/navigator-list.config";
const StickyHeader = require('react-sticky-header');

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
            <StickyHeader header={
                <header className="header">
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
                                    {
                                        navigatorList.map((routeNavigatorConfig, index) => {
                                            return (
                                                <li key={index}>
                                                    <RouteNavigator routeNavigatorConfig={routeNavigatorConfig} />
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </SideNavbar>
                </header>
            }/>
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

