import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';

export class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <RaisedButton label="Default" />
      </header>
    );
  }
}

export default Header;
