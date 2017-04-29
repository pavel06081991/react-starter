import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { themr } from 'react-css-themr';

@themr('Content')
export class Content extends Component {
  render() {
    const { theme } = this.props;

    return (
      <main className={theme.content}>
        <RaisedButton label="Default" />
      </main>
    );
  }
}

export default Content;
