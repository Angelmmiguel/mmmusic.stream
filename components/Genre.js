import React from 'react';

class Genre extends React.PureComponent {
  render() {
    let cssClass = 'Genre';

    if (this.props.currentFilter === this.props.genre) {
      cssClass += ' Genre--active';
    }

    return <button className={ cssClass }
      onClick={ () => this.props.onChangeFilter(this.props.genre) }>
      { this.props.genre }
      <style jsx>{`
        .Genre {
          padding: .5em 1em;
          margin: 0 .5em .5em 0;
          border-radius: 25px;
          font-size: 1em;
          cursor: pointer;
          border: none;
          background: transparent;
        }
        .Genre.Genre--active, .Genre.Genre--active:hover {
          background: var(--c-red);
        }
        .Genre:focus {
          outline: 0;
        }
        .Genre:hover {
          background: var(--c-red-hover);
        }
        .Genre--active, .Genre:hover {
          color: var(--c-white);
        }
      `}</style>
    </button>;
  }
}

export default Genre;
