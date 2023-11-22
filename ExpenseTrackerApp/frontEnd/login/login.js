const form = document.getElementById("formField");



form.addEventListener("submit",loginDetails);


function loginDetails(e){
e.preventDefault();
console.log("thisis login Details function");
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const obj = {
    email:email,
    password:password
}
     const loginStatus = document.getElementById('loginStatus');   
    //  axios.post('http://65.1.100.107:4000/login', obj)
     axios.post('http://localhost:4000/login', obj)
     .then(response1 => {
        console.log("response1",response1);
       if (response1.status === 200) {
         loginStatus.style.display = "flex";
         loginStatus.style.color = "red";
         loginStatus.textContent = "Login successful";
         localStorage.setItem('token', response1.data.token);
         window.location.href = '../expense/expense.html';
       } 
     })
     .catch(err => {
       console.log("Error in status:", err.response.status);
       if(err.response.status === 401) {
        loginStatus.style.display = "flex";
        loginStatus.style.color = "red";
        loginStatus.textContent = "Password is incorrect";
        console.log('Password is incorrect.');
      } else if (err.response.status === 404) {
        loginStatus.style.display = "flex";
        loginStatus.style.color = "red";
        loginStatus.textContent = "Email ID not found";
        console.log('Email ID not found');
      } else {
        loginStatus.style.display = "flex";
        loginStatus.style.color = "red";
        loginStatus.textContent = "Request failed with status: " + err.response.status;
        console.log('Request failed with status: ' + err.response.status);
      }
     });
   
}