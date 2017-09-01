import * as React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import { Header } from "../header/header";
import { navigatorList } from "./navigator-list.config";
import { Route } from "react-router";
import LoaderContainer from "../loading-overlay/loading-overlay-container"

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
                    <LoaderContainer />
                    <div className="app-body">
                        {
                            navigatorList.map((routeConfig, index) => {
                                return (
                                    routeConfig.component && routeConfig.link &&
                                    (<Route key={index} exact path={routeConfig.link} component={routeConfig.component} {...routeConfig}/>)
                                );
                            })
                        }
                    </div>
                </div>
            </Router>
        );
    }
}