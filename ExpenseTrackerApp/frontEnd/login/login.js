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
// axios.post('http://localhost:4000/login',obj)
// .then(res =>{
//         response.style = "display:flex";
//         response.style = "color:red";
//         response.textContent = res.data.info;
// })
// .catch(err => {
//    console.log(err);
// })
}