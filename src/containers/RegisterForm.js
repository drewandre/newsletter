import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import ArtistIcons from '../components/ArtistIcons';
import ArtistList from '../components/ArtistList';

var stringWhiteSpaceTrim = /^\s+|\s+$/g;
var zipcodeRegexp = /^\d{5}$|^\d{5}-\d{4}$/;
var onlyIntegers = /^[0-9]*$/;
var emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class RegisterForm extends Component {
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
			searchedGenres: [],
			lastKeyPressedTime: 0,
			subscriberTypes: [
				'passive listener',
				'active listener',
				'musician',
				'verified artist',
				'fan'
			]
		};

		this.searchArtistsByName = this.searchArtistsByName.bind(this);
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
			fetch(`/register`, {
				method: 'POST',
				body: JSON.stringify(formPayload)
			});
			this.handleClearForm(event);
		}
	}

	searchArtistsByName(artist_name) {
		if (Date.now() - this.state.lastKeyPressedTime > 200) {
			fetch(`/spotify/artists/${artist_name}`)
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
	}

	handleArtistSelect(event) {
		var id = event.target.id;
		var name = event.target.name;
		this.setState({
			artists: this.state.artists.concat({
				id: id,
				name: name
			})
		});
	}

	handleArtistDelete(event) {
		var id = event.target.attributes.value['value'];
		this.setState({ artists: this.state.artists.concat(input) });
	}

	handleFirstName(event) {
		var input = event.target.value.replace(stringWhiteSpaceTrim, '');
		input = input.charAt(0).toUpperCase() + input.slice(1);
		this.validateFirstName(input);
		this.setState({ firstName: input });
	}

	handleLastName(event) {
		var input = event.target.value.replace(stringWhiteSpaceTrim, '');
		input = input.charAt(0).toUpperCase() + input.slice(1);
		this.validateLastName(input);
		this.setState({ lastName: input });
	}

	handleEmail(event) {
		var input = event.target.value;
		input = input.toLowerCase();
		this.setState({ email: input });
	}

	handleAge(event) {
		var input = event.target.value;
		if (input.length < 3 && input.match(onlyIntegers)) {
			this.setState({ age: event.target.value });
		}
	}

	handleZipcode(event) {
		var input = event.target.value;
		if (input.length < 6 && input.match(onlyIntegers)) {
			this.setState({ zipcode: event.target.value });
		}
	}

	handleSubscriberType(event) {
		var input = event.target.value;
		this.validateSubscriberType(input);
		this.setState({ subscriberType: input });
	}

	handleArtists(event) {
		this.setState({ lastKeyPressedTime: Date.now() });
		var input = event.target.value.replace(stringWhiteSpaceTrim, '');
		if (input != '') {
			setTimeout(() => this.searchArtistsByName(input), 200);
		}
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
		} else if (!email.match(emailRegexp)) {
			let newError = { email: 'Email must be valid' };
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
		if ((age[0] = '0')) {
			age = age.slice(1, age.length);
		}
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
		} else if (!zipcode.match(zipcodeRegexp)) {
			let newError = { zipcode: 'Zipcode field may be valid' };
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
			this.searchArtistsByName(artists);
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

	componentDidMount() {
		fetch(`/user`)
			.then(response => {
				if (response.ok) {
					return response;
				}
			})
			.then(response => response.json())
			.then(user => {
				var userPayload = [];
				var artistPayload = [];
				for (var i = 0; i < user.top_artist_ids.length; i++) {
					artistPayload.push({
						id: user.top_artist_ids[i],
						name: user.top_artist_names[i],
						images: user.top_artist_images[i]
					});
				}
				userPayload.push(user, artistPayload);
				return userPayload;
			})
			.then(userPayload => {
				this.setState({
					firstName: userPayload[0].name,
					email: userPayload[0].email,
					age: userPayload[0].age,
					artists: userPayload[1],
					genres: userPayload[0].top_genres
				});
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
			<form className="sign-up" onSubmit={this.handleFormSubmit}>
				{errorDiv}
				<TextInput
					placeholder="first name"
					name="firstName"
					// className="half-width-input"
					value={this.state.firstName}
					handlerFunction={this.handleFirstName}
				/>
				<TextInput
					placeholder="last name"
					name="lastName"
					// className="half-width-input"
					value={this.state.lastName}
					handlerFunction={this.handleLastName}
				/>
				<TextInput
					placeholder="email"
					name="email"
					value={this.state.email}
					handlerFunction={this.handleEmail}
				/>
				<TextInput
					placeholder="age"
					name="age"
					inputType="number"
					maxLength="2"
					// className="half-width-input"
					value={this.state.age}
					handlerFunction={this.handleAge}
				/>
				<TextInput
					placeholder="zip"
					name="zipcode"
					maxLength="5"
					// className="half-width-input"
					value={this.state.zipcode}
					handlerFunction={this.handleZipcode}
				/>
				<Select
					handlerFunction={this.handleSubscriberType}
					name="subscriberType"
					placeholder="what kind of listener are you?"
					options={this.state.subscriberTypes}
					selectedOption={this.state.subscriberType}
				/>
				<TextInput
					placeholder="who are your favorite artists?"
					name="artists"
					handlerFunction={this.handleArtists}
				/>
				{artistList}
				{artistIcons}
				{/* <div className="button-group"> */}
				{/* <button className="form-submit-button" type="submit" /> */}
				{/* <Link to="/">BACK</Link> */}
				{/* </div> */}
			</form>
		);
	}
}

export default RegisterForm;
