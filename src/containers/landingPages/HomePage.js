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
    Button,
} from '@mui/material'
import Masonry from '@mui/lab/Masonry';

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
        img: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4',
        title: 'Make learning awesome!',
        subTitle: 'Kahut! delivers engaging learing to billions.',
        actionTitle: 'Sign up for free!',
        linkTo: '/signup'
    },
    {
        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
        title: 'Make your team superstar presenters',
        subTitle: 'Set your whole team up to deliver awesome presentations with Kahut! 360 Spirit, our best plan.',
        actionTitle: 'Learn more >'
    },
    {
        img: 'https://kahoot.com/files/2021/12/theming_mosaic_cropped_2.png',
        title: 'NEW! Create a branded experience with Kahut! themes',
        subTitle: 'Boost audience engagement by customizing your kahuts for your work setting.',
        actionTitle: 'Choose Kahut! 360 Pro vjp'
    },
    {
        img: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        title: 'Meet Kahut! Kids!',
        subTitle: "Spark your child's curiosity for learning with our new playful app experience..",
        actionTitle: 'Get started today'
    },
    {
        img: 'https://images.unsplash.com/photo-1610894065081-fce3e6833dcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
        title: 'Support Ukraine',
        subTitle: 'Join us in our efforts to support Ukainain educators and learners affedted by the current crisis.',
        actionTitle: 'Donate today'
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: "Who says studing can't be fun?",
        subTitle: "Kahut!+ Study introduces a fast and flexible study tookit that makes learning more intersting, more engaging, and more enjoyable.",
        actionTitle: 'Learn more >'
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
        <Box sx={{ width: '100%', mx: 0, px: 10, justifyContent: 'center', display: "flex", backgroundColor: 'snow' }}>
            <Masonry columns={2} spacing={4} sx={{ marginTop: 2 }} width='100%'>
                {/* {Array.from(Array(6)).map((_, index) => ( */}
                {itemData.map((eachItem, index) => (
                    <Card
                        key={index}
                        // sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}
                        sx={{ bgcolor: '#767676', color: 'white', boxShadow: 15, border: 2, borderColor: 'purple', borderRadius: 3 }}
                    >
                        <CardMedia
                            component='img'
                            height='200'
                            image={eachItem.img}
                            alt='unsplash image'
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div' fontWeight='bold'>
                                {eachItem.title}
                            </Typography>
                            <Typography variant='body2' color='text'>
                                {eachItem.subTitle}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ marginBottom: 1 }}>
                            <ThemeProvider theme={theme}>
                                <Button
                                    color="secondary"
                                    variant='outlined'
                                    sx={{
                                        fontSize: 16,
                                        borderColor: 'white',
                                        textTransform: 'none',
                                        '&:hover': {
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    href={eachItem.linkTo ? eachItem.linkTo : "#"}
                                >
                                    {eachItem.actionTitle}
                                </Button>
                            </ThemeProvider>
                        </CardActions>
                    </Card>
                ))}
            </Masonry>
        </Box>
    );
}; 
