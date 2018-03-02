import React from 'react';

// Constants
const TITLE_MAX_LENGTH = 50;

class CurrentChannel extends React.PureComponent {

  get title() {
    let title = this.props.currentChannel.title;

    if (title.length < TITLE_MAX_LENGTH) {
      return title;
    } else {
      return `${title.substring(0, TITLE_MAX_LENGTH - 3)}...`;
    }
  }

  get isChannel() {
    return this.props.currentChannel.title !== undefined;
  }

  get isPlaying() {
    return this.isChannel && this.props.playing;
  }

  render() {
    let cssClass = `CurrentChannel ${this.isChannel && !this.props.playing ? 'CurrentChannel--paused' : ''}`
    return <section className={ cssClass }>
      { this.isChannel ?
          <div>
            <h2 className="title">Currently playing</h2>
            <h3>{ this.title }</h3>
          </div> :
          <p className="CurrentChannel__NoChannel">
            Click on a channel or press space to start the music
          </p> }
      <style jsx>{`
        .CurrentChannel {
          text-align: center;
        }
        .CurrentChannel__NoChannel {
          color: var(--c-gray);
        }
        .CurrentChannel--paused {
          opacity: .5;
        }
        .CurrentChannel h2,
        .CurrentChannel h3 {
          margin: 0;
        }
      `}</style>
    </section>
  }
}

export default CurrentChannel;
