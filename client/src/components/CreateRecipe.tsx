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
    TableContainer,
    Paper,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Modal,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { keysrt } from '../functions/keysrt';
import { AddIngredientToRecipe } from './AddIngredientToRecipe';
import { AddRecipeStep } from './AddRecipeStep';

interface AutocompleteOption {
    label: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const theme = createTheme();
const id = sessionStorage.getItem('user_id');

export function CreateRecipe() {
    const [error, setError] = useState<any>();
    const [recipeList, setRecipeList] = useState([
        { ingredient: 'Apples', amount: '1300', cost: '4.35' },
    ]);
    const [openAddIngredient, setOpenAddIngredient] = useState(false);
    const [openAddStep, setOpenAddStep] = useState(false);
    const handleOpenAddIngredient = (e: any) => {
        setOpenAddIngredient(true);
    };
    const handleOpenAddStep = (e: any) => {
        setOpenAddStep(true);
    };
    const [steps, setSteps] = useState('Add A Step');

    const handleSubmit = (e: any) => {
        //todo
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredient</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                            <TableCell align='right'>Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipeList.map((row) => (
                            <TableRow
                                key={row.ingredient}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}>
                                <TableCell component='th' scope='row'>
                                    {row.ingredient}
                                </TableCell>
                                <TableCell align='right'>
                                    {row.amount}
                                </TableCell>
                                <TableCell align='right'>{row.cost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                type='submit'
                variant='text'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOpenAddIngredient}>
                Add Ingredient
            </Button>
            <div>
                <p>{steps}</p>
            </div>
            <Button
                type='submit'
                variant='text'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOpenAddStep}>
                Add Step
            </Button>
            <br />
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                Create Recipe
            </Button>
            <Modal
                open={openAddIngredient}
                onClose={() => setOpenAddIngredient(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <AddIngredientToRecipe />
                </Box>
            </Modal>
            <Modal
                open={openAddStep}
                onClose={() => setOpenAddStep(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <AddRecipeStep />
                </Box>
            </Modal>
        </div>
    );
}
