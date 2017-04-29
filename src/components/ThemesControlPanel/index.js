import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

@themr('ThemesControlPanel')
export class ThemesControlPanel extends Component {
  onThemeChange = (event, index, value) => this.props.changeTheme(value);

  render() {
    const { theme, activeThemeName } = this.props;

    return (
      <div className={theme.themesControlPanel}>
        <DropDownMenu value={activeThemeName} onChange={this.onThemeChange}>
          <MenuItem value="default" primaryText="Default" />
          <MenuItem value="rock" primaryText="Rock" />
        </DropDownMenu>
      </div>
    );
  }
}

export default ThemesControlPanel;
