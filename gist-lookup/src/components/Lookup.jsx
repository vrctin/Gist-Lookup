import React, { useState } from 'react';

// API calls
import axios from 'axios';

// MUI display helpers
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Project-specific components
import GistTable from './GistTable';
import SearchGistSection from './SearchGistSection';


function Lookup(props){
	// eslint-disable-next-line
	const [username, setUsername] = useState(null);
	const [response, setResponse] = useState(null);

	// Get the username from the form in SearchGistSection
	function handleSearch(value){
		setUsername(value);

		// Look up the gists of the given user
		axios.get(
			`https://api.github.com/users/${value}/gists`,
			{ headers: { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_KEY}`}}
		).then(res => {
			setResponse(res);
		})
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container>
				<Grid item xs={3.5}/>
				<Grid container item xs={5}>
					<SearchGistSection handleSearch={handleSearch}/>
					{ response &&
						<GistTable response={response}/>
					}
				</Grid>
				<Grid item xs={3.5}/>
			</Grid>
		</Box>
	);
}

export default Lookup;