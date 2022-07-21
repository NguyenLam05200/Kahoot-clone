import { Box, Stack, Slide, Typography } from '@mui/material'
import { useEffect, useState, useRef } from 'react';

import { useDispatch } from "react-redux";
import {
  sumary
} from './gameSlice';

const PrepareSumary = () => {
  const containerRef = useRef(null);

  const [firstAnimate, setFirstAnimate] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFirstAnimate(false);
    }, 5000);
    return () => clearInterval(interval);
  });

  const dispatch = useDispatch();
  useEffect(() => {
    window.setTimeout(function () {
      dispatch(sumary())
    }, 8000);
  }, [dispatch])

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeigt: '100vh',
        maxWidth: '100vw',
        backgroundColor: '#083C8F',
        overflow: 'hidden',
      }}>
      <Stack alignItems="center">
        <Slide direction="down" in={firstAnimate} timeout={2000} container={containerRef.current}>
          <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 1 }}>
            <Typography
              sx={{
                color: 'black',
              }}
              variant="h4" align='center' fontWeight='bold'>
              🍍😄 Challenge your colleagues remotely 🍏🍌
            </Typography>
          </Box>
        </Slide>

        <Slide direction="up" in={firstAnimate} timeout={2000} container={containerRef.current}>
          <Box
            component="div"
            style={{
              height: 70,
              width: 250,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              variant='h4'
              sx={{
                color: 'white',
                fontWeight: '700',
                position: 'absolute',
                zIndex: 'tooltip',
              }}
            >
              Podium
            </Typography>
            <Box
              component="svg"
              sx={{
                width: 250, height: 70,
                position: 'absolute',
                zIndex: 'modal',
              }}
            >
              <Box
                component="polygon"
                sx={{
                  // fill: rating === 1 && '#e7e751' || rating === 2 && '#C0C0C0',#1368CE
                  fill: '#1368CE',
                  position: 'absolute',
                  zIndex: 'modal',
                  stroke: '#e1b6b6',
                  strokeWidth: 3,
                  boxShadow: 10,
                }}
                points="00,00 250,00 225,70 25,70"
              />
            </Box>
          </Box>
        </Slide>
      </Stack>
    </Box>
  );
};

export default PrepareSumary;
