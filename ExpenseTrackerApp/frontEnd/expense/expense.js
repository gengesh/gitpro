


const form = document.getElementById("formField");


form.addEventListener('submit',addExpense);

allExpenses();

function allExpenses(){
    axios.get('http://localhost:4000/expense')
    .then((response) => {
        console.log(response.data.expenses);
        const list = document.getElementsByClassName('list');
        response.data.expenses.forEach(item =>{
            const li = document.createElement('li');
            const details = `${item.amount} : ${item.description} : ${item.category}`;
            console.log(details);
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
        

    })
    }

function addExpense(e){
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const obj = {
        amount:amount,
        description:description,
        category:category,
    }
    axios.post('http://localhost:4000/expense',obj)
    .then(res => {
        console.log("response is ",res.data.response.id);
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
        btn.setAttribute("data-value",res.data.response.id);
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
    axios.delete(`http://localhost:4000/delete/${id}`)
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