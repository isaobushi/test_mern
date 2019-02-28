import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getQuestion, sendAnswer } from '../../actions/questionActions';
import Timer from '../common/Timer';

class Question extends Component {
	constructor() {
		super();
		this.state = {
			valueDisplay: '',
			styleQuestion: { textAlign: 'center', fontSize: '30px', color: 'white' },
		};
	}
	componentDidMount() {
		this.props.getQuestion();
		this.props.getCurrentProfile();
	}

	addValue = e => {
		this.setState({
			valueDisplay: this.state.valueDisplay + e.target.textContent,
		});
	};

	removeLastValue = e => {
		this.setState({
			valueDisplay: this.state.valueDisplay.substring(0, this.state.valueDisplay.length - 1),
		});
	};
	startTest = () => {
		this.setState({
			styleQuestion: { textAlign: 'center', fontSize: '30px', color: 'black' },
		});
	};
	onSubmit = e => {
		e.preventDefault();
		const answer = {
			answer: this.state.valueDisplay,
			solution: this.props.questions.exercise.question.solution,
		};
		this.props.sendAnswer(answer);
		this.props.getCurrentProfile();

		this.setState({
			valueDisplay: '',
		});
	};

	render() {
		let level = '';
		let exerciseBody = '';
		const { profile } = this.props.profile;
		const { exercise } = this.props.questions;
		if (profile) {
			level = (
				<div style={{ marginLeft: '2rem' }} className="d-inline-block">
					level: {profile.courses[0].level.toFixed(0)}
				</div>
			);
		}

		if (exercise) {
			exerciseBody = (
				<div className="m-auto" style={this.state.styleQuestion}>
					{exercise.question.body}
				</div>
			);
		}

		let display = this.state.valueDisplay;

		return (
			<div className="container m-auto flex bg-light">
				<nav>
					{level}
					<div />
				</nav>
				{exerciseBody}
				<div
					className="display mx-auto mb-3"
					style={{
						width: '80%',
						height: '10vh',
						backgroundColor: '#f7f4ef',
						// textAlign: 'center',
						fontSize: '28px',
					}}
				>
					{display}
				</div>
				{/* NUMBER PAD */}
				<div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
					<div className="container ">
						<div className="row justify-content-center">
							<div onClick={this.addValue} value="1" type="button" className="btn btn col-1 m-1 rounded">
								1
							</div>
							<div onClick={this.addValue} value="2" type="button" className="btn btn col-1 m-1 rounded ">
								2
							</div>
							<div onClick={this.addValue} value="3" type="button" className="btn btn col-1 m-1 rounded ">
								3
							</div>
							<div
								onClick={this.removeLastValue}
								value="1"
								type="button"
								className="btn btn col-2 m-1 rounded"
							>
								&#8592;
							</div>
						</div>
					</div>
					<div className="container ">
						<div className="row justify-content-center">
							<div
								onClick={this.addValue}
								value="4"
								type="button"
								className="btn col-1 m-1 rounded center"
							>
								4
							</div>
							<div onClick={this.addValue} value="5" type="button" className="btn  col-1 m-1  rounded">
								5
							</div>
							<div onClick={this.addValue} value="6" type="button" className="btn col-1 m-1 rounded ">
								6
							</div>
							<form onSubmit={this.onSubmit} value="1" type="submit" className="btn  col-2 m-1 rounded ">
								<button
									style={{
										width: '100%',
										margin: '0',
										border: 'none',
										backgroundColor: 'transparent',
									}}
								>
									&#8627;
								</button>
							</form>
						</div>
					</div>
					<div className="container ">
						<div className="row justify-content-center">
							<div onClick={this.addValue} value="7" type="button" className="btn  col-1 m-1 rounded ">
								7
							</div>
							<div onClick={this.addValue} value="8" type="button" className="btn  col-1 m-1 rounded ">
								8
							</div>
							<div onClick={this.addValue} value="9" type="button" className="btn col-1 m-1 rounded ">
								9
							</div>
							<div onClick={this.addValue} value="0" type="button" className="btn  col-2 m-1 rounded ">
								0
							</div>
						</div>
					</div>
					<div style={{ width: '50px' }} onClick={this.startTest} className="timer-container">
						<Timer props={this.props} className="mx-auto d-inline-block d-flex justify-content-center" />
					</div>
				</div>
			</div>
		);
	}
}
Question.propTypes = {
	getCurrentProfile: propTypes.func.isRequired,
	getQuestion: propTypes.func.isRequired,
	sendAnswer: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	profile: propTypes.object.isRequired,
	questions: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	questions: state.questions,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, getQuestion, sendAnswer }
)(Question);
