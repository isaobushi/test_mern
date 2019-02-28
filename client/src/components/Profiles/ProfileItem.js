import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {} from '../../actions/profileActions';

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;

		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img src={profile.user.avatar} alt="profile" className="rounded-circle" />
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{profile.user.name}</h3>
						<p>{profile.profile.status}</p>
						<Link to={`/profile/${profile.profile.handle}`} className="btn btn-info">
							View Profile
						</Link>
					</div>
					<div className="col-md-4 d-none d-md-block">
						<h4>Exercises Registered</h4>
						<ul className="list-group">
							{profile.profile.courses.map(course => {
								return (
									<li key={profile.user.id} className="list-group-item">
										<i className="fa fa-check pr-1">{course.title}</i>
										{course.title}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: propTypes.object.isRequired,
	user: propTypes.object,
};
export default ProfileItem;
