import * as React from 'react';
import { DynamicModalEffects, Effect, ModalStyle } from "./effect";
const Modal = require('react-dynamic-modal').Modal;
export const ModalManager = require('react-dynamic-modal').ModalManager;
export const Effects: DynamicModalEffects = require('react-dynamic-modal').Effect;

export interface ModalProps {
    resultUrl?: string;
    resultClass?: string;
    resultFileName?: string;
    effect?: Effect;
    modalStyle?: ModalStyle;
}

export interface ModalState {
}

export class DynamicModal extends React.Component<ModalProps, ModalState> {

    public static defaultProps: ModalProps = {
        modalStyle: {
            content: {
                width: 'min-content',
                margin: '50% auto',
                border: '1px solid black',
                background: '#202A36',
                overflow: 'auto',
                transform: 'scale(1)',
                borderRadius: '4px 4px 10px 10px'
            },
            overlay: {
                backgroundColor: 'rgba(8, 10, 13, 0.7)'
            }
        }
    }

    constructor(props: ModalProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <Modal
                style={this.props.modalStyle}
                effect={this.props.effect || Effects.SuperScaled}>
                <div className="dynamic-modal">
                    <div className="content">
                        <img src={this.props.resultUrl} className={this.props.resultClass}/>
                        <div className="btns">
                            <a download={this.props.resultFileName}
                                href={this.props.resultUrl}
                                className="download">Download</a>
                            <a onClick={ModalManager.close}
                                className="close">Cancel</a>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}