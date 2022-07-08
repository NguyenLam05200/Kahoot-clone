import { Box, Stack, Typography, Button, } from '@mui/material'

import { useSelector } from "react-redux";
import { playerSelector } from './playerSlice';


const generateMedal = (rating) => {
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
  else if (rating === 3) {
    colorMedal = '#E14001';
    colorStroke = '#EA680E';
  }
  else {
    colorMedal = '##864CBF';
    colorStroke = '#ec58d5';
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
        {rating}
        {rating === 1 && 'st '}
        {rating === 2 && 'nd '}
        {rating === 3 && 'rd '}
        {rating > 3 && 'th '}
        place
      </Typography>
      <Typography
        sx={{
          fontSize: 24,
        }}
        align='center' fontWeight='bold'>
        #{rating}
      </Typography>
    </Stack>
  )
}

const Sumary = ({ }) => {
  const { name, score, rating } = useSelector(
    playerSelector
  );

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
    }}>
      <Box
        sx={{
          height: '95%',
          boxShadow: 5,
          display: 'flex',
          backgroundColor: '#1368CE',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        {generateMedal(rating)}
      </Box>
      <Box
        sx={{
          height: '5%',
          boxShadow: 5,
          display: 'flex',
          px: 1,
        }}
      >
        <Typography sx={{
          fontWeight: 'bold',
          width: '40%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'left',
          display: 'flex',
          fontSize: 20,
        }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '60%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained"
            aria-disabled='true'
            sx={{
              mx: 1,
              fontWeight: 'bold',
              backgroundColor: 'black',
              "&:hover": {
                backgroundColor: "black"
              },
              cursor: 'text',
              py: 0.3
            }}
          >{score}</Button>
          <Button
            variant='contained'
            color='success'
            sx={{ textTransform: 'none', py: 0.3 }}
          >Sign up</Button>
        </Box>

      </Box>
    </Box >
  );
};

export default Sumary;
