import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import Layout from 'components/Layout';

@themr('App')
export class App extends Component {
  render() {
    return (
      <Layout />
    );
  }
}

export default App;
