import React from 'react';

// Layout
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Form input
import InputBase from '@mui/material/InputBase';

// Icons
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchGistSection(props) {
	function handleSubmit(e){
		e.preventDefault();
		// Send the username to the parent component
		props.handleSearch(e.target.username.value);
	}

	return <Box sx={{ mt: 8, width: '100%' }}>
		{/* Header logo */}
		<img alt="github gist logo" src="./github-gist-logo.png" className="logo"/>

		{/* Input form */}
		<Paper 
			component="form"
			sx={{ display: 'flex', mt: 4 }}
			onSubmit={handleSubmit.bind(this)}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search username..."
				inputProps={{ 'aria-label': 'search username' }}
				name="username"
			/>
			<IconButton 
				type="submit" 
				sx={{ p: '10px' }} 
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	</Box>
}

export default SearchGistSection;