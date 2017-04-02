import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';

export class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <RaisedButton label="Default" />
      </footer>
    );
  }
}

export default Footer;
