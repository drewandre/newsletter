import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import ArtistIcons from '../components/ArtistIcons';
import ArtistList from '../components/ArtistList';

// let stringWhiteSpaceTrim = /^\s+|\s+$/g;

class EmailForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			firstName: '',
			lastName: '',
			email: '',
			age: '',
			zipcode: '',
			subscriberType: '',
			artists: [],
			genres: [],
			searchedArtists: [],
			searchedGenres: []
		};

		this.searchArtists = this.searchArtists.bind(this);
		this.handleArtistSelect = this.handleArtistSelect.bind(this);
		this.handleArtistDelete = this.handleArtistDelete.bind(this);

		this.handleFirstName = this.handleFirstName.bind(this);
		this.handleLastName = this.handleLastName.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleAge = this.handleAge.bind(this);
		this.handleZipcode = this.handleZipcode.bind(this);
		this.handleSubscriberType = this.handleSubscriberType.bind(this);
		this.handleArtists = this.handleArtists.bind(this);
		this.handleGenres = this.handleGenres.bind(this);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.validateFirstName = this.validateFirstName.bind(this);
		this.validateLastName = this.validateLastName.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validateAge = this.validateAge.bind(this);
		this.validateZipcode = this.validateZipcode.bind(this);
		this.validateSubscriberType = this.validateSubscriberType.bind(this);
		this.validateArtists = this.validateArtists.bind(this);
		this.validateGenres = this.validateGenres.bind(this);
	}

	handleFormSubmit(event) {
		event.preventDefault();
		if (
			this.validateFirstName(this.state.firstName) &&
			this.validateLastName(this.state.lastName) &&
			this.validateEmail(this.state.email) &&
			this.validateAge(this.state.age) &&
			this.validateZipcode(this.state.zipcode) &&
			this.validateSubscriberType(this.state.sucscriberType) &&
			this.validateArtists(this.state.artists) &&
			this.validateGenres(this.state.genres)
		) {
			let formPayLoad = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				age: this.state.age,
				zipcode: this.state.zipcode,
				subscriberType: this.state.subscriberType,
				artists: this.state.artists,
				genres: this.state.genres
			};
			this.props.addSubmissions(formPayLoad);
			this.handleClearForm(event);
		}
	}

	searchArtists(artist) {
		fetch(`/spotify/artists/${artist}`)
			.then(response => {
				if (response.ok) {
					return response;
				}
			})
			.then(response => response.json())
			.then(body => {
				var artist_arr = [];
				var imageSrc;
				var id;
				if (Object.keys(body).length > 0) {
					for (var i = 0; i < body.length; i++) {
						id = body[i].id;
						name = body[i].name;
						imageSrc = body[i].images;
						if (imageSrc.length > 0) {
							imageSrc = body[i].images[0].url;
						} else {
							imageSrc = null;
						}
						artist_arr.push({ id: id, name: name, image: imageSrc });
					}
				}
				this.setState({ searchedArtists: artist_arr });
			});
	}

	handleArtistSelect(event) {
		var id = event.target.attributes.value['value'];
		this.setState({ artists: this.state.artists.concat(id) });
	}

	handleArtistDelete(event) {
		var id = event.target.attributes.value['value'];
		this.setState({ artists: this.state.artists.concat(input) });
	}

	handleFirstName(event) {
		// input = event.target.value.replace(/^\s+|\s+$/g, '');
		var input = event.target.value;
		this.validateFirstName(input);
		this.setState({ firstName: input });
	}

	handleLastName(event) {
		var input = event.target.value;
		this.validateLastName(input);
		this.setState({ lastName: input });
	}

	handleEmail(event) {
		var input = event.target.value;
		this.validateEmail(input);
		this.setState({ email: input });
	}

	handleAge(event) {
		var input = event.target.value;
		this.validateAge(input);
		this.setState({ age: input });
	}

	handleZipcode(event) {
		var input = event.target.value;
		this.validateZipcode(input);
		this.setState({ zipcode: event.target.value });
	}

	handleSubscriberType(event) {
		var input = event.target.value;
		this.validateSubscriberType(input);
		this.setState({ subscriberType: input });
	}

	handleArtists(event) {
		var input = event.target.value;
		this.searchArtists(input);
		this.validateArtists(input);
		this.setState({ artists: input });
	}

	handleGenres(event) {
		var input = event.target.value;
		this.validateGenres(input);
		this.setState({ genres: input });
	}

	validateFirstName(firstName) {
		if (firstName === '') {
			let newError = { firstName: 'First name field may not be blank' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.firstName;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateLastName(lastName) {
		if (lastName === '') {
			let newError = { lastName: 'Last name field may not be blank' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.lastName;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateEmail(email) {
		if (email === '') {
			let newError = { email: 'Email field may not be blank' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.email;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateAge(age) {
		if (age === '') {
			let newError = { age: 'Age field may not be blank' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.age;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateZipcode(zipcode) {
		if (zipcode === '') {
			let newError = { zipcode: 'Zipcode field may not be blank' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.zipcode;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateSubscriberType(subscriberType) {
		if (subscriberType === '') {
			let newError = {
				subscriberType: 'Subscriber type field may not be blank'
			};
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.subscriberType;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateArtists(artists) {
		if (artists === '') {
			let newError = {
				artists: 'Artists list may not be blank'
			};
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.artists;
			this.setState({ errors: errorState });
			this.searchArtists(artists);
			return true;
		}
	}

	validateGenres(genres) {
		if (genres === '') {
			let newError = {
				genres: 'Genres list may not be blank'
			};
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.genres;
			this.setState({ errors: errorState });
			return true;
		}
	}

	handleClearForm(event) {
		event.preventDefault();
		this.setState({
			errors: {},
			firstName: '',
			lastName: '',
			email: '',
			zipcode: '',
			age: '',
			subscriberType: '',
			artists: '',
			genres: ''
		});
	}

	render() {
		let artistIcons = [];
		let artistList = [];
		let errorDiv;
		let errorItems;
		if (Object.keys(this.state.errors).length > 0) {
			errorItems = Object.values(this.state.errors).map(error => {
				return <div key={error}>{error}</div>;
			});
			errorDiv = <div className="register-form-error">{errorItems}</div>;
		}
		if (this.state.searchedArtists.length > 0) {
			artistIcons = (
				<ArtistIcons
					searchedArtists={this.state.searchedArtists}
					handleArtistSelect={this.handleArtistSelect}
				/>
			);
		}
		if (this.state.artists.length > 0) {
			artistList = (
				<ArtistList
					savedArtists={this.state.artists}
					handleArtistDelete={this.handleArtistDelete}
				/>
			);
		}

		return (
			<div className="email-form-container">
				<form className="email-form" onSubmit={this.handleFormSubmit}>
					{errorDiv}
					<TextInput
						placeholder="First Name"
						name="firstName"
						className="half-width-input"
						value={this.state.firstName}
						handlerFunction={this.handleFirstName}
					/>
					<TextInput
						placeholder="Last Name"
						name="lastName"
						className="half-width-input"
						value={this.state.lastName}
						handlerFunction={this.handleLastName}
					/>
					<TextInput
						placeholder="Email"
						name="email"
						value={this.state.email}
						handlerFunction={this.handleEmail}
					/>
					<TextInput
						placeholder="Age"
						name="age"
						className="half-width-input"
						value={this.state.age}
						handlerFunction={this.handleAge}
					/>
					<TextInput
						placeholder="Zipcode"
						name="zipcode"
						className="half-width-input"
						value={this.state.zipcode}
						handlerFunction={this.handleZipcode}
					/>
					<TextInput
						placeholder="Subscriber Type"
						name="subscriberType"
						value={this.state.subscriberType}
						handlerFunction={this.handleSubscriberType}
					/>
					<TextInput
						placeholder="Artists"
						name="artists"
						handlerFunction={this.handleArtists}
					/>
					<div className="button-group">
						<button className="form-submit-button" type="submit" />
					</div>
					{artistIcons}
					<Link to="/">BACK</Link>
				</form>
			</div>
		);
	}
}

export default EmailForm;
