import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
} from '@mui/material';
import { roundData } from '../../functions/roundData';

export function DisplayRecipe(props: any) {
    const { selectedRecipe, recipeList } = props;
    const recipeToDisplay = recipeList.filter(
        (recipe: any) => recipe.recipeName === selectedRecipe
    );
    const { recipeName, ingredients, steps, cost } = recipeToDisplay[0];

    return (
        <div className='section-to-print'>
            <Typography>{recipeName}</Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredients</TableCell>
                            <TableCell align='right'>Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.map((ingredient: any) => (
                            <TableRow
                                key={ingredient.ingredient}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}>
                                <TableCell component='th' scope='row'>
                                    {ingredient.amount}g {ingredient.ingredient}
                                </TableCell>
                                <TableCell align='right'>
                                    {ingredient.cost}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align='right'></TableCell>
                            <TableCell align='right'>
                                {cost
                                    ? `Total Cost: ${roundData(cost, 2)}`
                                    : 'N/A'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography>Steps:</Typography>
            <ol>
                {steps ? steps.map((step: any) => <li>{step.step}</li>) : null}
            </ol>
        </div>
    );
}
