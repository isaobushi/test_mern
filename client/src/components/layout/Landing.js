import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Tune In</h1>
								<p className="lead">
									{' '}
									Flow is the state of concentration and engagement that can be achieved when
									completing a task that challenges one's skills.
								</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-info mr-2">
									Sign Up
								</Link>
								<Link to="/login" className="btn btn-lg btn-light">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
