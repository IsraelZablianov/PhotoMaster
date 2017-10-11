import * as React from 'react';
import UploadImageComponent from "../../components/image-uploader/image-uploader";
const GIF = require("gif.js");
import * as workerPath from "file-loader?name=[name].js!gif.js/dist/gif.worker.js";
const Slider = require('react-rangeslider').default;
import 'react-rangeslider/lib/index.css'
import { Gif } from "../../shared-types/gif";
import { GifCreationType, GifCreationConfig } from "./types";
import { DynamicModal, ModalManager } from '../../components/dynamic-modal/dynamic-modal';
const uploadImage = require("../../../images/icon-images/upload-image.gif");

export type GifCreatorProps = GifCreatorDispatchProps & GifCreatorBaseProps;

export interface GifCreatorDispatchProps {
    showLoader?: () => void;
    hideLoader?: () => void;
}

export interface GifCreatorBaseProps {
    title?: string;
    gifType?: GifCreationType;
    uploadAcceptTypes?: string;
    config?: GifCreationConfig;
    width?: number;
    height?: number;
}

export interface GifCreatorState {
    fileSelected?: File;
    previewFileUrl?: string;
    previewResultUrl?: string;
    intervalValue?: number;
    info?: string;
}

export default class GifCreator extends React.Component<GifCreatorProps, GifCreatorState> {

    static defaultProps: GifCreatorProps = {
        title: "Upload Video To Start",
        uploadAcceptTypes: "video/*",
        gifType: GifCreationType.VideoToGif,
        config: {
            maxIntervalValue: 500,
            minIntervalValue: 20
        },
        width: 250,
        height: 150,
    };

    private gif: Gif;
    private videoEl: HTMLVideoElement | null;

    constructor(props: GifCreatorProps) {
        super(props);

        this.state = {
            intervalValue: 50,
            info: "Ready To Start"
        }
    }

    render(): JSX.Element {
        return (
            <div className="create-gif">
                <div className="upload-details">
                    {this.state.fileSelected ? this.state.info : this.props.title}
                </div>
                {!this.state.fileSelected && (
                    <UploadImageComponent accept={this.props.uploadAcceptTypes} fileSelected={(file) => { this.onFileChanged(file) }}>
                        <img className="upload-image" src={uploadImage} />
                    </UploadImageComponent>)
                }
                {
                    this.state.fileSelected && (this.props.gifType === GifCreationType.VideoToGif)&& 
                    (
                        <div>
                            <video ref={(videoEl) => { this.setVideo(videoEl) }}>
                                <source src={this.state.previewFileUrl} type={this.state.fileSelected.type} />
                            </video>
                            <Slider
                                min={this.props.config && this.props.config.minIntervalValue}
                                max={this.props.config && this.props.config.maxIntervalValue}
                                tooltip={true}
                                value={this.state.intervalValue}
                                onChange={(value: number) => { this.onRangeChanged(value) }} />
                            <div className="do-it" onClick={() => { this.onStart() }}>
                                Start Giffing
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    setVideo(videoEl: HTMLVideoElement | null) {
        this.videoEl = videoEl;
        if (this.videoEl) {
            this.videoEl.onloadedmetadata = () => {
                this.startCreateGif();
                this.props.hideLoader && this.props.hideLoader();
            };
        }
    }

    onRangeChanged(value: number) {
        this.setState({
            intervalValue: value
        });
    }

    onStart() {
        if (this.videoEl) {
            this.videoEl.pause();
            this.videoEl.currentTime = 0;
            this.gif.abort()
            this.gif.frames = []
            this.videoEl.play();
        }
    }

    capture() {
        if (this.videoEl && this.gif) {
            this.setState({
                info: "Capturing at " + this.videoEl.currentTime.toFixed(2)
            });
            this.gif.addFrame(this.videoEl, { copy: true, delay: this.state.intervalValue });
        }
    }

    onFileChanged(file: File): void {
        this.props.showLoader && this.props.showLoader();
        this.setState({
            fileSelected: file,
            previewFileUrl: URL.createObjectURL(file)
        });
    }

    openModalResult(): void {
        const fileName = this.state.fileSelected ?
        this.state.fileSelected.name.split(".")[0] + ".gif"
        : "PhotoMaster.gif";
        ModalManager.open(<DynamicModal
            resultFileName={fileName}
            resultUrl={this.state.previewResultUrl} 
            resultClass="video-to-gif-result"/>)
    }

    manageCupturingOfVideoFrames(): void {
        var timer: any;
        if (this.videoEl) {
            this.videoEl.onplay = () => {
                if (timer) {
                    clearInterval(timer);
                }
                timer = setInterval(() => { this.capture() }, this.state.intervalValue);
            }

            this.videoEl.onended = () => {
                if (timer) {
                    clearInterval(timer);
                }
                this.gif.render();
            }
        }
    }

    startCreateGif() {
        this.gif = new GIF({
            workers: 4,
            workerScript: workerPath,
            width: this.videoEl && this.videoEl.videoWidth,
            height: this.videoEl && this.videoEl.videoHeight
        });

        this.gif.on('finished', (blob: Blob) => {
            this.setState({
                info: "Ready To Start Again",
                previewResultUrl: URL.createObjectURL(blob)
            });
            this.openModalResult();
        });

        this.gif.on("progress", (p: number) => {
            this.setState({
                info: "Rendering: " + Math.round(p * 100) + "%"
            });
        });

        this.manageCupturingOfVideoFrames();
    }
}