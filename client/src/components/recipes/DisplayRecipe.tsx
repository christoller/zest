import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Button,
} from '@mui/material';
import { roundData } from '../../functions/roundData';

export function DisplayRecipe(props: any) {
    const { selectedRecipe, recipeList, setOpen } = props;
    const recipeToDisplay = recipeList.filter(
        (recipe: any) => recipe.recipeName === selectedRecipe
    );
    const { recipeName, ingredients, steps, cost } = recipeToDisplay[0];

    return (
        <div className='mx-20 mt-10 section-to-print'>
            <Typography
                sx={{
                    textAlign: 'center',
                    paddingTop: '2%',
                    fontSize: '3rem',
                    fontFamily: 'Roboto Mono',
                    fontWeight: 900,
                    marginBottom: '30px',
                }}>
                {recipeName}
            </Typography>
            <Typography
                sx={{
                    textAlign: 'left',
                    paddingTop: '2%',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    // marginBottom: '15px',
                }}>
                Ingredients
            </Typography>
            <div className='border border-black h-0 w-44 my-1'></div>
            <TableContainer
                component={Paper}
                sx={{ width: '100%', marginTop: '20px' }}>
                <Table size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontSize: '1rem', fontWeight: '700' }}>
                                Ingredients
                            </TableCell>
                            <TableCell
                                align='right'
                                sx={{ fontSize: '1rem', fontWeight: '700' }}>
                                Cost
                            </TableCell>
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
                                <TableCell
                                    component='th'
                                    scope='row'
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                    }}>
                                    {ingredient.amount}g {ingredient.ingredient}
                                </TableCell>
                                <TableCell
                                    align='right'
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                    }}>
                                    {`$${ingredient.cost}`}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align='right'></TableCell>
                            <TableCell
                                align='right'
                                sx={{ fontSize: '1rem', fontWeight: '700' }}>
                                {cost
                                    ? `Total Cost: $${roundData(cost, 2)}`
                                    : 'N/A'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography
                sx={{
                    textAlign: 'left',
                    paddingTop: '2%',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                }}>
                Recipe Method
            </Typography>
            <div className='border border-black h-0 w-44 my-1'></div>
            <ol className=''>
                {steps
                    ? steps.map((step: any, index: number) => (
                          <li className='py-1'>
                              <p className='font-bold text-lg'>{`Step ${
                                  index + 1
                              }`}</p>
                              <p>{step.step}</p>
                          </li>
                      ))
                    : null}
            </ol>
            <div className='button-to-hide'>
                <Button
                    sx={{ color: 'rgb(101 163 13)' }}
                    variant='text'
                    fullWidth
                    onClick={() => setOpen(false)}>
                    Close
                </Button>
            </div>
        </div>
    );
}
