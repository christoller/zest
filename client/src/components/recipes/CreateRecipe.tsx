import {
    Box,
    Button,
    TableContainer,
    Paper,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Modal,
    Grid,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { AddIngredientToRecipe } from './AddIngredientToRecipe';
import { AddRecipeStep } from './AddRecipeStep';
import StyledButton from '../../styles/styledButton';
import { roundData } from '../../functions/roundData';

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

export function CreateRecipe(props: any) {
    const [recipeList, setRecipeList] = useState<Array<object>>([]);
    const [steps, setSteps] = useState<Array<string>>([]);
    const [openAddIngredient, setOpenAddIngredient] = useState(false);
    const [openAddStep, setOpenAddStep] = useState(false);
    const [fieldValue, setFieldValue] = useState('');

    const handleOpenAddIngredient = () => {
        setOpenAddIngredient(true);
    };
    const handleOpenAddStep = () => {
        setOpenAddStep(true);
    };

    const handleRemoveIngredient = (e: any) => {
        const indexKey = e.target.getAttribute('index-key');
        const revisedRecipeList = recipeList;
        revisedRecipeList.splice(indexKey, 1);
        setRecipeList([...revisedRecipeList]);
    };

    const handleSubmit = () => {
        const id = localStorage.getItem('user_id');

        const calculateCost = () => {
            let cost = 0;
            recipeList.forEach((ingredient: any) => {
                cost += ingredient.cost;
            });
            return cost;
        };

        const newRecipe = {
            recipeName: fieldValue,
            ingredients: recipeList,
            steps: steps,
            cost: calculateCost(),
        };
        axios
            .patch(`/api/recipes/${id}/`, newRecipe)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        props.setOpen(false);
    };

    return (
        <div>
            <div className='w-full border border-black shadow-black my-8 mx-auto rounded-xl p-6 bg-white'>
                <h3 className='font-bold text-lg mb-4'>Name of Recipe</h3>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3, width: '85%', height: '85%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='recipe-name'
                                label='Recipe Name'
                                name='recipe-name'
                                value={fieldValue}
                                onChange={(e: any) => {
                                    setFieldValue(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div className='w-full border border-black shadow-black my-8 mx-auto rounded-xl p-6'>
                <h3 className='font-bold text-lg mb-4'>Ingredients</h3>
                <TableContainer component={Paper} sx={{}}>
                    <Table
                        sx={{ minWidth: 350 }}
                        size='small'
                        aria-label='a dense table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ingredient</TableCell>
                                <TableCell align='right'>Amount</TableCell>
                                <TableCell align='right'>Cost</TableCell>
                                <TableCell align='right'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipeList.map((row: any, index: number) => (
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
                                    <TableCell align='right'>
                                        {roundData(row.cost, 2)}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            index-key={index}
                                            variant='text'
                                            onClick={handleRemoveIngredient}>
                                            remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    type='submit'
                    variant='text'
                    sx={{ mt: 3, mb: 2, color: 'rgb(101 163 13)' }}
                    onClick={handleOpenAddIngredient}>
                    Add Ingredient
                </Button>
            </div>
            <div className='w-full border border-black shadow-black mt-8 mb-4 mx-auto rounded-xl p-6'>
                <h3 className='font-bold text-lg mb-4'>Steps</h3>
                <ol className='list-decimal mx-5'>
                    {steps.map((step: any, index: number) => {
                        return <li key={index}>{step.step}</li>;
                    })}
                </ol>
                <Button
                    type='submit'
                    variant='text'
                    sx={{ mt: 3, mb: 2, color: 'rgb(101 163 13)' }}
                    onClick={handleOpenAddStep}>
                    Add Step
                </Button>
            </div>
            <br />
            <div className='w-full flex justify-center'>
                <StyledButton
                    type='submit'
                    variant='contained'
                    onClick={handleSubmit}
                    sx={{}}>
                    Create Recipe
                </StyledButton>
            </div>
            <Button
                sx={{ color: 'rgb(101 163 13)', my: 1 }}
                variant='text'
                fullWidth
                onClick={() => props.setOpen(false)}>
                Close
            </Button>
            <Modal
                open={openAddIngredient}
                onClose={() => setOpenAddIngredient(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <AddIngredientToRecipe
                        recipeList={recipeList}
                        setRecipeList={setRecipeList}
                        setOpenAddIngredient={setOpenAddIngredient}
                    />
                </Box>
            </Modal>
            <Modal
                open={openAddStep}
                onClose={() => setOpenAddStep(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <AddRecipeStep
                        steps={steps}
                        setSteps={setSteps}
                        setOpenAddStep={setOpenAddStep}
                    />
                </Box>
            </Modal>
        </div>
    );
}
