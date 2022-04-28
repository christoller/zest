import * as React from 'react';
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

const theme = createTheme();

export function AddIngredients(props: any) {
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
            costPerUnit: costPerUnit,
            costPerGram: costPerGram,
        };
        const id = localStorage.getItem('user_id');
        console.log(ingredientData);

        if (ingredientData.supplier === '') {
            ingredientData.supplier = 'N/A';
        }

        if (
            ingredientData.ingredient === '' ||
            ingredientData.unitSize === '' ||
            ingredientData.costPerUnit === ''
        ) {
            setError(
                'Missing input fields. Complete all form fields and try again'
            );
        } else if (!ingredientData.unitSize.match(/^(0|[1-9]\d*)$/)) {
            setError(
                'Invaild Unit Size. Please input a whole number, in grams'
            );
        } else if (!ingredientData.costPerUnit.match(/^[0-9]*(\.[0-9]+)?$/)) {
            setError(
                'Invaild input in cost field. Input numbers and decimals only.'
            );
        } else {
            axios
                .patch(`/api/pantry/${id}/`, ingredientData)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            props.setOpen(false);
        }
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
                            <Button
                                variant='text'
                                fullWidth
                                onClick={() => props.setOpen(false)}>
                                Close
                            </Button>
                            <Grid container justifyContent='flex-end'></Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
