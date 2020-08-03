//Worked on by Stephen Mackey
const form =  document.querySelector('form'); //grabbing element on page
const API_URL = 'http://localhost:5000/profile_complete';

form.addEventListener('submit', (event) =>
{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const addr1 = formData.get('addr1');
    const addr2 = formData.get('addr2');
    const city = formData.get('city');
    const state = formData.get('state');
    const zipcode = formData.get('zipcode');

    const profile_complete = {
        name,
        addr1,
        addr2,
        city,
        state,
        zipcode
    };
    console.log(profile_complete);
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(profile_complete),
        headers: {
            'content-type': 'application/json'
        }
    });
    //after this we will access the database and put this information into 
    //the correct user information to complete the profile information
});
