import { connect } from 'react-redux'
import Loadable, { LoadableProps } from "./loading-overlay";
import { PhotoMasterApp } from "../../../reducers";

function mapStateToProps(state: PhotoMasterApp): LoadableProps {
    return {
        active: state.appReducer.loading
    };
}

function mapDispatchToProps(dispatch: any): any {
    return {
    };
}

const LoaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loadable);

export default LoaderContainer;