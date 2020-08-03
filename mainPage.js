// Worked on by Stephen Mackey
// client side Js
const form = document.querySelector('form');
const API_URL = 'http://localhost:5000/profile';
/*
    Whenever we add the database we will add a function to search the username
    to see if that username is in the database and if it is then the user will
    be taken to the profile page, otherwise it will take the user to the 
    profile page to finish setting up their profile. Then it will update the 
    database appropriately.
    Currently the event listener just takes in the values in the user and password
    fields and puts them into a profile object we can use to verify the account in
    the database and then push them through to the profile page.
*/
form.addEventListener('submit', (event) =>
{
    event.preventDefault();
    const formData = new FormData(form);
    const user = formData.get('user');
    const password = formData.get('password');

    const profile = {
        user,
        password
    };
    console.log(profile);
    // code will be added to add the profile object and its contents to the database
    // once the database is added
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
            'content-type': 'application/json'
        }
    });

    location.replace('menu_page.html');
});
