import * as React from 'react';
import UploadImageComponent from "../../components/image-uploader/image-uploader";
const GIF = require("gif.js");
import * as workerPath from "file-loader?name=[name].js!gif.js/dist/gif.worker.js";
const Slider = require('react-rangeslider').default;
import 'react-rangeslider/lib/index.css'
import { Gif } from "../../shared-types/gif";
import { GifCreationType, GifCreationConfig } from "./types";
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
        uploadAcceptTypes: "video/mp4,video/x-m4v,video/*",
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
    private startTime: Date;

    constructor(props: GifCreatorProps) {
        super(props);

        this.state = {
            intervalValue: 50,
            info: "ready to start"
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
                    this.state.fileSelected && (this.props.gifType === GifCreationType.VideoToGif) && (
                        <div>
                            <video ref={(videoEl) => { this.setVideo(videoEl) }}>
                                <source src={this.state.previewFileUrl} type={this.state.fileSelected.type} />
                            </video>
                            {
                                this.state.previewResultUrl && (
                                    <img src={this.state.previewResultUrl} className="video-to-gif-result"/>)
                            }
                            <Slider
                                min={this.props.config && this.props.config.minIntervalValue}
                                max={this.props.config && this.props.config.maxIntervalValue}
                                tooltip={true}
                                value={this.state.intervalValue}
                                onChange={(value: number) => { this.onRangeChanged(value) }} />
                            <div className="do-it" onClick={() => {this.onStart()}}>
                                Do-It
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    setVideo(videoEl: HTMLVideoElement | null) {
        this.videoEl = videoEl;
        if(this.videoEl) {
            this.videoEl.onloadedmetadata = () => {
                this.startCreateGif();
                this.props.hideLoader && this.props.hideLoader();
            };
        }
    }

    onRangeChanged(value: number) {
        this.setState({
            info: "ready to start with an interval of " + value + "ms",
            intervalValue: value
        });
    }

    onStart() {
        if(this.videoEl) {
            this.videoEl.pause();
            this.videoEl.currentTime = 0;
            this.gif.abort()
            this.gif.frames = []
            this.videoEl.play();
        }
    }

    capture() {
        if(this.videoEl && this.gif) {
            this.setState({
                info: "capturing at " + this.videoEl.currentTime.toFixed(2)
            });
            this.gif.addFrame(this.videoEl, {copy: true, delay: this.state.intervalValue});
        }
    }

    onFileChanged(file: File): void {
        this.props.showLoader && this.props.showLoader();
        this.setState({
            fileSelected: file,
            previewFileUrl: URL.createObjectURL(file)
        });

    }

    startCreateGif() {
        this.gif = new GIF({
            workers: 4,
            workerScript: workerPath,
            width: this.videoEl && this.videoEl.videoWidth,
            height: this.videoEl && this.videoEl.videoHeight,
            debug: true
        });

        this.gif.on("start", () => {
            this.startTime = new Date();
        });

        this.gif.on('finished', (blob: Blob) => {
            this.setState({
                previewResultUrl: URL.createObjectURL(blob)
            });
            var delta = (new Date()).valueOf() - this.startTime.valueOf();
            this.setState({
                info:"done in " + (delta / 1000).toFixed(2) + "sec" +
                ", size " + (blob.size / 1000).toFixed(2) + "kb"
            });
        });

        this.gif.on("progress", (p: number) => {
               this.setState({
                info: "rendering: " + Math.round(p * 100) + "%"
            });
        });

        var timer: any;
        if(this.videoEl) {
            this.videoEl.onplay = () => {
                if(timer) {
                    clearInterval(timer);
                }
                timer = setInterval(() => {this.capture()}, this.state.intervalValue);
            }

            this.videoEl.onended = () => {
                if(timer) {
                    clearInterval(timer);
                }
                this.gif.render();
            }
        }
    }
}