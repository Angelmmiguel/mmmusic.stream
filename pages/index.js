import React from 'react';
import Router from 'next/router'

// Redux
import withRedux from 'next-redux-wrapper';
import initStore, { stopPlay, toogleMute, tooglePlay, updateChannel, updateVolume } from '../store';

// Lib
import Mousetrap from 'mousetrap';

// Components
import Channels from '../components/Channels';
import Genres from '../components/Genres';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

export class Index extends React.Component {
  static async getInitialProps({ query }) {
    const channels = require('../channels.json').channels;
    const filter = query && query.genre ? query.genre : 'All';
    return { channels, filter };
  }

  constructor(props) {
    super(props);

    // Bindings
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.setPlaying = this.setPlaying.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);

    const genres = ['All'];

    this.props.channels.forEach((channel) => {
      channel.genres.forEach((genre) => {
        if (genres.indexOf(genre) === -1) {
          genres.push(genre);
        }
      });
    });

    // Store as a property. It won't change
    this.genres = genres;

    // Play a video? (only on browser)
    if (typeof Window !== 'undefined') {
      const vID = (new URL(document.location)).searchParams.get('v');
      if (vID && vID !== '' && this.props.channels.filter((v) => v.videoId === vID).length > 0) {
        this.props.dispatch(updateChannel(vID));
      }
    }
  }

  componentDidMount() {
    // Play / pause
    Mousetrap.bind('space', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.channel !== '') {
        this.props.dispatch(tooglePlay());
      } else {
        this.props.dispatch(updateChannel(this.currentChannels[0].videoId));
      }
    });
    // Next
    Mousetrap.bind('n', () => {
      let localChannels = this.currentChannels;
      if (this.props.channel !== '') {
        let i = localChannels.findIndex((el) => el.videoId === this.props.channel);
        // If the list is filtered, we're going to consider that i is 0;
        i = i == undefined ? 0 : i;
        // Jump
        if (i === localChannels.length - 1) {
          this.props.dispatch(updateChannel(localChannels[0].videoId));
        } else {
          this.props.dispatch(updateChannel(localChannels[i + 1].videoId));
        }
      }
    });
    // Previous
    Mousetrap.bind('p', () => {
      let localChannels = this.currentChannels;
      if (this.props.channel !== '') {
        let i = localChannels.findIndex((el) => el.videoId === this.props.channel);
        // If the list is filtered, we're going to consider that i is 0;
        i = i == undefined ? 0 : i;
        // Jump
        if (i === 0) {
          this.props.dispatch(updateChannel(localChannels[localChannels.length - 1].videoId));
        } else {
          this.props.dispatch(updateChannel(localChannels[i - 1].videoId));
        }
      }
    });
    // Mute / Unmmute
    Mousetrap.bind('m', () => {
      this.props.dispatch(toogleMute());
    });
    // Random
    Mousetrap.bind('r', () => {
      const arr = this.currentChannels.filter((c) => c.videoId !== this.props.channel);
      if (arr.length === 0) return;
      const randomId = arr[Math.floor(Math.random() * arr.length)].videoId;
      this.props.dispatch(updateChannel(randomId));
    });
    // Volume up
    Mousetrap.bind('u', () => {
      let volume = this.props.volume + 10;
      this.props.dispatch(updateVolume(volume > 100 ? 100 : volume));
    });

    Mousetrap.bind('j', () => {
      let volume = this.props.volume - 10;
      this.props.dispatch(updateVolume(volume < 0 ? 0 : volume));
    });
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  get currentChannel() {
    return this.props.channels.filter((c) => c.videoId === this.props.channel)[0] || {};
  }

  get currentChannels() {
    if (this.props.filter === 'All') {
      return this.props.channels;
    } else {
      return this.props.channels.filter((c) => c.genres.indexOf(this.props.filter) > -1);
    }
  }

  setPlaying(channel) {
    this.props.dispatch(updateChannel(channel));
  }

  stopPlaying() {
    this.props.dispatch(stopPlay());
  }

  onChangeVolume(volume) {
    this.props.dispatch(updateVolume(volume));
  }

  onChangeFilter(filter) {
    Router.push(`/?genre=${filter}`, `/genre/${filter.replace(' ', '-')}`);
  }

  get channelsProps() {
    const { volume, playing, muted, filter } = this.props;
    return {
      playing,
      volume,
      filter, // TODO: Don't hardcode this
      muted,
      channels: this.props.channels,
      currentChannels: this.currentChannels,
      currentChannel: this.currentChannel,
      setPlaying: this.setPlaying,
      stopPlaying: this.stopPlaying
    }
  }

  get pageTitle() {
    return this.props.filter === 'All' ?
      null :
      `${this.props.filter.replace(/\b\w/g, l => l.toUpperCase())} radio | mmmusic. 24/7 music to focus, work and relax`;
  }

  render() {
    return <Layout title={ this.pageTitle }>
      <Header volume={ this.props.volume } onChangeVolume={ this.onChangeVolume }
        currentChannel={ this.currentChannel } playing={ this.props.playing }
        muted={ this.props.muted } />
      <main>
        <Genres genres={ this.genres } filter={ this.props.filter } onChangeFilter={ this.onChangeFilter} />
        <Channels { ...this.channelsProps }/>
      </main>
      <Footer />
    </Layout>
  }
}

const mapStateToProps = (state, props) => ({
  ...state
});

export default withRedux(initStore, mapStateToProps)(Index);
