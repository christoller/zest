import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { isNull } from 'util';

const theme = createTheme();

export function AddIngredients() {
    const [error, setError] = useState<any>();

    const [costPerUnit, setCostPerUnit] = useState<any>();
    const [unitSize, setUnitSize] = useState<any>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const costPerGram = parseFloat(costPerUnit) / parseFloat(unitSize);
        const ingredientData = {
            ingredient: data.get('ingredient'),
            supplier: data.get('supplier'),
            unitSize: unitSize,
            costPerUnit: data.get('costPerUnit'),
            costPerGram: costPerGram,
        };
        console.log(ingredientData);
        const id = sessionStorage.getItem('user_id');
        axios
            .patch(`/api/users/${id}/pantry`, ingredientData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
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
                            Add Ingredient
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
                                        name='ingredient'
                                        required
                                        fullWidth
                                        id='ingredient'
                                        label='Ingredient'
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id='supplier'
                                        label='Supplier'
                                        name='supplier'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={unitSize}
                                        id='unitSize'
                                        label='Unit Size In Grams'
                                        name='unitSize'
                                        onChange={(e: any) => {
                                            setUnitSize(e.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name='costPerUnit'
                                        label='Cost Per Unit'
                                        type='text'
                                        id='costPerUnit'
                                        onChange={(e: any) =>
                                            setCostPerUnit(e.target.value)
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Add Ingredient
                            </Button>
                            <Grid container justifyContent='flex-end'></Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
