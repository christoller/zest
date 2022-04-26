import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupBackground from '../../assets/signup-background.jpg';
import { validateSignup } from '../../functions/validateSignup';

const theme = createTheme();

export function SignUp() {
    const [errorMessage, setErrorMessage] = useState<any>();
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body: any = Object.fromEntries(data.entries());

        setErrorMessage(validateSignup(body));

        if (!errorMessage) {
            axios
                .post('/api/users/', body)
                .then((response) => {
                    navigate('/login');
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.message);
                });
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${signupBackground})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '800px',
            }}>
            <div style={{ paddingTop: 100 }}>
                <ThemeProvider theme={theme}>
                    <Container component='main' maxWidth='sm'>
                        <CssBaseline />
                        <Box
                            sx={{
                                padding: 10,
                                margin: '8 auto 0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 10,
                            }}>
                            <Avatar
                                sx={{
                                    m: 1,
                                    bgcolor: 'secondary.main',
                                }}></Avatar>
                            <Typography component='h1' variant='h5'>
                                Sign up
                            </Typography>
                            {errorMessage ? (
                                <p style={{ color: 'red', fontWeight: 'bold' }}>
                                    {errorMessage}
                                </p>
                            ) : null}
                            <Box
                                component='form'
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete='given-name'
                                            name='username'
                                            required
                                            fullWidth
                                            id='username'
                                            label='Username'
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id='email'
                                            label='Email Address'
                                            name='email'
                                            autoComplete='email'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name='password'
                                            label='Password'
                                            type='password'
                                            id='password'
                                            autoComplete='new-password'
                                        />
                                        <p className='text-xs mt-1'>
                                            Password must be at least 8
                                            characters, contain a lower case
                                            letter, uppercase letter, special
                                            character and a number.
                                        </p>
                                    </Grid>
                                </Grid>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}>
                                    Sign Up
                                </Button>
                                <Grid container justifyContent='flex-end'>
                                    <Grid item>
                                        <Link href='/login' variant='body2'>
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    );
}
