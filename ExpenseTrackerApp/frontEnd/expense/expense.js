// const { getExpenses } = require("../../backEnd/services/userservices");


const form = document.getElementById("formField");
const premium = document.getElementById("rzp-button");
const leaderBoardBtn = document.getElementById("leaderboardbtn");
const download = document.getElementById('downloadBtn');

form.addEventListener('submit',addExpense);
premium.addEventListener('click',buyPremium);
leaderBoardBtn.addEventListener('click',showLeaderBoard);
download.addEventListener('click',downloadFile);
const pagination = document.getElementById('pagination');

function downloadFile(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.get("http://localhost:4000/expense/downloadfile",{headers:{"Authorization":token}})
    .then(response => {
        console.log(response);
        if(response.status === 200){
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        }else{
            console.log("err",response);
        }
    }).catch(err => {
        console.log(err);
    })
}


allExpenses();

function listOfExpenses(expenses){
     const list = document.getElementsByClassName('list');
     while (list[0].firstChild) {
        list[0].removeChild(list[0].firstChild);
    }
     expenses.forEach(item =>{
        const li = document.createElement('li');
        const details = `${item.amount} : ${item.description} : ${item.category}`;
        li.textContent = details;
        const btn = document.createElement('button');
        btn.textContent = "Delete";
        li.style.marginBottom = '0.5rem';
        btn.className = "deletebutton";
        btn.setAttribute("data-value",item.id);
        li.appendChild(btn);
        list[0].appendChild(li);
        btn.addEventListener("click",deleteExpense);
    })
    
}
function showPagination(data) {
          const currentPage=data.currentPage;
          const hasNextPage=data.hasNextPage;
          const nextPage=data.nextPage;
          const hasPreviousPage=data.hasPreviousPage;
          const previousPage=data.previousPage;
          const lastPage=data.lastPage;
          console.log(`currentPage:${currentPage},hasNextPage:${hasNextPage},nextPage:${nextPage},hasPreviousPage:${hasPreviousPage},previousPage:${previousPage},lastPage:${lastPage}`);
         pagination.innerHTML = '';
         if(hasPreviousPage){
            const btn2 = document.createElement('button');
            btn2.innerHTML = previousPage;
            btn2.addEventListener('click', () => getExpenses(previousPage));
            pagination.appendChild(btn2);
         }
         const btn1 = document.createElement('button');
         btn1.innerHTML = `<h3>${currentPage}</h3>`;
         btn1.addEventListener('click',() => getExpenses(currentPage));
         pagination.appendChild(btn1);

         if(hasNextPage) {
            const btn3 = document.createElement('button');
            btn3.innerHTML = nextPage;
            btn3.addEventListener('click',() => getExpenses(nextPage));
            pagination.appendChild(btn3);
         }

}
function getExpenses(page){
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:4000/expense?page=${page}`,{headers:{"Authorization":token}})
    .then((res) => {

      
        listOfExpenses(res.data.expenses);
        showPagination(res.data);
 
    })
}

function allExpenses(){
    // console.log("query params of page :",e.target.paginationBtn.value);
    // const page = e.target.paginationBtn.value || 1;
    const page = 1;
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:4000/expense?page=${page}`,{headers:{"Authorization":token}})
    .then((response) => {
        console.log(response.data.expenses);
        console.log(response.data.ispremiumuser);
        if(response.data.ispremiumuser){
            premium.style.display="none";
            const puser = document.getElementById('puser');
            puser.style.display = "block";
        }
        listOfExpenses(response.data.expenses);
       showPagination(response.data);

    })
    }

function addExpense(e){
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const token  = localStorage.getItem('token'); 
    const obj = {
        amount:amount,
        description:description,
        category:category,
    }
    axios.post('http://localhost:4000/expense',obj,{headers:{"Authorization":token}})
    .then(res => {
        console.log("response is ",res.data.createdExpense.id);
        e.target.amount.value = "";
        e.target.description.value = "";
        e.target.category.value = "";
        const list = document.getElementsByClassName('list');
        const li = document.createElement('li');
        const details = `${amount} : ${description} : ${category}`;
        console.log(details);
        li.textContent = details;
        const btn = document.createElement('button');
        btn.textContent = "Delete";
        li.style.marginBottom = '0.5rem';
        btn.className = "deletebutton";
        btn.setAttribute("data-value",res.data.createdExpense.id);
        li.appendChild(btn);
        list[0].appendChild(li);
        btn.addEventListener("click",deleteExpense);
        
    })
    .catch(err =>{
        console.log(err);
    })
}

function deleteExpense(e) {
    console.log("this is delete expenses",e.target.getAttribute('data-value'));
    const id = e.target.getAttribute('data-value');
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:4000/delete/${id}`,{headers:{"Authorization":token}})
    .then(res =>{
        console.log(res);
        const list = document.getElementsByClassName('list');
        const li = e.target.parentElement;
        console.log("lis is   :",li);
        list[0].removeChild(li);
    })
    .catch(err =>{
        console.log(err);
    })

}

 function buyPremium(e){
    const token = localStorage.getItem('token');
   axios.get('http://localhost:4000/purchase/premiummembership',{headers:{"Authorization":token}})
    .then(res => {
        console.log("this is after buypremium");
        var options = {
            "key":res.data.key_id,
            "order_id":res.data.order.id,
            "handler":async function (response) {
                await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,},
                    {headers: {"Authorization":token}})

                     premium.style.display="none";
                     const puser = document.getElementById('puser');
                     puser.style.display = "block";
                    alert('you are a premium User Now!');
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
        rzp1.on('payment.failed',async function(response){
            console.log(response);
            await axios.post("http://localhost:4000/purchase/paymentfailed",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,},
                {headers: {"Authorization":token}})
            alert('something went wrong');
        })
    })
}

 function showLeaderBoard(e){
    e.preventDefault();
    console.log("thisis show leader board");
    const token = localStorage.getItem('token');
    axios.get("http://localhost:4000/premium/leaderboard",{headers:{"Authorization":token}})
   .then(res => {
    console.log(res.data.users);
    const leaderboardList = document.getElementsByClassName("leaderboardlist");
    while(leaderboardList[0].firstChild){
        leaderboardList[0].removeChild(leaderboardList[0].firstChild);
    }
    const leaderboardDiv = document.getElementById('leaderboarddiv');
    const expenses = res.data.users;
    expenses.forEach(item =>{
        leaderboardDiv.style.display = "block";
        const li = document.createElement('li');
        const details = `Name : ${item.name}  Total Expenses : ${item.totalExpense}`;
        li.textContent = details;
        li.style.marginBottom = '0.5rem';
        leaderboardList[0].appendChild(li);
    })

   })
   .catch(err => {
    console.log(err);
   })
}