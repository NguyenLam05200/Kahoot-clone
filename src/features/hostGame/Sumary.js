import { Box, Stack, Slide, Typography, Grow, Zoom } from '@mui/material'
import { useEffect, useState, useRef } from 'react';

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
      <Box
        sx={{
          height: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
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
            alignItems: 'end',
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
                    height: '10%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    fontFamily: [
                      'Chilanka',
                      'cursive',
                    ].join(','),
                  }}>
                  Lâm
                </Typography>
              </Zoom>
              <Box sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: '90%',
                backgroundColor: '#1368CE',
                boxShadow: 15,
                py: 5,
              }} >
                {generateMedal(1, 1392, 2, 7)}
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
                    height: '11%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    fontFamily: [
                      'Chilanka',
                      'cursive',
                    ].join(','),
                  }}>
                  Lâm
                </Typography>
              </Zoom >
              <Box sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: '89%',
                backgroundColor: '#1368CE',
                boxShadow: 15,
                py: 5,
              }} >
                {generateMedal(2, 1392, 2, 7)}
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
                  Lâm
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
                {generateMedal(3, 1392, 2, 7)}
              </Box>
            </Box>
          </Slide>
        </Box>
      </Box>

    </Box >
  );
};

export default Sumary;
