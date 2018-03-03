import React from 'react';

// Components
import Genre from './Genre';

class Genres extends React.PureComponent {
  render() {
    const sorted = this.props.genres.sort();

    return <section className="Genres">
      <h1 className="title">Genres</h1>
      <section className="Genres__Selector">
        <select onChange={ (e) => this.props.onChangeFilter(e.target.value) }>
          { sorted.map((g, i) => {
            return <option value={ g } key={ i }>{ g }</option>;
          })}
        </select>
      </section>
      <section className="Genres__Options">
        { sorted.map((g, i) => {
          return <Genre genre={ g } key={ i } currentFilter={ this.props.filter } />;
        })}
      </section>
      <style jsx>{`
        .Genres {
          padding: 1em 2em;
        }
        .Genres__Selector select {
          height: 36px;
          width: 100%;
          border-color: var(--c-red);
          font-size: 1em;
        }
        .Genres__Options {
          display: none;
        }
        @media (min-width: 36em) {
          .Genres__Selector {
            display: none;
          }
          .Genres__Options {
            display: block;
            margin-top: 1em;
          }
        }
      `}</style>
    </section>;
  }
}

export default Genres;
