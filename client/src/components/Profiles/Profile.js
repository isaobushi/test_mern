import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		// if (this.props.profile.profile !== null) {
		// 	console.log(this.props.profile.profile.user.avatar);
		// }

		let profileItems;

		// if (profiles === null || loading) {
		// 	profileItems = <Spinner />;
		// } else {
		// 	if (profiles.length > 0) {
		// 		let user = this.props.profile.profile.user;
		// 		profileItems = profiles.map(profile => {
		// 			return <h2>{profile.name}</h2>;
		// 		});
		// 	} else {
		// 		profileItems = <h4>No profiles found</h4>;
		// 	}
		// }
		return (
			<div>
				<div className="profiles">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1 className="display-4 text-center">Profiles</h1>
								<p className="lead text-center">Browse and Connect</p>
								{profileItems}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfiles: propTypes.func.isRequired,
	profile: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
});
export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
