import {
    MenuItem,
    CardActionArea,
    IconButton,
    Card,
    CardContent,
    CardActions,
    CardMedia, TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button
} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Home from "@mui/icons-material/Home";


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast'
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger'
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera'
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee'
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats'
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey'
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball'
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern'
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms'
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil'
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star'
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike'
    }
]

export const HomePage = () => {
    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: purple[500],
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#0ff100',
            },
        },
    });
    return (
        <Container sx={{ width: '100%', marginTop: 2 }}>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* {Array.from(Array(6)).map((_, index) => ( */}
                {itemData.map((eachPhoto, index) => (
                    <Grid item xs={6} key={index}>
                        <Card
                            // sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}
                            sx={{ gridArea: 'footer', bgcolor: '#767676', color: 'white' }}
                        >
                            <CardMedia
                                component='img'
                                height='200'
                                image={eachPhoto.img}
                                alt='unsplash image'
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h4' component='div'>
                                    React
                                </Typography>
                                <Typography variant='body1' color='text'>
                                    React is a JavaScript library for building user interfaces. React
                                    can be used as a base in the development of single-page or mobile
                                    applications.
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <ThemeProvider theme={theme}>
                                    <Button color="secondary" sx={{ fontSize: 18 }}>Share</Button>
                                    <Button color="secondary" sx={{ fontSize: 18 }}>Learn More</Button>
                                </ThemeProvider>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}; 
