import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';

export class Content extends Component {
  render() {
    return (
      <main className={styles.content}>
        <RaisedButton label="Default" />
      </main>
    );
  }
}

export default Content;
