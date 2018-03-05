import React from 'react';

class Footer extends React.PureComponent {
  render() {
    const year = new Date().getFullYear();
    return <footer>
      <section>
        <div className="grid">
          <div className="cell">
            © mmmusic { year }. An
            { ' ' }
            <a href="https://github.com/Angelmmiguel/mmmusic.stream" target="_blank" rel="noopener">Open Source project</a>
            { ' ' }
            created with
            { ' ' }
            <a href="https://ko-fi.com/angelmmiguel" target="_blank" rel="noopener">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </a>
            { ' ' }
            by
            { ' ' }
            <a href="https://twitter.com/_angelmm" target="_blank" rel="noopener">Angel</a>
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

        svg {
          position: relative;
          top: -1px;
          vertical-align: middle;
        }
      `}</style>
    </footer>;
  }
}

export default Footer;
