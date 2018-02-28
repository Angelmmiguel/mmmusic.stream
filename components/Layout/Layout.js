import React from 'react';
import Head from 'next/head';

// Define the basic template
const Layout = ({ children, title }) => (
  <div>
    <Head>
      <title>{ title || 'mmmusic. 24/7 music to focus, work and relax' }</title>
      <meta name="description" content="mmmusic handpicks and groups 24/7 streaming music channels for focusing, working, playing, meditating and relaxing. You will find the right music channel for every moment." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet" />
      <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon-precomposed" sizes="60x60" href="apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152.png" />
      <link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
      <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
      <meta name="application-name" content="&nbsp;"/>
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content="mstile-144x144.png" />
      <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
      <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
      <meta property="og:title" content="mmmusic. 24/7 music to focus, work and relax" />
      <meta property="og:description" content="mmmusic handpicks and groups 24/7 streaming music channels for focusing, working, playing, meditating and relaxing. You will find the right music channel for every moment." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://mmmusic.stream/social.png" />
      <meta property="og:url" content="https://mmmusic.stream" />
      <meta property="og:site_name" content="mmmusic" />
      <meta name="twitter:title" content="mmmusic. 24/7 music for you" />
      <meta name="twitter:creator" content="@laux_es" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content="mmmusic handpicks and groups 24/7 streaming music channels for focusing, working, playing, meditating and relaxing." />
      <meta name="twitter:image" content="https://mmmusic.stream/twitter.png" />
    </Head>
    <div>
      { children }
    </div>
    <style jsx global>{`
      :root {
        --c-red: #F2302D;
        --c-text: #313030;
        --c-light-text: #5B5858;
        --c-gray: #9B9898;
        --c-light-gray: #F1F1F1;
        --c-white: #fff;
        --font-family: 'PT Sans', sans-serif;
        --max-width: 1280px;
      }
    `}</style>
  </div>
);

export default Layout;
