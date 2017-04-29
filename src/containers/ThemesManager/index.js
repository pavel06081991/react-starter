import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ThemesManager from 'components/ThemesManager';
import * as actions from './actions';

const mapStateToProps = (state) => {
  return {
    activeThemeName: state.getIn(['themesManager', 'activeThemeName']),
    theme: state.getIn(['themesManager', 'theme']),
    context: state.getIn(['themesManager', 'context']),
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemesManager);
