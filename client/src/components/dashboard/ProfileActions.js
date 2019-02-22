import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
	return (
		//Dashboard Actions
		<div className="btn-group mb-4" role="group">
			<Link to="edit-profile" className="btn btn-light">
				<i className="fas fa-user-circle text-info mr-1" /> Edit Profile
			</Link>
			<Link to="/add-course" className="btn btn-light">
				<i className="fab fa-black-tie text-info mr-1" />
				Add Course
			</Link>
			<Link to="add-education" className="btn btn-light">
				<i className="fas fa-graduation-cap text-info mr-1" />
				Add Education
			</Link>
		</div>
	);
};

export default ProfileActions;
