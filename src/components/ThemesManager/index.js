import React, {Component} from 'react';
import {ThemeProvider} from 'react-css-themr';

export class ThemesManager extends Component {
  componentDidMount() {
    this.props.changeTheme(this.props.activeThemeName);
  }

  componentWillReceiveProps(nextProps) {
    if (__IS_DEVELOPMENT_ENV__) {
      const {context, isHmrActivated} = nextProps;

      if (!isHmrActivated && context) {
        module.hot && module.hot.accept(context.id, () => {
          this.props.changeTheme(this.props.activeThemeName);
        });
      }
    }
  }

  render() {
    const {theme, activeThemeName} = this.props;

    if (theme) {
      return (
        <ThemeProvider key={activeThemeName} theme={theme.toJS()}>
          {this.props.children}
        </ThemeProvider>
      );
    } else {
      return (
        <div>Hello, world!</div>
      );
    }
  }
}

export default ThemesManager;
