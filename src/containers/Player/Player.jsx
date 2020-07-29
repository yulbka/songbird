import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import { Bar } from '../../components/Bar/Bar';

import iconPlay from '../../assets/images/play.svg';
import iconPause from '../../assets/images/pause.svg';

import styles from './Player.module.scss';

export class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      audioDuration: 0
    };

    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.audioRef.current.addEventListener('ended', () => this.setState({ isPlaying: false }));
  }

  componentWillUnmount() {
    this.audioRef.current.removeEventListener('ended', () => this.setState({ isPlaying: false }));  
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
    this.setState({ audioDuration: this.audioRef.current.duration })
  }

  render() {

    const { isPlaying, audioDuration } = this.state;

    return (      
      <div className={styles.player}>
        <div className={styles.play} onClick={isPlaying ? this.pauseAudio.bind(this): this.playAudio.bind(this)} >
          <SVG src={isPlaying ? iconPause: iconPlay} width={18} height={18}/>
          <audio
            ref={this.audioRef}
            src={this.props.audioSrc}
            onLoadedMetadata={() => this.setAudioDuration()}
          />
        </div>
        <Bar duration={audioDuration} />           
      </div>
    )
  }  
}

Player.propTypes = {
  audioSrc: PropTypes.string
}
