import React, { Component } from 'react';
import PropType from 'prop-types';

import Modalrn from 'react-native-modal';

import {
  pushInstance,
  attachListener,
  removeInstance,
  removeInstanceOnUnmount,
} from './ModalWrapperHelper';

export default class Modal extends Component {
  state = {
    isVisible: false,
  };

  static propTypes = {
    isVisible: PropType.bool.isRequired,
    // dismissModalFromWrapper: PropType.func.isRequired,
    onModalHide: PropType.func.isRequired,
    children: PropType.any,
  };

  componentDidMount() {
    const { isVisible } = this.props;
    attachListener(this.checkInstanceLength);
    if (isVisible) {
      pushInstance(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible !== this.props.isVisible) {
      if (nextProps.isVisible === true) {
        pushInstance(this);
      } else if (nextProps.isVisible === false) {
        if (nextProps.isVisible !== this.state.isVisible) {
          this.setState({ isVisible: false });
        }
      }
    }
  }

  componentWillUnmount() {
    this.removeInstanceFromHelper();
  }

  checkInstanceLength = async (length, instanceAtTop) => {
    if (length === 1 && instanceAtTop === this) {
      this.setState({ isVisible: true });
    } else if (length > 1 && instanceAtTop === this) {
      this.setState({ isVisible: false });
      // this.setState({ isVisible: false }, () => {
      // this.props.dismissModalFromWrapper()
      // });
    }
  };

  combinedOnModalHide = () => {
    // if( this.props.onModalHide ) {
    this.props.onModalHide();
    // }
    this.removeInstanceFromGlobal();
  };

  removeInstanceFromGlobal = () => {
    removeInstance(this);
  };

  removeInstanceFromHelper = () => {
    removeInstanceOnUnmount(this, this.checkInstanceLength);
  };

  render() {
    const { ...otherProps } = this.props;
    delete otherProps.onModalHide; //because we overwrite the prop here
    delete otherProps.isVisible; //because we overwrite the prop here
    return (
      <Modalrn
        isVisible={this.state.isVisible}
        onModalHide={this.combinedOnModalHide}
        {...otherProps}
      >
        {this.props.children}
      </Modalrn>
    );
  }
}
