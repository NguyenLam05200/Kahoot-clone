import {
  Paper,
  Stack,
  Typography,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
export const NotFound = ({ isUser }) => {
  return (
    <Stack
      spacing={4}
      sx={{
        backgroundImage: 'linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
        height: 'calc(100% - 70px)',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: 'thistle'
      }}
    >
      <Typography
        sx={{
          fontSize: 45,
          fontWeight: 'bold',
          color: 'white',
          fontFamily: [
            'cursive',
          ].join(','),
        }}>
        Opps, page not found!
      </Typography>
      <Button
        component={Link}
        to={isUser ? '/user/home' : '/home'}
        style={{
          outline: 'none', textTransform: 'none', fontSize: 20, boxShadow: 10,
          color: 'white'
        }}
        color='secondary'
        variant="contained"
      >Go to home page</Button>
    </Stack>
  );
}; 