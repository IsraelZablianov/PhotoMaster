import * as React from 'react';
import ImageTemplateList from "./image-template-list";

export interface GetHeroProps {

}

export interface GetHeroState {
    
}

export default class GetHero extends React.Component<GetHeroProps, GetHeroState> {
    render(): JSX.Element {
        return (
            <div>
                <ImageTemplateList/>
            </div>
        );
    }
}