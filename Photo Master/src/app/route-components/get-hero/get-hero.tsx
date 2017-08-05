import * as React from 'react';
import ImageTemplateList from "./image-template-list";
import UploadImageComponent from "../../components/image-uploader/image-uploader";
const uploadImage = require("../../../images/icon-images/upload-image.gif");

export interface GetHeroProps {

}

export interface GetHeroState {
    imagePreviewUrl?: string;
}

export default class GetHero extends React.Component<GetHeroProps, GetHeroState> {

    constructor(props: GetHeroProps) {
        super(props);

        this.state = {};
    }

    render(): JSX.Element {
        const msg = !this.state.imagePreviewUrl ? "Upload Your Picture" : "Select Your Hero";
        let arrowClass: string = "arrow bounce";
        arrowClass += this.state.imagePreviewUrl ? " point-to-heros" : "";
        return (
            <div className="get-hero">
                <div className="upload-details">{msg}</div>
                <div className={arrowClass} />
                <div>
                    <UploadImageComponent fileSelected={(file) => { this.onImageChanged(file) }}>
                        <img className="upload-image" src={this.state.imagePreviewUrl || uploadImage} />
                    </UploadImageComponent>
                </div>
                <ImageTemplateList />
            </div>
        );
    }

    onImageChanged(file: any): void {
        this.setState({
            imagePreviewUrl: URL.createObjectURL(file)
        });
    }
}