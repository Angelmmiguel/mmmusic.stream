import React from 'react';

// Libs
import cs from 'classnames';

// Player
import Player from 'react-player';

// Icons
import Play from '../icons/play.svg';

// Constants
const TITLE_MAX_LENGTH = 65;

class Channel extends React.Component {
  constructor(props) {
    super(props);

    // Ref
    this.player = null;

    // Binds
    this.onChangeInternalState = this.onChangeInternalState.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.onReady = this.onReady.bind(this);

    // Check if the iframe has been added
    this.state = {
      loading: false,
      ready: false,
      // Mostly for debugging
      internal: false
    };
  }

  onChangeInternalState(state) {
    this.setState({ internal: state });
  }

  componentWillReceiveProps(nextProps) {
    // Load when it's required
    if (nextProps.currentChannel.videoId === this.props.channel.videoId &&
        !this.isReadyOrLoading) {
      this.setState({ loading: true });
    }
  }

  get isLoading() {
    return this.state.loading;
  }

  get isReady() {
    return this.state.ready;
  }

  get isReadyOrLoading() {
    return this.isReady || this.isLoading;
  }

  get isPlaying() {
    return this.isCurrent && this.props.playing;
  }

  get isCurrent() {
    return this.props.currentChannel.videoId === this.props.channel.videoId;
  }

  get isHidden() {
    return this.props.filter !== 'All' &&
      this.props.channel.genres.indexOf(this.props.filter) === -1;
  }

  title() {
    let title = this.props.channel.title;

    if (title.length < TITLE_MAX_LENGTH) {
      return title;
    } else {
      return `${title.substring(0, TITLE_MAX_LENGTH - 3)}...`;
    }
  }

  /**
   * Indicates to the component that's ready to start playing
   */
  onReady() {
    // Set the element as ready
    this.setState({ ready: true });

    // Play it if it's necessary
    if (this.isPlaying) {
      this.player.getInternalPlayer().playVideo();
    }
  }

  toggleVideo() {
    if (!this.isPlaying) {
      // Paused or stopped
      this.props.setPlaying(this.props.channel.videoId);

      if (this.isReady) {
        this.player.getInternalPlayer().playVideo();
      } else {
        this.setState({ loading: true });
      }
    } else {
      // Playing
      this.props.stopPlaying();

      if (this.isReady) {
        this.player.getInternalPlayer().pauseVideo();
      }
    }
  }

  renderPlayer() {
    if (this.isPlaying || this.isReadyOrLoading) {
      // Render the player when it should be played or it's ready or loading

      // Check if we need to update the loading status!
      if (!this.state.loading) this.setState({ loading: true });

      // Render the player
      return <Player
        url={ `https://youtube.com/watch?v=${this.props.channel.videoId}` }
        volume={ this.props.volume / 100 }
        loop={ true }
        muted={ this.props.muted }
        playing={ this.isPlaying }
        controls={ false }
        height="100%" width="auto"
        onPlay={ () => this.onChangeInternalState(true) }
        onPause={ () => this.onChangeInternalState(false) }
        onReady={ this.onReady }
        ref={ (ref) => { this.player = ref; } } />
    } else {
      // Render the placeholder
      let style = {
        backgroundImage: `url(https://i1.ytimg.com/vi/${this.props.channel.videoId}/mqdefault.jpg)`
      };
      return <div className="Channel__Player__Thumbnail" style={ style }>
        <div className="Channel__Player__Thumbnail__Play">
          <Play alt="Play icon. Click to start the music" />
        </div>
      </div>;
    }
  }

