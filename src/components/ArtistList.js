import React from 'react';

const ArtistList = props => {
	let artistList = props.savedArtists.map(artist => {
		return <div id="artist-text">{artist.name}</div>;
	});
	return <div className="saved-artist-list">{artistList}</div>;
};

export default ArtistList;
