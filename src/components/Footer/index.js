import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { themr } from 'react-css-themr';

@themr('Footer')
export class Footer extends Component {
  render() {
    const { theme } = this.props;

    return (
      <footer className={theme.footer}>
        <RaisedButton label="Default" />
      </footer>
    );
  }
}

export default Footer;
