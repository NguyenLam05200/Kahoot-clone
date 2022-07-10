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
  Button,
  InputBase,
  Checkbox
} from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { useState } from 'react'


import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import DoneIcon from '@mui/icons-material/Done';
import { answerUI2 } from '../../components/AnswerUI';

const CreateKahut = () => {
  const [newQuestion, setNewQuestion] = useState({
    type: 'Quiz',
    img: null,
    time: 20,
    ques_title: null,
    ans: ['', '', '', ''],
    correctAns: [],
    point: 0 //0: standard, 1: x2, 2: x3
  })

  const [listQuestion, setListQuestion] = useState([{
    type: "Quiz",
    img: "https://images.unsplash.com/photo-1569504275728-9350b4c55fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1027&q=80",
    time: 10,
    ques_title: "Con gà có trước hay quả trứng có trước?",
    ans: ['Con gà trước', 'Quả trứng trước', 'Cả 2 cùng lúc', 'Bó tay .com'],
    correctAns: [1],
  },
  {
    type: "Quiz",
    img: "https://images.unsplash.com/photo-1586343061001-b61e47c9b7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    time: 10,
    ques_title: "Bao lâu bán đuợc 1 tỉ gói mè 😐?",
    ans: ['1 tỉ năm', 'Mùa quýt năm sau', '2 triệu năm Đen Vâu', 'a thousand years - Christina Perri'],
    correctAns: [1],
  },
    newQuestion,
  ]);

  const [curQuestion, setCurQuestion] = useState(0);
  const [curHover, setCurHover] = useState(-1);
  const [curHoverAnscheck, setCurHoverAnscheck] = useState(-1);

  const handleListQuestionNav = (event, index) => {
    setCurQuestion(index);
  };

  const handleChangeQuestionTitle = (event) => {
    listQuestion[curQuestion].ques_title = event.target.value;
    setListQuestion([...listQuestion])
  };

  const handleChangeAns = (event, index) => {
    listQuestion[curQuestion].ans[index] = event.target.value;
    setListQuestion([...listQuestion])
  };


  const handleChangeCorrectAns = (event, value) => {
    const i = listQuestion[curQuestion].correctAns.indexOf(value)
    if (i !== -1) {
      listQuestion[curQuestion].correctAns.splice(i, 1);
    } else {
      listQuestion[curQuestion].correctAns.push(value);
    }
    setListQuestion([...listQuestion])
  };

  return (
    <Grid container height='calc(100% - 70px)' sx={{ pt: 0.5 }}>
      <Box
        width='20%'
        height='100%'
        boxShadow={5}
        sx={{ justifyContent: 'center' }}
      >
        <List component="nav" sx={{
          p: 0, m: 0,
          width: '100%',
          height: 'calc(100% - 90px)',
          position: 'relative',
          overflow: 'auto',
        }}>
          {listQuestion.map((eachQuestion, index) => (
            <ListItemButton
              divider={true}
              selected={curQuestion === index}
              onClick={(event) => handleListQuestionNav(event, index)}
              sx={{ pl: 0.5 }}
              onMouseOver={() => setCurHover(index)}
              onMouseOut={() => setCurHover(-1)}
            >
              <Box sx={{
                width: '100%',
                height: 140,
                mb: 1
              }}>
                <Typography sx={{
                  height: '23px',
                  pl: 2,
                  fontSize: 13,
                  fontWeight: 'bold'
                }}>{index + 1}. {eachQuestion.type}</Typography>
                <Box sx={{
                  height: 'calc(100% - 23px)',
                  width: '100%',
                  display: 'flex'
                }}>
                  <Stack justifyContent='flex-end' alignItems='center' spacing={1}
                    sx={{
                      pr: 0.5,
                      width: '18px',
                      height: '100%',
                    }}
                  >
                    {curHover === index || curQuestion === index ?
                      <>
                        <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        <DeleteIcon sx={{ fontSize: '1rem' }} />
                      </> : <></>}
                  </Stack>
                  <Box
                    sx={{
                      boxShadow: 3,
                      px: 1,
                      py: 0.5,
                      width: 'calc(100% - 18px)',
                      height: '100%',
                      backgroundColor: curQuestion === index ? '#fff' : '#f2f2f2',
                      borderRadius: 1,
                      border: curHover === index && '2px solid',
                      borderColor: curHover === index && '#92a8d1',
                      borderCollapse: curHover === index && 'separate'
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        width: '100%',
                        height: '20px',
                        fontSize: 14,
                      }}
                      textAlign="center"
                    >
                      {eachQuestion.ques_title ? eachQuestion.ques_title : 'Question'}
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: '55px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          backgroundColor: curQuestion === index ? '#f2b4ff' : '#fddddd',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'black',
                          fontSize: 11,
                          fontWeight: 'bold'
                        }}
                      >
                        {eachQuestion.time}
                      </Box>
                      <Box
                        sx={{
                          height: '100%',
                          width: 'calc(100% - 25px - 25px)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {eachQuestion.img ?

                          <Box
                            component="img"
                            sx={{
                              width: '70px',
                              height: '40px',
                            }}
                            src={eachQuestion.img}
                          />
                          :
                          <Box sx={{
                            width: '70px',
                            height: '40px',
                            border: '0.5px dashed',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                            <PhotoSizeSelectActualIcon sx={{ color: '#5a5a5a' }} />
                          </Box>
                        }
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        pb: 1,
                        height: 'calc(100% - 75px)',
                        width: '100%',
                        display: 'grid',
                        gap: 0.3,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                      }}
                    >
                      {eachQuestion.ans.map((_, i) => (
                        <Box
                          sx={{
                            px: 1,
                            border: '1px solid grey',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
                        >
                          {eachQuestion.correctAns.includes(i) ?
                            <DoneIcon sx={{
                              fontSize: 13,
                              color: '#07BA66'
                            }} />
                            :
                            <DoneIcon sx={{
                              fontSize: 13,
                              color: curQuestion === index ? 'white' : '#f2f2f2'
                            }} />
                          }
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </List>
        <Stack spacing={1} margin={2}  >
          <Button
            style={{
              border: 'none',
              outline: 'none'
            }}
            variant='contained'
            size='small'
            sx={{
              boxShadow: 8,
              textTransform: 'none',
              '&:hover': {
                fontWeight: 'bold',
                boxShadow: 2,
              }
            }}
          >Add question</Button>

          <Button
            color='success'
            style={{
              border: 'none',
              outline: 'none'
            }}
            variant='contained'
            size='small'
            sx={{
              boxShadow: 8,
              textTransform: 'none',
              '&:hover': {
                fontWeight: 'bold',
                boxShadow: 2,
              }
            }}
          >Save Kahut</Button>
        </Stack>
      </Box>
      <Stack
        spacing={2}
        alignItems='center'
        width='60%'
        height='100%'
        sx={{
          px: 2,
          pt: 1,
          backgroundColor: '#F2F2F1'
        }}
      >
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <InputBase
            multiline
            maxRows={2}
            value={listQuestion[curQuestion].ques_title}
            onChange={handleChangeQuestionTitle}
            sx={{
              width: '100%',
              mx: 1,
              fontSize: 25,
            }}
            placeholder="Start typing your question"
            inputProps={{
              style: {
                textAlign: 'center'
              }
            }}
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            m: 2,
            width: '60%',
            flex: '1 1 auto'
          }}
        ></Paper>
        <Box
          sx={{
            width: '100%',
            height: '30%',
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}>
          {listQuestion[curQuestion].ans.map((eachAns, index) => (
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: eachAns === '' ? 'white' : answerUI2[index].bgColor,
                boxShadow: 2,
              }}
            >
              <Box
                sx={{
                  borderRadius: 1,
                  height: '100%',
                  width: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: answerUI2[index].bgColor,
                  color: 'white'
                }}
              >
                {answerUI2[index].icon}
              </Box>
              <InputBase
                multiline
                maxRows={2}
                value={eachAns}
                onChange={(event) => handleChangeAns(event, index)}
                sx={{
                  flexGrow: 1,
                  // width: '100%',
                  mx: 1,
                  fontSize: 20,
                  color: 'white'
                }}
                placeholder={"Add answer " + index}
                inputProps={{
                  style: {
                    textAlign: 'left'
                  }
                }}
              />
              <IconButton
                component="span"
                onClick={(event) => handleChangeCorrectAns(event, index)}
                onMouseOver={() => {
                  !listQuestion[curQuestion].correctAns.includes(index) && setCurHoverAnscheck(index)
                }}
                onMouseOut={() => setCurHoverAnscheck(-1)}
                size='large'
                style={{
                  outline: 'none'
                }}
                sx={{
                  p: 1,
                  m: 1,
                  border: '3px solid white',
                  backgroundColor: listQuestion[curQuestion].correctAns.includes(index) && '#59B32C'
                }}
              >
                {curHoverAnscheck === index ?
                  <DoneIcon sx={{ color: 'white' }} /> :
                  <DoneIcon
                    sx={{
                      color: listQuestion[curQuestion].correctAns.includes(index) ? '#fff' : answerUI2[index].bgColor
                    }}
                  />}
              </IconButton>
            </Stack>
          ))}
        </Box>
        <Button
          variant='text'
          style={{
            outline: 'none',
            textDecoration: 'underline',
          }}
          sx={{
            pt: 0,
            mt: 0,
            textTransform: 'none',
          }}
        >Add more answer</Button>
      </Stack>
      <Box
        width='20%'
        height='100%'
        boxShadow={5}
        sx={{ justifyContent: 'center' }}
      >

      </Box>
    </Grid >
  );
};

export default CreateKahut;
