import * as React from 'react'
import { Position2D, AvatarEditor } from "./types";
const ReactAvatarEditor = require("react-avatar-editor");
const avatar = require("../../../images/icon-images/avatar.png");

export interface AvatarProps { }

export interface AvatarState {
    position: Position2D;
    scale: number;
    rotate: number;
    borderRadius: number;
    preview?: any;
    width: number;
    height: number;
    image?: string;
}
export class Avatar extends React.Component<AvatarProps, AvatarState> {
    private editor: AvatarEditor;
    private minAvatar: number = 100;
    private maxAvatar: number;
    constructor(props: AvatarProps) {
        super(props);
        this.maxAvatar = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        this.maxAvatar -= 60;
        this.state = {
            position: { x: 0.5, y: 0.5 },
            scale: 1,
            rotate: 0,
            borderRadius: 0,
            width: 200,
            height: 200
        };
    }

    handleNewImage(e: any) {
        this.setState({ image: e.target.files[0] });
    }

    handleSave() {
        const img = this.editor.getImageScaledToCanvas().toDataURL();

        this.setState({
            preview: {
                img,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
                borderRadius: this.state.borderRadius
            }
        });
    }

    handleScale(e: any) {
        const scale = parseFloat(e.target.value);
        this.setState({ scale });
    }

    rotateLeft(e: any) {
        e.preventDefault();

        this.setState((prevState) => ({
            rotate: prevState.rotate - 90
        }));
    }

    rotateRight(e: any) {
        e.preventDefault();
        this.setState({
            rotate: this.state.rotate + 90
        })
    }

    handleBorderRadius(e: any) {
        const borderRadius = parseInt(e.target.value);
        this.setState({ borderRadius });
    }

    handleWidth(e: any) {
        const width = parseInt(e.target.value);
        this.setState({ width });
    }

    handleHeight(e: any) {
        const height = parseInt(e.target.value);
        this.setState({ height });
    }

    logCallback(e: string) {
        console.log('callback', e);
    }

    setEditorRef(editor: AvatarEditor) {
        if (editor) {
            this.editor = editor;
        }
    }

    handlePositionChange(position: Position2D) {
        console.log('Position set to', position)
        this.setState({ position })
    }

    render() {
        return (
            <div className="avatar">
                <div className="avatar-editor">
                    <ReactAvatarEditor
                        ref={(editor: AvatarEditor) => this.setEditorRef(editor)}
                        scale={this.state.scale}
                        width={this.state.width}
                        height={this.state.height}
                        position={this.state.position}
                        onPositionChange={(position: Position2D) => this.handlePositionChange(position)}
                        rotate={this.state.rotate}
                        borderRadius={this.state.borderRadius}
                        onSave={() => this.handleSave()}
                        image={this.state.image || avatar} />
                </div>
                <br />
                New File:
        <input name='newImage' type='file' onChange={(e) => this.handleNewImage(e)} />
                <br />
                Zoom:
        <input
                    name='scale'
                    type='range'
                    onChange={(e) => this.handleScale(e)}
                    min={'0.1'}
                    max='2'
                    step='0.01'
                    defaultValue='1'
                />
                <br />
                Border radius:
        <input
                    name='scale'
                    type='range'
                    onChange={(e) => this.handleBorderRadius(e)}
                    min='0'
                    max='100'
                    step='1'
                    defaultValue='0'
                />
                <br />
                Avatar Width:
        <input
                    name='width'
                    type='number'
                    onChange={(e) => this.handleWidth(e)}
                    min={this.minAvatar}
                    max={this.maxAvatar}
                    step='10'
                    value={this.state.width}
                />
                <br />
                Avatar Height:
        <input
                    name='height'
                    type='number'
                    onChange={(e) => this.handleHeight(e)}
                    min={this.minAvatar}
                    max={this.maxAvatar}
                    step='10'
                    value={this.state.height}
                />
                <br />
                Rotate:
        <button onClick={(e) => this.rotateLeft(e)}>Left</button>
                <button onClick={(e) => this.rotateRight(e)}>Right</button>
                <br />
                <br />
                <input type='button' onClick={() => this.handleSave()} value='Preview' />
                <br />
                {!!this.state.preview &&
                    <img
                        src={this.state.preview.img}
                        style={{
                            borderRadius: `${(Math.min(
                                this.state.preview.height,
                                this.state.preview.width
                            ) +
                                10) *
                            (this.state.preview.borderRadius / 2 / 100)}px`
                        }}
                    />}
            </div>
        )
    }
}