import { Box, Stack, Grid, Paper, Divider } from '@mui/material'
import Navbar from "./Navbar";


const Dashboard = () => {

  return (
    <Paper elevation={0}>
      <Navbar />
      <Grid rowSpacing={2} columnSpacing={4} container my={4}
      // justifyContent="center"
      // alignItems="center"
      >
        <Grid item xs={3.5}>
          <Stack spacing={2} marginLeft={5}>
            {Array.from(Array(6)).map((_, index) => (
              <Box key={'leftSide ' + index} p={3} bgcolor='primary.light' justifyContent='right' display={'flex'} >
                Item {index}
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}  >
            {Array.from(Array(10)).map((_, index) => (
              <Box key={'mainSide ' + index} p={3} bgcolor='success.light' justifyContent='center' display={'flex'} >
                Item {index}
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={3.5}>
          <Stack spacing={2} marginRight={5}>
            {Array.from(Array(6)).map((_, index) => (
              <Box key={'rightSide ' + index} p={3} bgcolor='primary.light' justifyContent='left' display={'flex'} >
                Item {index}
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
