import {
  MenuItem,
  CardActionArea,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  TextField,
  Box,
  Stack,
  Grid,
  Paper,
  Divider,
  Typography,
  Container,
  Button
} from '@mui/material'
import Navbar from "./Navbar";
import { useState } from 'react'


const CreateKahut = () => {
  const [newQuestion, setNewQuestion] = useState({
    questionType: 'Quiz',
    timeLimit: 20,
    points: 'Standard',
    content: 'Start typing your question',
    listAnswer: [],
    correctAnser: []
  })

  const [listQuestion, setListQuestion] = useState([newQuestion]);

  return (
    <Paper elevation={0}>
      <Navbar />
      <Grid container m='auto' p='auto' >
        <Box
          width='15%'
          boxShadow={12}
          sx={{ justifyContent: 'center', py: 3 }}
        >
          <Stack spacing={1} marginX={1} >
            <Button variant='contained' size='small'
              sx={{
                boxShadow: 8,
                textTransform: 'none',
                '&:hover': {
                  fontWeight: 'bold',
                  boxShadow: 2,
                }
              }}
            >Add question</Button>
            <Button variant='contained' size='small'
              sx={{
                backgroundColor: '#f2f2f2', color: 'black',
                boxShadow: 8,
                textTransform: 'none',
                '&:hover': {
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: '#fd6161',
                  boxShadow: 2,
                }
              }}
            >
              Add slide
            </Button>
          </Stack>
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
