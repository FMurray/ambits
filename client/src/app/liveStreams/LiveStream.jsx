import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import peer from '../utils/createPeerConnection.js'

export default class LiveStream extends React.Component {
	static defaultProps = {
		audio: true, 
		height: 480,
		width: 640,
		screenshotFormat: 'image/webp',
		onUserMedia: () => {}
	};

  static propTypes = {
  	audio: PropTypes.bool,
    muted: PropTypes.bool,
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    screenshotFormat: PropTypes.oneOf([
      'image/webp',
      'image/png',
      'image/jpeg'
    ]),
    className: PropTypes.string
  };

  static mountedInstances = [];

  static userMediaRequested = false;

  constructor() {
    super();
    this.state = {
      hasStream: false,
      src: null, 
      peerId: null,
      peers: []
    };
  }

  componentDidMount() {
  	this.state.peers 
  }
}