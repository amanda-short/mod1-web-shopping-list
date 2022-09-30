const SUPABASE_URL = 'https://zdnmoptevevfiyieywuy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkbm1vcHRldmV2Zml5aWV5d3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTczNjUsImV4cCI6MTk3OTg3MzM2NX0.koYUTszT6YJZvITkdoQt__LGGIXh6Z2M8j4miQvz4qQ';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createItem(item) {
    return await client
        .from('lists')
        .insert(item)
        .single();
}

export async function getItems() {
    return await client.from('lists').select('*').order('created_at');
}

export async function getQuantity() {
    return await client.from('lists').select('*').order('created_at');
}

export async function boughtItems(id) {
    return await client
        .from('lists')
        .update({ bought: true })
        .eq('id', id)
        .single();
}

export async function deleteBoughtItems() {
    // const user = getUser(); UNNEEDED state already in app.js
    return await client
        .from('lists')
        .delete()
        .match({ bought: true });
        // .eq('user_id', user.id);
}        