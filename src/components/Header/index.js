import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import ControlPanel from 'containers/ControlPanel';

@themr('Header')
export class Header extends Component {
  render() {
    const { theme } = this.props;

    return (
      <header className={theme.header}>
        <ControlPanel />
      </header>
    );
  }
}

export default Header;
