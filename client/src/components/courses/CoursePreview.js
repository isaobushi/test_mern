import React, { Component } from 'react';
import { getSingleCourse, getCurrentProfile, registerCourse } from '../../actions/profileActions';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CoursePreview extends Component {
	constructor() {
		super();
		this.state = {
			user_id: '',
			course_id: '',
			buttonActive: true,
		};
	}
	componentDidMount() {
		this.props.getSingleCourse();
		this.props.getCurrentProfile();
	}

	onSubmit = e => {
		const { user } = this.props.auth;
		e.preventDefault();
		const userData = {
			course_id: this.props.match.params.id_courses,
			user_id: user.id,
		};
		this.props.registerCourse(userData);
	};

	notify = () => toast('Registered');
	//----------------------------------------------------------//
	//----------------------------------------------------------////----------------------------------------------------------////----------------------------------------------------------//
	render() {
		const { courses } = this.props.profile;
		const { user } = this.props.auth;
		let id_course = this.props.match.params.id_courses;

		//load if not ready
		let coursePage;

		coursePage = courses[0] === undefined ? <Spinner /> : coursePage;

		//get course
		courses.map(course => {
			if (course._id === id_course) {
				return (coursePage = course);
			}
		});

		//set register button active ture -false
		let { buttonActive } = this.state;
		courses.map(course => {
			if (course._id === id_course) {
				course.users.map(student => {
					if (student === user.id) {
						return (buttonActive = false);
					}
				});
			}
		});

		let buttonRegister;
		//render button
		if (buttonActive !== true) {
			buttonRegister = (
				<button disabled className="btn btn-info btn-block mt-4">
					Already Registered
				</button>
			);
		} else if (id_course === '5c6f2a197d89e26466c9a039' && buttonActive === true) {
			buttonRegister = (
				<button onClick={this.notify} className="btn btn-info btn-block mt-4">
					Register{' '}
				</button>
			);
		} else if (id_course !== '5c6f2a197d89e26466c9a039') {
			buttonRegister = (
				<button disabled className="btn btn-info btn-block mt-4">
					Coming Soon{' '}
				</button>
			);
		}

		return (
			<div>
				<div>
					<ToastContainer position="bottom-right" autoclose={100} />
				</div>
				<div className="wrapper-description" />

				<h4 className="title">{coursePage.title}</h4>
				<p className="description"> {coursePage.description}</p>

				<form onSubmit={this.onSubmit}>{buttonRegister}</form>
				<Link to="/courses" className="btn btn-light mt-1 float-left">
					Back To Courses
				</Link>
			</div>
		);
	}
}

CoursePreview.propTypes = {
	getCurrentProfile: propTypes.func.isRequired,
	getSingleCourse: propTypes.func.isRequired,
	registerCourse: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	profile: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ getSingleCourse, getCurrentProfile, registerCourse }
)(CoursePreview);
