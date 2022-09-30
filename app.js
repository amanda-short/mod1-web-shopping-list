/* Imports */

import './auth/user.js';
import {
    createItem,
    getItems, 
    boughtItems,
    deleteBoughtItems,
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

// window.addEventListener('load', async () => {
//     const response = await getQuantity();
//     error = response.error;
//     quantity = response.data;

//     if (error) {
//         displayError();
//     }

//     if (quantity) {
//         displayQuantity();
//     }
// });

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };
console.log(newItem);
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

removeButton.addEventListener('click', async () => {
    const response = await deleteBoughtItems();
    error = response.error;
    if (error) {
        displayError();
    } else {
        items = [];
        displayItems();
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
        const itemEl = renderItem(item);
        itemList.append(itemEl);

        itemEl.addEventListener('click', async () => {
            const response = await boughtItems(item.id);
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


