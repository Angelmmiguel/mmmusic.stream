import React from 'react';
import Router from 'next/router';
import Head from 'next/head';

// Analytics
import { initGA, logPageView } from '../utils/analytics';

// Define the basic template
class Layout extends React.Component {
  // Initialize analytics
  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    // Add a callback to set the pageview
    Router.onRouteChangeComplete = () => {
      logPageView();
    }
  }

  get title() {
    return this.props.title || 'mmmusic. 24/7 music to focus, work and relax';
  }

  render() {
    return <div>
      <Head>
        <title>{ this.title }</title>
        <meta name="description" content="mmmusic handpicks and groups 24/7 streaming music channels for focusing, working, playing, meditating and relaxing. You will find the right music channel for every moment." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet" />
        <link href="/static/styles/grid.css" rel="stylesheet" />
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/static/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/static/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/static/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/static/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/static/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/static/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/static/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/static/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/static/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/static/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/static/mstile-310x310.png" />
        <meta property="og:title" content="mmmusic. 24/7 music to focus, work and relax" />
        <meta property="og:description" content="mmmusic handpicks and groups 24/7 streaming music channels for focusing, working, playing, meditating and relaxing. You will find the right music channel for every moment." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mmmusic.stream/static/social.png" />
        <meta property="og:url" content="https://mmmusic.stream" />
        <meta property="og:site_name" content="mmmusic" />
        <meta name="twitter:title" content="mmmusic. 24/7 music for you" />
        <meta name="twitter:creator" content="@laux_es" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="mmmusic handpicks and groups 24/7 streaming music channels for focusing, working, playing, meditating and relaxing." />
        <meta name="twitter:image" content="https://mmmusic.stream/static/twitter.png" />
      </Head>
      <div>
        { this.props.children }
      </div>
      <style jsx global>{`
        :root {
          --c-red: #F2302D;
          --c-red-hover: #f67775;
          --c-text: #313030;
          --c-light-text: #5B5858;
          --c-gray: #9B9898;
          --c-light-gray: #F1F1F1;
          --c-white: #fff;
          --font-family: 'PT Sans', sans-serif;
          --max-width: 1280px;
        }

        body {
          font-family: var(--font-family);
          font-size: 14px;
          color: var(--c-text);
          margin: 0;
        }

        main {
          margin-top: 60px;
        }

        main,
        header,
        footer {
          max-width: var(--max-width);
          margin-left: auto;
          margin-right: auto;
        }

        * {
          box-sizing: border-box;
        }

        // Headers
        .title {
          color: var(--c-light-text);
          font-size: .75em;
          font-weight: bold;
          text-transform: uppercase;
        }

        h3 {
          font-weight: 400;
        }

        // Helpers
        .tr {
          text-align: right;
        }

        // React input range
        .input-range__slider {
          appearance: none;
          background: #3f51b5;
          border: 1px solid #3f51b5;
          border-radius: 100%;
          cursor: pointer;
          display: block;
          height: 1rem;
          margin-left: -0.5rem;
          margin-top: -0.65rem;
          outline: none;
          position: absolute;
          top: 50%;
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          width: 1rem; }
          .input-range__slider:active {
            transform: scale(1.3); }
          .input-range__slider:focus {
            box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2); }
          .input-range--disabled .input-range__slider {
            background: #cccccc;
            border: 1px solid #cccccc;
            box-shadow: none;
            transform: none; }

        .input-range__slider-container {
          transition: left 0.3s ease-out; }

        .input-range__label {
          color: #aaaaaa;
          font-family: "Helvetica Neue", san-serif;
          font-size: 0.8rem;
          transform: translateZ(0);
          white-space: nowrap; }

        .input-range__label--min,
        .input-range__label--max {
          bottom: -1.4rem;
          position: absolute; }

        .input-range__label--min {
          left: 0; }

        .input-range__label--max {
          right: 0; }

        .input-range__label--value {
          position: absolute;
          top: -1.8rem; }

        .input-range__label-container {
          left: -50%;
          position: relative; }
          .input-range__label--max .input-range__label-container {
            left: 50%; }

        .input-range__track {
          background: #eeeeee;
          border-radius: 0.3rem;
          cursor: pointer;
          display: block;
          height: 0.3rem;
          position: relative;
          transition: left 0.3s ease-out, width 0.3s ease-out; }
          .input-range--disabled .input-range__track {
            background: #eeeeee; }

        .input-range__track--background {
          left: 0;
          margin-top: -0.15rem;
          position: absolute;
          right: 0;
          top: 50%; }

        .input-range__track--active {
          background: #3f51b5; }

        .input-range {
          height: 1rem;
          position: relative;
          width: 100%; }
      `}</style>
    </div>;
  }
};

export default Layout;
