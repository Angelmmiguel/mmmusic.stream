import React from 'react';

// Lib
import cs from 'classnames';

// Icons
import Volume0 from '../../icons/volume.svg';
import Volume1 from '../../icons/volume-1.svg';
import Volume2 from '../../icons/volume-2.svg';
import VolumeMuted from '../../icons/volume-x.svg';

// Components
import InputRange from 'react-input-range';

class Volume extends React.PureComponent {

  icon() {
    if (this.props.muted) {
      return <VolumeMuted />;
    } else if (this.props.volume > 60) {
      return <Volume2 />;
    } else if (this.props.volume > 1) {
      return <Volume1 />;
    } else {
      return <Volume0 />;
    }
  }

  render() {
    let cssClass = cs('Volume', { 'Volume--muted': this.props.muted });

    return <div className={ cssClass }>
      { this.icon() }
      <div className="Volume__Slider">
        <InputRange
          maxValue={100}
          minValue={0}
          value={this.props.volume}
          onChange={volume => this.props.onChangeVolume(volume)} />
      </div>
      <style global jsx>{`
        .Volume {
          display: flex;
          align-items: center;
        }
        .Volume--muted .Volume__Slider .input-range__slider {
          background: var(--c-gray);
          border-color: var(--c-gray);
        }
        .Volume--muted .Volume__Slider .input-range__track--active {
          background: var(--c-gray);
        }
        .Volume__Slider {
          margin-left: .5em;
          width: 150px;
        }
        .Volume__Slider .input-range__slider {
          background: var(--c-red);
          border-color: var(--c-red);
          height: .3rem;
          margin: -.3rem 0 0 -.15rem;
          width: .3rem;
        }
        .Volume__Slider .input-range__label--value,
        .Volume__Slider .input-range__label {
          display: none;
        }
        .Volume__Slider .input-range__track--active {
          background: var(--c-red);
        }
      `}</style>
    </div>;
  }
}

export default Volume;
