import { Box, Stack, Grid, Paper, Divider } from '@mui/material'
import Navbar from "./Navbar";


const CreateKahut = () => {

  return (
    <Paper elevation={0}>
      <Navbar />
      <Grid container m='auto' p='auto' >
        <Box
          width='15%'
          boxShadow={12}
          sx={{ justifyContent: 'center', display: 'flex', py: 3 }}
        >
          slide
        </Box>
        <Box
          width='65%'
          height='88vh'
          sx={{ justifyContent: 'center', display: 'flex', py: 3 }}
        >
          create question
        </Box>
        <Box
          width='20%'
          boxShadow={12}
          sx={{ justifyContent: 'center', display: 'flex', py: 3 }}
        >
          chooser
        </Box>
      </Grid>
    </Paper >
  );
};

export default CreateKahut;
