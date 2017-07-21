import * as React from 'react';
const SideNav = require('react-simple-sidenav').default;
export const MenuIcon = require('react-simple-sidenav').MenuIcon

export interface SideNavbarProps {
    style?: any;            //  Style for root element
    navStyle?: any;         //	Style for nav element
    titleStyle?: any;       
    itemStyle?: any;        
    itemHoverStyle?: any;  
    title?: JSX.Element;          
    items?: JSX.Element[];         
    showNav?: boolean;      
    openFromRight?: boolean;
    onShowNav?: () => void;	
    onHideNav?: () => void;	
    children?: JSX.Element;
}

export interface SideNavbarState {}

export class SideNavbar extends React.Component<SideNavbarProps, SideNavbarState> {
    render(): JSX.Element {
        return (
            <SideNav {...this.props} />
        );
    }
}