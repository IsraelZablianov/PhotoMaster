import * as React from 'react';
var ReactImageCrop = require('react-image-crop-component').default;
import 'react-image-crop-component/lib/style.css';
import UploadImageComponent from "../../components/image-uploader/image-uploader";
import { CurrentCropStateObject } from "./types";
const uploadImage = require("../../../images/icon-images/upload-image.gif");

export interface CropProps {

}

export interface CropState {
    imageToCropUrl?: string;
    previewResultUrl?: string;
    selectedFile?: File;
    imageOriginalWidth?: number;
    imageOriginalheight?: number;
}

export class Crop extends React.Component<CropProps, CropState> {

    constructor(props: CropProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div className="crop">
                {
                    !this.state.selectedFile &&
                    <div>
                        <div className="description">Upload Image And Start Cropping!</div>
                        <UploadImageComponent fileSelected={(file) => { this.onFileSelected(file) }}>
                            <img className="upload-image" src={uploadImage}/>
                        </UploadImageComponent>
                    </div>
                }
                {
                    this.state.imageToCropUrl &&
                    <div>
                        <ReactImageCrop src={this.state.imageToCropUrl}
                            square={false}
                            resize={false}
                            border={"dashed #ffffff 2px"}
                            onCrop={(e: CurrentCropStateObject) => this.onCropped(e)} />
                    </div>
                }
                {
                    this.state.previewResultUrl && this.state.selectedFile &&
                    <div className="download-ready">
                        <img className="cropped-image" src={this.state.previewResultUrl}/>
                            <a download={this.state.selectedFile.name}  
                                href={this.state.previewResultUrl} 
                                className="download">Download</a>
                    </div>
                }
            </div>);
    }

    onFileSelected(file: File): void {
        this.setState({
            imageToCropUrl: URL.createObjectURL(file),
            selectedFile: file
        });
    }

    onCropped(data: CurrentCropStateObject): void {
        let image = data[0];
        let extraDate = data[1];
        if(extraDate.h !== 0 && extraDate.w !== 0) {
            this.setState({
                previewResultUrl: image
            });
        }
    }
}
