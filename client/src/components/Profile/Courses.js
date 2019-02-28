import React, { Component } from 'react';
import connect from 'react-redux';
import propTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';

class Courses extends Component {
	render() {
		const { profile } = this.props;
		console.log(profile);
		return <div>courses</div>;
	}
}

Courses.propTypes = {
	profile: propTypes.object.isRequired,
};

export default Courses;
