import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Layout & text
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Icons & avatars
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

// Data display necessities
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Modal from '@mui/material/Modal';


// Gather forks for the gist in a given row
function ForksList(props){
	// Hold the fork list info in a state var, default is null
	// We need this component so we can at least display a null while
	// waiting for the response from axios
	const [data, setData] = useState(null);

	useEffect(()=>{
		axios.get(
			`https://api.github.com/gists/${props.gist_id}/forks`,
			{ headers: { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_KEY}`}}
		).then(res => {
			setData(res.data);
		})
	}, [props.gist_id])

	// Display an avatar list of the last 3 forks, along with
	// a number for how many other forks there are
	return data && <AvatarGroup max={4}>
		{data.map((fork) => (
		<Avatar key={fork.owner.avatar_url} src={fork.owner.avatar_url}></Avatar>))}
	</AvatarGroup>
}


// Modal component to display gist file contents
function GistFileModal(props){
	const [open, setOpen] = React.useState(false); // Manipulate open/closed modal states
	const [fileContents, setFileContents] = React.useState(null); // Extract file contents in this var
	const handleClose = () => setOpen(false);
  
	// Modal box CSS
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '70%',
		height: '70%',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		overflow: 'scroll',
		whiteSpace: 'pre-wrap',
	};

	useEffect(()=>{
		// Axios will automatically parse any file as json, which sometimes
		// messess up displaying a gist file as plaintext
		// Overwriting behavrior through transformResponse in config
		axios.get(props.raw_url, { transformResponse: [(data) => { return data; }] }).then(res => {
			setFileContents(res.data);
		})
	}, [props.raw_url]);

	return (
	  <div>
		<IconButton
			aria-label="expand row"
			size="small"
			onClick={() => setOpen(!open)}
		>
			<PreviewIcon/>
		</IconButton>
		<Modal
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="modal-modal-title"
		  aria-describedby="modal-modal-description"
		>
		  <Box sx={style}>
			<Typography id="modal-modal-title" variant="h6" component="h2">
			  File contents
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				{fileContents}
			</Typography>
		  </Box>
		</Modal>
	  </div>
	);
}

function GistRow(props){
	// Row information to display
	const { row } = props;

	// Whether current row is expanded to view the files of the gist
	const [ open, setOpen ] = useState(false);

	return (
		<React.Fragment>
			{/* Display the ID & forks of the gist on each row */}
			<TableRow>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">{row.id}</TableCell>
				<TableCell align="left"><ForksList gist_id={row.id}/></TableCell>
			</TableRow>

			{/* Display additional information for a given gist */}
			{/* This section oversees the expandable table rows */}
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ mt: 2 }}>
							<Typography variant="p" gutterBottom component="div">
								<b>Description:</b> {row.description}
							</Typography>
							<Typography variant="p" gutterBottom component="div">
								<b>Last updated:</b> {row.updated_at}
							</Typography>
							<Typography variant="h6" gutterBottom component="div">
								Files
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>View</TableCell>
										<TableCell>Filename</TableCell>
										<TableCell>Language</TableCell>
										<TableCell>Size</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{/* Iterate over the files in the gist response and display info */}
									{Object.entries(row.files).map(([file_name, file_data]) => (
										<TableRow key={file_data.raw_url}>
											<TableCell><GistFileModal raw_url={file_data.raw_url}/></TableCell>
											<TableCell component="th" scope="row">
												{file_name}
											</TableCell>
											<TableCell>{file_data.language}</TableCell>
											<TableCell>{file_data.size}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

// Aggregate all gist data into a table
function GistTable(props) {
	return <TableContainer sx={{ mt:5, mb:5 }} component={Paper}>
		<Table size="small" aria-label="dense gist table">
			{/* TABLE HEADERS */}
			<TableHead>
				<TableRow>
					<TableCell></TableCell>
					<TableCell align="left">Gist ID</TableCell>
					<TableCell align="left">Forks</TableCell>
				</TableRow>
			</TableHead>

			{/* TABLE DATA */}
			<TableBody>
				{props.response.data.map((row, index) => (
					<GistRow key={index} row={row}/>
				))}
			</TableBody>
		</Table>
	</TableContainer>
}

export default GistTable;