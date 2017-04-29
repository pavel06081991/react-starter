import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import ThemesControlPanel from 'containers/ThemesControlPanel';

@themr('ControlPanel')
export class ControlPanel extends Component {
  render() {
    const { theme } = this.props;

    return (
      <div className={theme.controlPanel}>
        <ThemesControlPanel />
      </div>
    );
  }
}

export default ControlPanel;
