import { getUsername } from '../functions/getUsername';

export function Help() {
    return (
        <div className='bg-white md:w-3/4 lg:w-8/12 mx-auto p-10 mt-5 rounded-xl shadow-2xl shadow-black font-roboto'>
            <h1 className='text-5xl font-bold'>Help</h1>
            <div>
                <h3 className='text-2xl mt-8 font-bold'>Getting Started</h3>
                <ul className='text-left mt-4'>
                    <li className='mt-5'>
                        The first thing you need to do is create your pantry
                        list. The pantry list comprises of all your ingredients
                        and their costs. This allows the app to cost the recipe
                        as you build it.
                    </li>
                    <li className='mt-5'>
                        Go to the Pantry page and select "Add Ingredient To
                        Pantry". A form will pop up, where you will need to
                        provide information about the ingredient. Once you have
                        completed the fields, Select "Add Ingredient."
                    </li>
                    <li className='mt-5'>
                        Congrats, you've created your first pantry item! As you
                        add more ingredients, the table will populate and
                        provide a handy reference to your ingredient costs.
                        Select the 'Edit' button to update the details of an
                        ingredient, or to delete it.
                    </li>
                    <li className='mt-5'>
                        Once you've aded all the neccessary ingredients to the
                        Pantry, it's time to create a recipe! Go to the Recipes
                        page and select "Create Recipe". A new form will pop up.
                        Within this form, add the desired name of the recipe,
                        then select "Add Ingredient" and as you start typing the
                        name of an ingredient in the ingredient field, the form
                        should display options from your pantry list. Select the
                        required ingredient and the required amount in grams
                        then press the "Add Ingredient" button.
                    </li>
                    <li className='mt-5'>
                        After adding all the ingredients, now select the "Add
                        Step" button. Within this form, fill in the recipe steps
                        one by one. When all the steps are completed, select
                        "Create Recipe" and voila! You have created your first
                        recipe in Zest!
                    </li>
                    <li className='mt-5'>
                        A link to your recipe should now be displayed in the
                        Recipes page. Click on the link to display the recipe,
                        or use the delete button to remove it from your recipes.
                    </li>
                </ul>
            </div>
        </div>
    );
}
