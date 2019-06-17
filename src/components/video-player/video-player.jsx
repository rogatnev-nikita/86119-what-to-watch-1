import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import ProgressBar from "../progress-bar/progress-bar";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();

    this._goBack = this._goBack.bind(this);
    this._toggleVideo = this._toggleVideo.bind(this);
    this._moveCurrentTime = this._moveCurrentTime.bind(this);

    this.state = {
      isVideoPlaying: false,
      progress: 0,
    };
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    video.pause();
    this.setState({isVideoPlaying: false, progress: 0});
  }

  _goBack() {
    // eslint-disable-next-line react/prop-types
    this.props.history.goBack();
  }

  _toggleVideo() {
    const video = this.videoRef.current;

    if (video.paused) {
      video.play();
      this.setState({isVideoPlaying: true});

      setInterval(() => {
        this.setState({
          progress: parseInt((video.currentTime / video.duration * 100).toFixed(1), 10),
        });
      }, 100);
    } else {
      video.pause();
      this.setState({isVideoPlaying: false});
    }
  }

  _moveCurrentTime(progress) {
    const video = this.videoRef.current;

    this.setState({progress});
    video.currentTime = progress * video.duration;
  }

  _fullScreen() {
    const video = this.videoRef.current;

    video.requestFullscreen();
  }

  static _convertTime(minutes) {
    return new Date(minutes * 60 * 1000).toISOString().substr(11, 8);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {data} = this.props.location.state;

    const {
      backgroundImage,
      videoLink,
      runTime,
    } = data;

    return (
      <div className="player">
        <video
          className="player__video"
          poster={backgroundImage}
          muted={false}
          autoPlay={false}
          controls={false}
          ref={this.videoRef}
          onLoad={this._onLoad}
        >
          <source src={videoLink} type="video/mp4"/>
        </video>

        <button type="button" className="player__exit" onClick={this._goBack}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">

              <ProgressBar
                moveCurrentTime={this._moveCurrentTime}
                progress={this.state.progress}
              />

              <div className="player__toggler" style={{left: this.state.progress + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{VideoPlayer._convertTime(runTime)}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={this._toggleVideo.bind(this)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                {this.state.isVideoPlaying ? <use xlinkHref="#pause"/> : <use xlinkHref="#play-s"></use>}
              </svg>
              <span>Play</span>
            </button>

            <div className="player__name">Transpotting</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={this._fullScreen.bind(this)}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  backgroundImage: PropTypes.string,
  videoLink: PropTypes.string,
  runTime: PropTypes.string,
};

export default withRouter(VideoPlayer);
