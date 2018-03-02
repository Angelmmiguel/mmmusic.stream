import React from 'react';

// Icons
import Keyboard from '../../icons/keyboard.svg';

// Components
import Modal from 'react-modal';

const shortcuts = [
  {
    key: 'space',
    label: 'Play / Pause',
  },
  {
    key: 'n',
    label: 'Next channel',
  },
  {
    key: 'p',
    label: 'Previous channel',
  },
  {
    key: 'r',
    label: 'Random channel',
  },
  {
    key: 'm',
    label: 'Mute / Unmute',
  },
  {
    key: 'u',
    label: 'Volume up',
  },
  {
    key: 'j',
    label: 'Volume down',
  },
];

class Shortcuts extends React.PureComponent {
  constructor(props) {
    super(props);

    // Bind
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      open: false
    }
  }

  toggleModal() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return <div className="Shortcuts">
      <button onClick={ this.toggleModal }>
        <Keyboard className="Shortcuts__Icon" width="2em" />
      </button>
      <Modal
        isOpen={this.state.open}
        onRequestClose={this.toggleModal}
        contentLabel="Keyboard shortcuts"
        className="Shortcuts__Modal"
        overlayClassName="Shortcuts__Overlay">
          <h2 className="title">Keyboard shortcuts</h2>
          <table className="Shortcuts__Table">
            { shortcuts.map((s, i) => {
              return <tr key={ i }>
                <td><span>{ s.key }</span></td>
                <td>{ s.label }</td>
              </tr>;
            })}
          </table>
          <p className="Shortcuts__Modal__Close">
            <button onClick={ this.toggleModal }>Cool!</button>
          </p>
      </Modal>
      <style jsx global>{`
        .Shortcuts {
          display: inline-block;
        }

        .Shortcuts button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: block;
          margin-right: 1.5em;
          padding: 0;
        }

        .Shortcuts button img {
          display: block;
          width: 2em;
        }

        .Shortcuts__Modal {
          animation: slide-in .150s ease-in;
          background: var(--c-white);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: absolute;
          left: 50%;
          margin-left: -150px;
          padding: 2em;
          top: 100px;
          width: 300px;
          z-index: 9999;
        }

        .Shortcuts__Modal .title {
          text-align: center;
        }

        .Shortcuts__Modal:focus {
          outline: 0;
        }

        .Shortcuts__Modal__Close {
          margin: 1em 0 0;
          text-align: center;
        }

        .Shortcuts__Modal__Close button {
          background: var(--c-red);
          border: none;
          border-radius: 25px;
          color: var(--c-white);
          cursor: pointer;
          font-size: 1em;
          padding: .5em 1em;
        }

        .Shortcuts__Overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 999;
        }

        .Shortcuts__Table {
          margin: 0 auto;
        }

        .Shortcuts__Table tr td {
          padding: .75em 0;
        }

        .Shortcuts__Table tr td span {
          display: inline-block;
          background: var(--c-light-gray);
          color: var(--c-red);
          border-radius: 3px;
          padding: .25em .5em;
        }

        .Shortcuts__Table tr td:first-child {
          text-align: right;
        }

        .Shortcuts__Table tr td:last-child {
          padding-left: 1em;
        }

        @keyframes slide-in {
          from {
            transform: translate3d(0, -10%, 0);
            opacity: .5;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>;
  }
}

export default Shortcuts;
