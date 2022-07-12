import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Lookup() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          1
        </Grid>
        <Grid item xs={6} alignItems="center">
          <p>2</p>
        </Grid>
        <Grid item xs={3}>
          3
        </Grid>
      </Grid>
    </Box>
  );
}

export default Lookup;
