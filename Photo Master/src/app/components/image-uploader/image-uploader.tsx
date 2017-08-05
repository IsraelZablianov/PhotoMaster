import * as React from 'react';

export interface UploadImageDispatchProps {
    fileSelected?: (File: File) => void;
    clearFile?: () => void;
    allFilesSelected?: (File: File[]) => void;
    accept?: string;
}

export interface UploadImageStateProps {
}

export interface UploadImageBaseProps {
}

export type UploadImageProps = UploadImageBaseProps & UploadImageDispatchProps & UploadImageStateProps;

export default class UploadImageComponent extends React.Component<UploadImageProps, {}> {
    static defaultProps: UploadImageProps = {
        accept: "image/*"
    }

    constructor(props: UploadImageDispatchProps) {
        super(props);

        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleImageChange(e: any): void {
        e.preventDefault();
        if(this.props.allFilesSelected) {
            this.props.allFilesSelected(e.target.files);
        }
        if (this.props.fileSelected) {
            let file = e.target.files[0];
            this.props.fileSelected(file);
        }
    }

    componentWillUnmount(): void {
        if (this.props.clearFile) {
            this.props.clearFile();
        }
    }

    render(): JSX.Element {
        return (
            <div className="image-upload">
                <label htmlFor="file-input-image">
                    {this.props.children}
                </label>
                <input
                    id="file-input-image"
                    type="file"
                    onChange={this.handleImageChange}
                    accept={this.props.accept}
                    className="hide"
                    multiple
                />
            </div>
        );
    }
}