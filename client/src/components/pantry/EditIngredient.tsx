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
import { InputLabel } from '@mui/material';

const theme = createTheme();

export function EditIngredient(props: any) {
    const id = localStorage.getItem('user_id');
    const row = props.rows;
    const ingredientKey = props.ingredientKey;
    const [error, setError] = useState<any>();
    const { ingredient, supplier, costPerUnit, unitSize } = row[ingredientKey];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let fSupplier;
        let fUnitSize;
        let fCostPerUnit;

        if (data.get('supplier') === '') {
            fSupplier = supplier;
        } else fSupplier = data.get('supplier');

        if (data.get('unitSize') === '') {
            fUnitSize = unitSize;
        } else fUnitSize = data.get('unitSize');

        if (data.get('costPerUnit') === '') {
            fCostPerUnit = costPerUnit;
        } else fCostPerUnit = data.get('costPerUnit');

        const costPerGram = parseFloat(fCostPerUnit) / parseFloat(fUnitSize);

        const ingredientData = {
            ingredient: ingredient,
            supplier: fSupplier,
            unitSize: fUnitSize,
            costPerUnit: fCostPerUnit,
            costPerGram: costPerGram,
        };

        axios.patch(`/api/pantry/${id}/edit`, ingredientData).catch((error) => {
            console.log(error);
        });
        props.setOpenEdit(false);
    };

    const handleDelete = (e: any) => {
        const ingredientToDelete = {
            ingredient: ingredient,
        };

        axios
            .patch(`/api/pantry/${id}/delete`, ingredientToDelete)
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
                            {ingredient}
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
                                    <InputLabel id='supplier-label'>
                                        Supplier
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        id='supplier'
                                        label={supplier}
                                        name='supplier'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id='unit-size-label'>
                                        Unit Size
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        id='unitSize'
                                        label={unitSize}
                                        name='unitSize'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id='cost-per-unit-label'>
                                        Cost Per Unit
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        name='costPerUnit'
                                        label={costPerUnit}
                                        type='text'
                                        id='costPerUnit'
                                    />
                                </Grid>
                            </Grid>
                            <div>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}>
                                    Update
                                </Button>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='text'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleDelete}>
                                    Delete Ingredient
                                </Button>
                                <Button
                                    variant='text'
                                    fullWidth
                                    onClick={() => props.setOpenEdit(false)}>
                                    Close
                                </Button>
                            </div>

                            <Grid container justifyContent='flex-end'></Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
