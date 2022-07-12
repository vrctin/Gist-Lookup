import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import SearchGistSection from './SearchGistSection';

class Lookup extends React.Component {
  render(){
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}/>
          <Grid container item xs={6} direction="column" alignItems="center">
            <SearchGistSection/>
            
          </Grid>
          <Grid item xs={3}/>
        </Grid>
      </Box>
    );
  }
}

export default Lookup;