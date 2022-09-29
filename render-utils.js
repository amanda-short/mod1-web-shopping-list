export function renderItem(item) {
    const li = document.createElement('li');
    if (item.bought) {
        li.classList.add('bought');
    }

    const p = document.createElement('p');
    p.textContent = item.item;
    li.append(p);

    return li;
}
