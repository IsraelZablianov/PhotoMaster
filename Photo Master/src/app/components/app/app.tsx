import * as React from 'react';
import {
    BrowserRouter as Router,
    // Route,
} from 'react-router-dom'

import { Header } from "../header/header";

export interface AppProps {

}

export interface AppState {
    title: string;
}

export default class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.state = {
            title: "Photo Master"
        };
    }

    render(): JSX.Element {
        return (
            <Router>
                <div className="app">
                    <Header title={this.state.title}></Header>
                    <div className="app-body">
                        {/* <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/> */}
                    </div>
                </div>
            </Router>
        );
    }
}