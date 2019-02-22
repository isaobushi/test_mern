import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			status: '',
			skills: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			errors: {},
		};
	}

	componentWillMount() {
		this.props.getCurrentProfile();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			// Bring interests array back to csv

			const skillsCSV = profile.skills.join(',');

			//if profile field doesn't exist, make empty string

			// profile.skills = !isEmpty(profile.skills) ? profile.skills : '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
			profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
			profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

			//set component field state

			this.setState({
				handle: profile.handle,
				status: profile.status,
				skills: skillsCSV,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
			});
		}
	}
	onSubmit = e => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			status: this.state.status,
			skills: this.state.skills,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
		};
		this.props.createProfile(profileData, this.props.history);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		//select options for status
		const options = [
			{ label: '* Select School', value: 0 },
			{ label: 'Deakin 1', value: 'Deakin 1' },
			{ label: 'Deakin 2', value: 'Deakin 2' },
			{ label: 'Deakin 3', value: 'Deakin 3' },
		];
		const { errors, displaySocialInputs } = this.state;
		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile Url"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>

					<InputGroup
						placeholder="Facebook Profile Url"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>

					<InputGroup
						placeholder="Youtube Profile Url"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="LinkeIn Profile Url"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
				</div>
			);
		}
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL, your full name, nickname etc "
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Select your School"
								/>
								<TextFieldGroup
									placeholder="* Interests "
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use coma separated values (eg. IT,Data,Math,Chemistry) "
								/>
								<TextAreaFieldGroup
									placeholder=" Short Bio "
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs,
											}));
										}}
										className="btn btn-light mr-2"
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: propTypes.object.isRequired,
	errors: propTypes.object.isRequired,
	createProfile: propTypes.func.isRequired,
	getCurrentProfile: propTypes.func.isRequired,
};

const MapsStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(
	MapsStateToProps,
	{ createProfile, getCurrentProfile }
)(CreateProfile);
