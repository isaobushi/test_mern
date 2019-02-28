import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { startTimer } from '../../actions/questionActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 5,
			styleButton: { display: 'block' },
		};
	}
	componentWillMount() {
		this.props.startTimer(this.props.history);
	}
	componentWillUnmount() {
		this.props.startTimer(this.props.history);
	}

	countDown = () => {
		this.setState({
			counter: this.state.counter - 1,
		});
	};

	notify = () => {
		toast('10 seconds Left');
		this.setState({});
	};

	startTimer = () => {
		this.setState({
			styleButton: { display: 'none' },
		});

		setInterval(() => {
			this.countDown();
			if (this.state.counter === 0) {
				this.startTimer(this.props.history);
			}
		}, 1000);
	};

	render() {
		let counter = this.state.counter;

		if (counter === 10) {
			this.notify();
		}

		return (
			<div>
				<div>
					<ToastContainer position="bottom-right" autoclose={1} />
				</div>
				<div className="container">
					<div className="d-inline-block">{counter}</div>
					<button className="btn bg-secondary m-1" style={this.state.styleButton} onClick={this.startTimer}>
						Start
					</button>
				</div>
			</div>
		);
	}
}

Timer.propTypes = {
	startTimer: propTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => {
	return this.props.history.push('/dasboard');
};

export default connect(
	mapDispatchToProps,
	startTimer
)(Timer);
