

const form = document.getElementById("formField");
const response = document.getElementById("response");


form.addEventListener("submit",signUpDetails);


function signUpDetails(e){
e.preventDefault();
console.log("thisis signupdetails function");
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const obj = {
    name:name,
    email:email,
    password:password
}
axios.post('http://localhost:4000/signup',obj)
.then(res =>{
        response.style = "display:flex";
        response.style = "color:red";
        response.textContent = res.data.info;
        if (res.statuscode === 201){
            window.location.href = '../login/login.html';
        }
})
.catch(err => {
   console.log(err);
})
}