import React from 'react';
import AmbitGeneric from '../home/components/ambitGeneric/ambitGeneric.jsx';
import * as Utils from '../utils/utils.js';
import {Router, Route, Link} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import AmbitList from '../checkin/components/ambitList.jsx';

const cardStyle = {
  'margin': '10px'
};

export default class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: window.UserName,
			ambits: []
		}
	}

	componentWillMount() {
		Utils.getAllAmbits((ambits) => this.setState({ambits: ambits}));
	}

	render() {
		return (
			<div>
				{this.state.ambits.map((ambit, i) => <AmbitGeneric style={cardStyle} key={i} username={this.state.username} data={ambit}/>)}
			</div>
		);
	}

}
