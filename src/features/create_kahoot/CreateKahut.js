import {
  MenuItem,
  CardActionArea,
  IconButton,
  Card,
  CardHeader,
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

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import Navbar from "./Navbar";
import { useState } from 'react'


const CreateKahut = () => {
  const [newQuestion, setNewQuestion] = useState({
    questionType: 'Quiz',
    timeLimit: 20,
    points: 'Standard',
    content: null,
    image: null,
    listAnswer: [],
    correctAnser: []
  })

  const [listQuestion, setListQuestion] = useState([newQuestion]);

  return (
    <Paper elevation={0}>
      <Navbar />
      <Grid container m='auto' p='auto' >
        <Box
          width='20%'
          boxShadow={12}
          sx={{ justifyContent: 'center', py: 3 }}
        >
          <Stack spacing={1} py={2} px={1}>
            {listQuestion.map((eachQuestion, index) => (<Box>
              <Typography fontWeight="bold" fontSize={15}>{index + 1 + " " + eachQuestion.questionType}</Typography>
              <Card sx={{
                width: '100%',
                height: '130px',
                boxShadow: 5,
                bgcolor: '#f2f2f2',
                borderRadius: 2,
                '&:hover': {
                  border: 2,
                  borderColor: '#b5b5b5',
                }
              }}>
                <div style={{ width: '100%', whiteSpace: 'nowrap', marginX: 1, marginTop: 1 }}>
                  <Box
                    component="div"
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                      // border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                      borderRadius: 2,
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      align: 'center',
                      display: 'block'
                    }}
                  >
                    {eachQuestion.content ? eachQuestion.content : "Question "}
                  </Box>
                  {/* <Typography
                    fontWeight={50}
                    fontSize={14}
                    sx={{
                      justifyContent: 'center',
                      display: 'flex',
                      marginTop: 0.5,
                    }}
                  >
                    {eachQuestion.content ? eachQuestion.content : "Question Question Question Question Question Question "}
                  </Typography> */}
                </div>
                <Typography
                  fontWeight={50}
                  fontSize={14}
                  sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: 0.5,
                    wordWrap: 'none'
                  }}
                >
                  {eachQuestion.content ? eachQuestion.content : "Question Question Question Question Question Question "}
                </Typography>

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
            ))}
          </Stack>
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
          width='60%'
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
