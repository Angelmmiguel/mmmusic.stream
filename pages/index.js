import React from 'react';
import 'isomorphic-unfetch';

// Lib
import Mousetrap from 'mousetrap';

// Components
import Channels from '../components/Channels';
import Genres from '../components/Genres';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch(`http://localhost:3000/api/channels`);
    const json = await res.json();
    return { channels: json.channels };
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

    // Init the state of the app
    this.state = {
      channel: '',
      filter: genres[0],
      muted: false,
      playing: false,
      volume: 75,
    }
  }

  componentDidMount() {
    // Play / pause
    Mousetrap.bind('space', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.channel !== '') {
        this.setState({ playing: !this.state.playing });
      } else {
        this.setState({ channel: this.currentChannels[0].videoId, playing: true });
      }
    });
    // Next
    Mousetrap.bind('n', () => {
      let localChannels = this.currentChannels;
      if (this.state.channel !== '') {
        let i = localChannels.findIndex((el) => el.videoId === this.state.channel);
        // If the list is filtered, we're going to consider that i is 0;
        i = i == undefined ? 0 : i;
        // Jump
        if (i === localChannels.length - 1) {
          this.setState({ channel: localChannels[0].videoId, playing: true });
        } else {
          this.setState({ channel: localChannels[i + 1].videoId, playing: true });
        }
      }
    });
    // Previous
    Mousetrap.bind('p', () => {
      let localChannels = this.currentChannels;
      if (this.state.channel !== '') {
        let i = localChannels.findIndex((el) => el.videoId === this.state.channel);
        // If the list is filtered, we're going to consider that i is 0;
        i = i == undefined ? 0 : i;
        // Jump
        if (i === 0) {
          this.setState({ channel: localChannels[localChannels.length - 1].videoId, playing: true });
        } else {
          this.setState({ channel: localChannels[i - 1].videoId, playing: true });
        }
      }
    });
    // Mute / Unmmute
    Mousetrap.bind('m', () => {
      this.setState({ muted: !this.state.muted });
    });
    // Random
    Mousetrap.bind('r', () => {
      let arr = this.currentChannels.filter((c) => c.videoId !== this.state.channel);
      if (arr.length === 0) return;
      this.setState({ channel: arr[Math.floor(Math.random() * arr.length)].videoId, playing: true });
    });
    // Volume up
    Mousetrap.bind('u', () => {
      let volume = this.state.volume + 10;
      this.setState({ volume: volume > 100 ? 100 : volume });
    });

    Mousetrap.bind('j', () => {
      let volume = this.state.volume - 10;
      this.setState({ volume: volume < 0 ? 0 : volume });
    });
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  get currentChannel() {
    return this.props.channels.filter((c) => c.videoId === this.state.channel)[0] || {};
  }

  get currentChannels() {
    if (this.state.filter === 'All') {
      return this.props.channels;
    } else {
      return this.props.channels.filter((c) => c.genres.indexOf(this.state.filter) > -1);
    }
  }

  setPlaying(channel) {
    this.setState({ channel, playing: true });
  }

  stopPlaying() {
    this.setState({ playing: false });
  }

  onChangeFilter(filter) {
    this.setState({ filter });
  }

  onChangeVolume(volume) {
    this.setState({ volume });
  }

  get channelsProps() {
    const { volume, filter, playing, muted } = this.state;
    return {
      playing,
      volume,
      filter,
      muted,
      channels: this.props.channels,
      currentChannels: this.currentChannels,
      currentChannel: this.currentChannel,
      setPlaying: this.setPlaying,
      stopPlaying: this.stopPlaying
    }
  }

  render() {
    return <Layout>
      <Header volume={ this.state.volume } onChangeVolume={ this.onChangeVolume }
        currentChannel={ this.currentChannel } playing={ this.state.playing }
        muted={ this.state.muted } />
      <main>
        <Genres genres={ this.genres } filter={ this.state.filter }
          onChangeFilter={ this.onChangeFilter }/>
        <Channels { ...this.channelsProps }/>
      </main>
      <Footer />
    </Layout>
  }
}

export default Index;
