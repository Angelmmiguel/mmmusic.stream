import React from 'react';
import Link from 'next/link';

class Genre extends React.PureComponent {
  render() {
    let cssClass;
    let asUrl = '/';
    const encodeGenre = this.props.genre.replace(' ', '-');

    if (this.props.currentFilter === this.props.genre) {
      cssClass = 'active';
    }

    if (this.props.genre !== 'All') {
      asUrl = `/genre/${encodeGenre}`;
    }

    return <Link href={ `/?genre=${this.props.genre}` } as={ asUrl }>
      <a className={ cssClass }>
        { this.props.genre }
        <style jsx>{`
          a {
            border: none;
            border-radius: 25px;
            background: transparent;
            color: var(--c-text);
            cursor: pointer;
            font-size: 1em;
            margin: 0 .5em .5em 0;
            padding: .5em 1em;
            text-decoration: none;
          }
          a.active,
          a.active:hover {
            background: var(--c-red);
          }
          a:focus {
            outline: 0;
          }
          a:hover {
            background: var(--c-red-hover);
          }
          a.active,
          a:hover {
            color: var(--c-white);
          }
        `}</style>
      </a>
    </Link>;
  }
}

export default Genre;
