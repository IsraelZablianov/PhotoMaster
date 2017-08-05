import * as React from "react";
import { imageTemplates } from "./image-templates.config";

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
                                    <div onClick={() => { this.onImageChanged(imageTemplate.imageUrl) }}>
                                        <img className={imageTemplate.className} src={imageTemplate.imageUrl} />
                                    </div>
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