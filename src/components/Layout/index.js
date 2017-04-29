import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';

@themr('Layout')
export class Layout extends Component {
  render() {
    const { theme } = this.props;

    return (
      <div className={theme.layout}>
        <Header />
        <Content />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
