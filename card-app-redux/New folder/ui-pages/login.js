console.log('hello');
async function login(event) {
    event.preventDefault();
    console.log('attempting to login');
    const username = document.getElementById('inputUsername').value; // gets username from sign-in page
    const password = document.getElementById('inputPassword').value; // gets password from sign-in page
    const credentials = {
        username, // variable name is the key, and the value is what is stored in the variable
        password
    }
    try {
        const resp = await fetch('http://localhost:8012/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(credentials),
            headers: {
                'content-type': 'application/json'
            }
        });
    
        const user = await resp.json();

        localStorage.setItem('user', JSON.stringify(user));
        window.location = './cards-table.html'; // navigate to the next page
    } catch (err) {
        console.log(err);
        console.log('invalid credentials')
        const errorElement = document.getElementById('Invalid Credentials')
        errorElement.innerText = 'Invalid Credentials';
        errorElement.style.color = 'red';
    }
    
}









// const user = JSON.parse(localStorage.getItem('user'));
// if(user){
//         document.getElementById
// }
// async function (reteiveUserInput) {
//     const signUserName = document.getElementById('inputUsername')
//     const signPassword = document.getElementById('inputPassword')
//     fetch(/)  
// }