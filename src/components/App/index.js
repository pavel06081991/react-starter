import React, { Component } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import styles from './styles';

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Content />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
