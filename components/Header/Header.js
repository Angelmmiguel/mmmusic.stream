import React from 'react';

// Components
import CurrentChannel from './CurrentChannel';
import Shortcuts from './Shortcuts';
import Volume from './Volume';

class Header extends React.PureComponent {
  render() {
    return <header className="Header">
      <div className="grid space-between align-center">
        <div className="cell">
        <img src="/static/logo.png" alt="mmmusic logo" className="Header__Logo"/>
        </div>
        <div className="cell Header__Current">
          <CurrentChannel playing={ this.props.playing } currentChannel={ this.props.currentChannel } />
        </div>
        <div className="cell Header__Volume">
          <div className="Header__Volume__Wrapper">
            <Shortcuts />
            <Volume volume={ this.props.volume } onChangeVolume={ this.props.onChangeVolume }
              muted={ this.props.muted } />
          </div>
        </div>
      </div>
      <style jsx>{`
        .Header {
          background-color: var(--c-white);
          border-bottom: 5px solid var(--c-red);
          height: 60px;
          left: 50%;
          padding: 0 2em;
          position: fixed;
          top: 0;
          transform: translateX(-50%);
          width: 100%;
          z-index: 99;
        }
        .Header > .grid {
          height: 60px;
        }
        .Header h1 {
          font-size: 1em;
          margin: 0;
          color: var(--c-text);
        }
        .Header__Logo {
          height: 16px;
          display: block;
          margin: 0 auto;
        }
        .Header__Current {
          display: none;
        }
        .Header__Current .cell {
          flex: 2;
          text-align: center;
        }
        .Header__Volume {
          text-align: right;
          display: none;
          color: var(--c-red);
        }
        .Header__Volume__Wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        @media (min-width: 36em) {
          .Header__Volume, .Header__Current {
            display: block;
          }
          .Header__Logo {
            margin: 0;
          }
        }
      `}</style>
    </header>;
  }
}

export default Header;
