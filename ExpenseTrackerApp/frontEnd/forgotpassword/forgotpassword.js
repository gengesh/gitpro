const form = document.getElementById("formField");


form.addEventListener('submit',forgotPassword);


function forgotPassword(e){
    e.preventDefault();
    const emailId = e.target.email.value;
    console.log("emailid is :",emailId)
    axios.post('http://localhost:4000/password/forgotpassword',{emailId})
    .then(res => {
        console.log("successs response:",res);
    })
    .catch(err => {
        console.log(err);
    })

}