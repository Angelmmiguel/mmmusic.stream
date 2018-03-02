import React from 'react';

// components
import Channel from './Channel';

class Channels extends React.Component {

  get channelProps() {
    const {
      playing,
      muted,
      volume,
      filter,
      currentChannel,
      setPlaying,
      stopPlaying,
    } = this.props;
    return { playing, muted, volume, filter, currentChannel, setPlaying, stopPlaying, }
  }

  render() {
    let channelProps = this.channelProps;

    return <section className="Channels">
      <h1 className="title">Channels ({ this.props.currentChannels.length })</h1>
      <section className="grid small-grid--1of2 large-grid--1of4 grid--full wrap">
        { this.props.channels.map((channel) => {
          return <Channel channel={ channel } { ...channelProps } key={ channel.videoId } />
        })}
      </section>
      <style jsx>{`
        .Channels {
          padding: 1em 2em;
        }
      `}</style>
    </section>
  }
}

export default Channels;
