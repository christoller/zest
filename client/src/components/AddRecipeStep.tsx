import { ThemeProvider } from '@emotion/react';
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    Grid,
    TextField,
    Button,
    createTheme,
} from '@mui/material';
import { useState } from 'react';

const theme = createTheme();
const id = localStorage.getItem('user_id');

export function AddRecipeStep(props: any) {
    const [error, setError] = useState<any>();
    const { steps, setSteps } = props;
    const [fieldValue, setFieldValue] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const newStep = {
            step: data.get('step'),
        };
        setSteps([...steps, newStep]);
        setFieldValue('');
        props.setOpenAddStep(false);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar
                            sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                        <Typography component='h1' variant='h5'>
                            Add Step
                        </Typography>
                        {error ? (
                            <p style={{ color: 'red', fontWeight: 'bold' }}>
                                {error}
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
                                        required
                                        fullWidth
                                        id='step'
                                        label='Step'
                                        name='step'
                                        value={fieldValue}
                                        onChange={(e: any) => {
                                            setFieldValue(e.target.value);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Add Step
                            </Button>
                            <Grid container justifyContent='flex-end'></Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