  render() {
    let cssClass = cs(
      `Channel cell`,
      {
        'Channel--playing': this.isPlaying && !this.props.muted,
        'Channel--muted': this.isPlaying && this.props.muted,
        'Channel--current': this.isCurrent,
        'Channel--hidden--playing': this.isHidden && this.isPlaying,
        'Channel--hidden': this.isHidden && !this.isPlaying,
      }
    );

    return <article className={ cssClass }>
      <section className="Channel__Player">
        { this.renderPlayer() }
        <button className="Channel__Player__Button" onClick={ this.toggleVideo }
          aria-label={ `Play the "${this.title()}" channel.` }/>
      </section>
      <h3>{ this.title() }</h3>
      <style jsx global>{`
        .Channel__Player {
          border: 1px solid transparent;
          background: black;
          position: relative;
          min-height: 152px;
        }
        .Channel__Player iframe {
          display: block;
        }
        .Channel__Player__Thumbnail {
          align-items: center;
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          height: 150px;
          width: 100%;
        }
        .Channel__Player__Thumbnail__Play {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          padding: .5em 1em;
        }
        .Channel__Player__Thumbnail__Play img {
          width: 4em;
          display: block;
        }
        .Channel__Player__Button {
          position: absolute;
          z-index: 10;
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
          top: 0;
          left: 0;
        }
        .Channel__Player__Button:focus, .Channel__Player__Button:active {
          outline: 0;
        }
        .Channel--playing .Channel__Player {
          animation: playingShadow 2s infinite;
          border-color: var(--c-red-hover);
        }
        .Channel--muted .Channel__Player {
          animation: mutedShadow 2s infinite;
          border-color: var(--c-text);
        }
        .Channel--current .Channel__Player {
          box-shadow: 0 0 25px rgba(237, 49, 49, 0.4);
          border-color: var(--c-text);
        }
        .Channel--hidden {
          display: none;
        }
        .Channel--hidden--playing {
          opacity: .8;
          order: -1;
        }
        .Channel h3 {
          margin-top: .75em;
        }

        @keyframes playingShadow {
          0% {
            box-shadow: 0 0 30px rgba(237, 49, 49, 0.6);
          }
          10% {
            box-shadow: 0 0 78px rgba(237, 49, 49, 0.6);
          }
          20% {
            box-shadow: 0 0 27px rgba(237, 49, 49, 0.75);
          }
          30% {
            box-shadow: 0 0 45px rgba(237, 49, 49, 0.6);
          }
          40% {
            box-shadow: 0 0 55px rgba(237, 49, 49, 0.6);
          }
          50% {
            box-shadow: 0 0 30px rgba(237, 49, 49, 0.75);
          }
          60% {
            box-shadow: 0 0 25px rgba(237, 49, 49, 0.4);
          }
          70% {
            box-shadow: 0 0 60px rgba(237, 49, 49, 0.75);
          }
          80% {
            box-shadow: 0 0 30px rgba(237, 49, 49, 0.6);
          }
          90% {
            box-shadow: 0 0 55px rgba(237, 49, 49, 0.5);
          }
          100% {
            box-shadow: 0 0 30px rgba(237, 49, 49, 0.6);
          }
        }
        @keyframes mutedShadow {
          0% {
            box-shadow: 0 0 30px rgba(80, 80, 80, 0.6);
          }
          10% {
            box-shadow: 0 0 78px rgba(80, 80, 80, 0.6);
          }
          20% {
            box-shadow: 0 0 27px rgba(80, 80, 80, 0.75);
          }
          30% {
            box-shadow: 0 0 45px rgba(80, 80, 80, 0.6);
          }
          40% {
            box-shadow: 0 0 55px rgba(80, 80, 80, 0.6);
          }
          50% {
            box-shadow: 0 0 30px rgba(80, 80, 80, 0.75);
          }
          60% {
            box-shadow: 0 0 25px rgba(80, 80, 80, 0.4);
          }
          70% {
            box-shadow: 0 0 60px rgba(80, 80, 80, 0.75);
          }
          80% {
            box-shadow: 0 0 30px rgba(80, 80, 80, 0.6);
          }
          90% {
            box-shadow: 0 0 55px rgba(80, 80, 80, 0.5);
          }
          100% {
            box-shadow: 0 0 30px rgba(80, 80, 80, 0.6);
          }
        }
      `}</style>
    </article>;
  }
};

export default Channel;
