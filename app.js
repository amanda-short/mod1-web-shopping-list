/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import {
    createItem,
    getItems, 
} from './fetch-utils.js';
import { renderItem } from './render-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');


/* State */
let items = [];
let error = null;

/* Events */

window.addEventListener('load', async () => {
    const response = await getItems();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    }

    if (items) {
        displayItems();
    }
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: 1,
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        addItemForm.reset();
    }
});





/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayItems() {
    itemList.innerHTML = '';


    for (const item of items) {
        console.log(item);
        const itemEl = renderItem(item);
        itemList.append(itemEl);

        itemEl.addEventListener('click', async () => {
            const response = await getItems(item.id);
            error = response.error;
            const updatedItem = response.data;

            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItems();
            }
        });
    }
}


