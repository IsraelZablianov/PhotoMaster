import { connect } from 'react-redux'
import GifCreator, { GifCreatorDispatchProps } from "./gif-creator";
import { showLoader,hideLoader } from "../../components/app/app-actions";

function mapDispatchToProps(dispatch: any): GifCreatorDispatchProps {
  return {
    showLoader: () => {dispatch(showLoader())},
    hideLoader: () => {dispatch(hideLoader())},
  }
}

const VideoToGifCreatorContainer = connect(
  undefined,
  mapDispatchToProps
)(GifCreator);

export default VideoToGifCreatorContainer;