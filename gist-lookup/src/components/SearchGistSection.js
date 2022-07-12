import React from 'react';


import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

class SearchGistSection extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		console.log("Sent username", e.target.username.value);
		this.props.handleSearch(e.target.username.value);
	}

	render() {
		return <Box sx={{ mt: 8 }}>
		<img alt="github gist logo" src="./github-gist-logo.png" className="logo"/>

		<Paper 
			component="form"
			sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
			onSubmit={this.handleSubmit.bind(this)}
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
}

export default SearchGistSection;