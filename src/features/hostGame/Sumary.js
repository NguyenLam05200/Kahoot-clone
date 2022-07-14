import { Box, Stack, Slide, Typography, Grow, Zoom, Button } from '@mui/material'
import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  gameSelector,
  report
} from './gameSlice';
import ActionUtils from './ActionUtils';


const generateMedal = (rating, point, correct, total) => {
  let colorMedal;
  let colorStroke;

  if (rating === 1) {
    colorMedal = '#FFA600';
    colorStroke = '#FFC00D';
  }
  else if (rating === 2) {
    colorMedal = '#737373';
    colorStroke = '#CBCBCC';
  }
  else {
    colorMedal = '#E14001';
    colorStroke = '#EA680E';
  }

  return (
    <Stack spacing={0} alignItems="center">
      <Box
        component="div"
        style={{
          height: 100,
          width: 100,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Typography
          sx={{
            pt: 1,
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            position: 'absolute',
            zIndex: 'tooltip',
          }}
        >
          {rating}
        </Typography>
        <Box
          component="svg"
          sx={{
            width: 100, height: 100,
            position: 'absolute',
            zIndex: 'modal',
          }}
        >
          <Box
            component="polygon"
            sx={{
              fill: colorMedal,
              stroke: colorStroke,
              strokeWidth: 3,
              position: 'absolute',
              zIndex: 'modal',
            }}
            points="00,43 50,00 100,43 75,100 25,100"

          />
        </Box>
      </Box>
      <Typography
        sx={{
          pt: 3,
          fontSize: 30,
        }}
        align='center' fontWeight='bold'>
        {point}
      </Typography>
      <Typography
        sx={{
          fontSize: 24,
        }}
        align='center' fontWeight='bold'>
        {correct + ' out of ' + total}
      </Typography>
    </Stack>
  )
}

const Sumary = ({ }) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { scoreBoard, curRoom } = useSelector(
    gameSelector
  );
  const total = curRoom.questions.length;

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: '#083C8F',
      }}>
      <Box sx={{
        height: '20%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}>
        <Box sx={{
          width: '15%',
          height: '100%',
          alignItems: 'start',
          justifyContent: 'left',
          display: 'flex',
        }}>
          <ActionUtils sx={{ color: 'white' }} />
        </Box>
        <Box sx={{
          width: '70%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}>
          <Stack alignItems="center">
            <Slide direction="down" in={true} timeout={1000} container={containerRef.current}>
              <Box sx={{ backgroundColor: '#fff', px: 3, py: 1, borderRadius: 1 }}>
                <Typography
                  sx={{
                    color: '#313233',
                  }}
                  variant="h4" align='center' fontWeight='bold'>
                  🍍😄 Challenge your colleagues remotely 🍏🍌
                </Typography>
              </Box>
            </Slide>
          </Stack>
        </Box>
        <Box sx={{
          width: '15%',
          height: '100%',
          alignItems: 'start',
          justifyContent: 'right',
          display: 'grid',
        }}>
          <Button
            onClick={() => dispatch(report())}
            variant="contained"
            sx={{
              color: 'black',
              display: 'block',
              backgroundColor: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: 15,
              '&:hover': {
                fontWeight: 'bold',
                backgroundColor: 'yellow',
                color: 'black',
              }
            }}
          > Next</Button>
        </Box>


      </Box>
      <Box
        sx={{
          height: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          color: 'white'
        }}
      >
        <Box
          ref={containerRef}
          component="div"
          style={{
            height: '90%',
            width: '60%',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'flex-end',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <Grow in={true} timeout={10000}>
            <Box
              sx={{
                position: 'absolute', width: '18vw', height: '100%',
                zIndex: 1500,
              }}
            >
              <Zoom in={true} timeout={13000}>
                <Typography
                  textAlign='center'
                  sx={{
                    height: '13%',
                    fontSize: 40,
                    fontWeight: 'bold',
                    fontFamily: [
                      'Chilanka',
                      'cursive',
                    ].join(','),
                  }}>
                  {scoreBoard.length >= 1 && scoreBoard[0].name}
                </Typography>
              </Zoom>
              <Box sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: '87%',
                backgroundColor: '#1368CE',
                boxShadow: 15,
                py: 5,
              }} >
                {scoreBoard.length >= 1 && generateMedal(1, scoreBoard[0].score, scoreBoard[0].correctAns.length, total)}
              </Box>
            </Box>
          </Grow  >
          <Slide direction="up"
            in={true}
            timeout={2000}
            style={{ transitionDelay: 1000 }}
            container={containerRef.current}
          >
            <Box
              sx={{
                position: 'absolute', width: '18vw', height: '88%',
                zIndex: 1300,
                left: '10%',
              }}
            >
              <Zoom in={true} timeout={6000}>
                <Typography
                  textAlign='center'
                  sx={{
                    height: '12%',
                    fontSize: 32,
                    fontWeight: 'bold',
                    fontFamily: [
                      'Chilanka',
                      'cursive',
                    ].join(','),
                  }}>
                  {scoreBoard.length >= 2 && scoreBoard[1].name}
                </Typography>
              </Zoom >
              <Box sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: '88%',
                backgroundColor: '#1368CE',
                boxShadow: 15,
                py: 5,
              }} >
                {scoreBoard.length >= 2 && generateMedal(2, scoreBoard[1].score, scoreBoard[1].correctAns.length, total)}
              </Box>
            </Box>
          </Slide>

          <Slide direction="up" in={true} timeout={2000} container={containerRef.current}>
            <Box
              sx={{
                position: 'absolute', width: '18vw', height: '80%',
                zIndex: 1300,
                right: '10%'
              }}
            >
              <Grow in={true} timeout={3000}>
                <Typography
                  textAlign='center'
                  sx={{
                    height: '12%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    fontFamily: [
                      'Chilanka',
                      'cursive',
                    ].join(','),
                  }}>
                  {scoreBoard.length >= 3 && scoreBoard[2].name}
                </Typography>
              </Grow>
              <Box sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: '88%',
                backgroundColor: '#1368CE',
                boxShadow: 15,
                py: 5,
              }} >
                {scoreBoard.length >= 3 && generateMedal(3, scoreBoard[2].score, scoreBoard[2].correctAns.length, total)}
              </Box>
            </Box>
          </Slide>
        </Box>
      </Box>

    </Box >
  );
};

export default Sumary;
