// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import initStore from "../store";
import App from "next/app";
import withRedux from "next-redux-wrapper";

class Mmmusic extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(initStore)(Mmmusic);
