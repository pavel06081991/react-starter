import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ThemesControlPanel} from 'components/ThemesControlPanel';
import * as actions from 'containers/ThemesManager/actions';

const mapStateToProps = (state) => {
  return {
    activeThemeName: state.getIn(['themesManager', 'activeThemeName']),
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemesControlPanel);
