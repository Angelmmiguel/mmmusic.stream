import React from 'react';

class Footer extends React.PureComponent {
  render() {
    const year = new Date().getFullYear();
    return <footer>
      <section>
        <div className="grid">
          <div className="cell">
            © mmmusic { year }. Develop by
            { ' ' }
            <a href="https://twitter.com/laux_es" target="_blank" rel="noopener">Angel</a>.
            If you like this, you can buy me a
            { ' ' }
            <a href="https://ko-fi.com/angelmmiguel" target="_blank" rel="noopener">ko-fi</a>
          </div>
          <div className="cell tr">
            mmmusic is not affiliated with
            { ' ' }
            <a href="https://youtube.com" target="_blank" rel="noopener">Youtube</a>
          </div>
        </div>
      </section>
      <style jsx>{`
        footer {
          margin: 1em auto;
          padding: 0 2em;
        }

        section {
          border-top: 1px solid var(--c-light-gray);
          padding: 1em 0;
          color: var(--c-light-text);
        }

        a {
          color: var(--c-red);
          text-decoration: none;
        }
      `}</style>
    </footer>;
  }
}

export default Footer;
