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
    const [error, setError] = useState<any>();
    const [recipeList, setRecipeList] = useState<any>([]);
    const [steps, setSteps] = useState<any>([]);
    const [openAddIngredient, setOpenAddIngredient] = useState(false);
    const [openAddStep, setOpenAddStep] = useState(false);
    const [fieldValue, setFieldValue] = useState('');

    const handleOpenAddIngredient = (e: any) => {
        setOpenAddIngredient(true);
    };
    const handleOpenAddStep = (e: any) => {
        setOpenAddStep(true);
    };

    const handleRemoveIngredient = (e: any) => {
        const indexKey = e.target.getAttribute('index-key');
        const revisedRecipeList = recipeList;
        revisedRecipeList.splice(indexKey, 1);
        setRecipeList([...revisedRecipeList]);
    };

    const handleSubmit = (e: any) => {
        const id = sessionStorage.getItem('user_id');

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
            <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
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
                            <TableCell align='right'></TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipeList.map((row: any, index: any) => (
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
                                <TableCell align='right'>
                                    <Button variant='text'>edit</Button>
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
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOpenAddIngredient}>
                Add Ingredient
            </Button>
            <ol>
                {steps.map((step: any) => {
                    return <li>{step.step}</li>;
                })}
            </ol>
            <Button
                type='submit'
                variant='text'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOpenAddStep}>
                Add Step
            </Button>
            <br />
            <Button
                type='submit'
                variant='contained'
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}>
                Create Recipe
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
