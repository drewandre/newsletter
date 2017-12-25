import React from 'react';

const ArtistIcons = props => {
	let artistIcons = props.searchedArtists.map(artist => {
		return (
			<div id="artist">
				<img
					id={artist.id}
					name={artist.name}
					className="artist-icon"
					src={artist.image}
					onClick={props.handleArtistSelect}
				/>
				<h5>{artist.name}</h5>
			</div>
		);
	});
	return <div id="artist-icon-list">{artistIcons}</div>;
};

export default ArtistIcons;
