import { TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';



export const PlayerPage = () => {
    const colorBg = '#46178F';
    const colorText = purple[0];

    return (
        <Box height="100vh"  >
            <Box sx={{
                width: '100%',
                height: '90%',
                bgcolor: colorBg,
                display: 'inline-grid',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            }}>
                <Box component='div' justifyContent='center' alignItems='center'>
                    <h1 align='center'> Kahut!</h1>
                    <Stack
                        borderRadius={3}
                        padding={4}
                        spacing={2}
                        direction='column'
                        bgcolor='white'>
                        <TextField
                            label='Game pin'
                            variant='outlined'
                            color="secondary"
                            inputProps={{
                                style: { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }
                            }}
                        />
                        <Button variant="contained" color="success">
                            Enter
                        </Button>
                    </Stack>
                    {/* <Container maxWidth="xs" display='flex' justifyContent='center' >
                    <Box sx={{ bgcolor: 'white', height: '20vh', p: 3 }}  >
                        <TextField label='Game pin' variant='outlined' />
                        <Button>Enter</Button>
                    </Box>
                </Container> */}
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                height: '10%',
                bgcolor: colorBg,
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'top',
                color: 'white'
            }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        color: 'white',
                        fontWeight: '700',
                    }}
                >
                    {"Create your own kahut for FREE at kahut.com"}
                </Box>
                <Box
                    sx={{
                        display: 'inline-flex',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        justifyContent: 'center'
                    }}
                >
                    {"Terms | Privacy"}
                </Box>
            </Box>
        </Box >
    );
};
