import * as React from "react";
import UploadImageComponent from "../../components/image-uploader/image-uploader";
import { imageTemplates } from "./image-templates";

export interface ImageTemplateListProps {
    imageChanged?: (File: {}) => void;
}

export interface ImageTemplateListState {

}

export default class ImageTemplateList extends React.Component<ImageTemplateListProps, ImageTemplateListState> {

    // private extenssion: string = ".png";
    // a download={imageTemplate.className + this.extenssion} href={imageTemplate.url} title={imageTemplate.className}

    constructor(props: ImageTemplateListProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <ul className="image-templates">
                    {
                        imageTemplates.map((imageTemplate, index) => {
                            return (
                                <li key={index}>
                                    <UploadImageComponent imageChanged={(file) => { this.onImageChanged(file) }}>
                                        <img className={imageTemplate.className} src={imageTemplate.imageUrl} />
                                    </UploadImageComponent>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    onImageChanged(file: any): void {
        if (this.props.imageChanged) {
            this.props.imageChanged(file)
        }
    }
}