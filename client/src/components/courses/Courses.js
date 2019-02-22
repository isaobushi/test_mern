import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

class Courses extends Component {
	componentDidMount() {
		this.props.getCourses();
	}

	render() {
		const { courses } = this.props.profile;
		const coursesListTitle = courses.map((course, i) => {
			return (
				<div key={i} className="card mb-2 mx-auto" style={{ width: '90vw' }}>
					<div className="card-body">
						<img
							style={{ width: '50px', hight: '50px' }}
							className="card-img-top"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMY9h7MVxa7e0wJhP9aYOf35SR166NsoNIqF2uEv2uiGZ8OKoD"
							alt="Card  cap"
						/>
						<h5>{course.title}</h5>
						<p>{}</p>
						<Link to={`/courses/${course._id}`} className="btn btn-secondary">
							More details
						</Link>
					</div>
				</div>
			);
		});

		return <div className="dashboard mx-auto">{courses[0] === undefined ? <Spinner /> : coursesListTitle}</div>;
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});
export default connect(
	mapStateToProps,
	{ getCourses }
)(Courses);
