import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import InputRange from 'react-input-range';

import { Bar } from '../../components/Bar/Bar';

import iconPlay from '../../assets/images/play.svg';
import iconPause from '../../assets/images/pause.svg';

import 'react-input-range/lib/css/index.css';
import './Player.scss';

export class Player extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isPlaying: false,
      currentTime: 0,
      audioDuration: 0,
      volume: 100,
    };

    this.audioRef = React.createRef();
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.setAudioDuration = this.setAudioDuration.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.audioRef.current.addEventListener('ended', this.pauseAudio);
  }

  componentWillUnmount() {
    this.audioRef.current.removeEventListener('ended', this.pauseAudio);
    this.audioRef.current.removeEventListener('loadedMetadata', this.setAudioDuration);
    this.audioRef.current.removeEventListener('timeUpdate', this.updateTime);
  }

  playAudio() {
    this.setState({ isPlaying: true });
    this.audioRef.current.play();
  }

  pauseAudio() {
    this.setState({ isPlaying: false });
    this.audioRef.current.pause();
  }

  setAudioDuration() {
    this.setState({ audioDuration: this.audioRef.current.duration });
  }

  updateTime() {
    this.setState({currentTime: this.audioRef.current.currentTime});
  }

  updateTimeOnMouseClick(time) {
    this.audioRef.current.currentTime = time;
    this.setState({currentTime: time});
  }

  changeVolume(value) {
    this.setState({ volume: value });
    this.audioRef.current.volume = value / 100;
  }

  render() {

    const { isPlaying, currentTime, audioDuration } = this.state;

    return (      
      <div className={'player'}>
        <div className={'play'} onClick={isPlaying ? this.pauseAudio: this.playAudio} >
          <SVG src={isPlaying ? iconPause: iconPlay} width={18} height={18}/>
          <audio
            ref={this.audioRef}
            src={this.props.audioSrc}
            onLoadedMetadata={this.setAudioDuration}
            onTimeUpdate={this.updateTime}
          />
        </div>
        <Bar duration={audioDuration} currentTime={currentTime} updateTime={this.updateTimeOnMouseClick.bind(this)}/>
        <div className={'volume'}>
          <img
            src={this.state.volume === 0 ? 'assets/images/ico-audio-muted.png': 'assets/images/ico-audio.png'}
            width={24}
            height={24}
            onClick={() => this.state.volume === 0 ? this.changeVolume(100): this.changeVolume(0)}
          />
          <InputRange
            maxValue={100}
            minValue={0}
            step={1}
            value={this.state.volume}
            onChange={value=> this.changeVolume(value)}
          />
        </div>        
      </div>
    )
  }  
}

Player.propTypes = {
  audioSrc: PropTypes.string
}
