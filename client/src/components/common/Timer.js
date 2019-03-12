import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { endTimer } from '../../actions/questionActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countdownTime: 2260,
			styleButton: { display: 'block' },
		};
	}
	componentDidMount() {
		this.props.endTimer();
		console.log('mounted');
	}
	componentWillUnmount() {
		console.log('unmounted');
		this.props.endTimer();
	}

	notify = () => {
		toast('10 seconds Left');
	};

	startTimer = () => {
		this.interval = setInterval(() => {
			this.setState(
				{
					countdownTime: this.state.countdownTime - 1,
					styleButton: { display: 'none' },
				},
				() => {
					if (this.state.countdownTime === 0) {
						clearInterval(this.interval);
						this.props.endTimer(this.props.props.history);
					}
				}
			);
		}, 1000);
	};

	render() {
		let countdownTime = this.state.countdownTime;

		if (countdownTime === 10) {
			this.notify();
		}

		return (
			<div>
				<div>
					<ToastContainer position="bottom-right" autoclose={1} />
				</div>
				<div className="container d-flex justifycontent-center flex-column mt-4" style={{ width: '100%' }}>
					<button className="btn bg-secondary" style={this.state.styleButton} onClick={this.startTimer}>
						Start
					</button>
					<div className="m-x auto text-center mt-1 display-4">{countdownTime}</div>
				</div>
			</div>
		);
	}
}

Timer.propTypes = {
	endTimer: propTypes.func.isRequired,
};
const mapStateToProps = state => dispatch => {
	{
		return {
			questions: state.questions,
		};
	}
};

export default connect(
	mapStateToProps,
	{ endTimer }
)(Timer);
