import * as React from 'react';
const animation = require("../../../images/loading-animation.gif");

export interface LoadableProps {
    active: boolean;
}

export interface LoadableState {
}

export default class Loadable extends React.Component<LoadableProps, LoadableState> {

    constructor(props: LoadableProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div className="loadble">
                {this.props.active && 
                    <div className="loading-overlay">
                        <img className="animation" src={animation} alt="spin"/>
                    </div>
                }
                {this.props.children}
            </div>
        );
    }
}