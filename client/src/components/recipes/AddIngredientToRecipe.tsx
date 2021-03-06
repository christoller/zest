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
    Autocomplete,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { keysrt } from '../../functions/keysrt';

const theme = createTheme();
const id = localStorage.getItem('user_id');

export function AddIngredientToRecipe(props: any) {
    const [error, setError] = useState<string>();
    const [pantryList, setPantryList] = useState([
        { ingredient: '', costPerGram: '' },
    ]);
    const [amount, setAmount] = useState('');
    const { recipeList, setRecipeList } = props;

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const pantryIngredient = await pantryList.filter((ingredient) => {
            return ingredient.ingredient === data.get('ingredient');
        });
        if (pantryIngredient.length === 0) {
            setError(
                'Ingredient entered is not in pantry list. Add to pantry and try again.'
            );
        }
        const { ingredient, costPerGram } = pantryIngredient[0];
        const ingredientCost = parseFloat(costPerGram) * parseFloat(amount);
        const newRecipeIngredient = {
            ingredient: ingredient,
            amount: amount,
            cost: ingredientCost,
        };

        if (
            newRecipeIngredient.ingredient === '' ||
            newRecipeIngredient.amount === ''
        ) {
            setError(
                'Missing Ingredient Name or Amount. Please complete all fields and try again.'
            );
        } else if (!newRecipeIngredient.amount.match(/^(0|[1-9]\d*)$/)) {
            setError('Invalid amount. Please input a whole number, in grams');
        } else {
            setRecipeList([...recipeList, newRecipeIngredient]);
            setAmount('');
            props.setOpenAddIngredient(false);
        }
    };

    useEffect(() => {
        axios.get(`/api/pantry/${id}`).then((response) => {
            setPantryList(response.data);
        });
    }, []);

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
                            Create Recipe
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
                                    <Autocomplete
                                        freeSolo
                                        id='ingredient'
                                        disableClearable
                                        options={keysrt(
                                            pantryList,
                                            'ingredient'
                                        ).map((option) => option.ingredient)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name='ingredient'
                                                label='Ingredient'
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: 'search',
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={amount}
                                        onChange={(e: any) => {
                                            setAmount(e.target.value);
                                        }}
                                        id='amount'
                                        label='Amount in (g)'
                                        name='amount'
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
