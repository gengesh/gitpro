
// const arr=['EEE','CSE','ECE','IT','MECH','BIO']
// let i=0
// for(let op of arr){
// //     const newopt = document.createElement('option')
// //     const optiontext =document.createTextNode(op)
// // newopt.appendChild(optiontext)
// // newopt.setAttribute('value','Option Value')
// // const select=document.querySelector('select')
// // sel.appendChild(newopt)
// const sel=document.querySelector('select')
// const newopt = document.createElement('option')
// newopt.text=op
// sel.add(newopt)
// }
// console.log("checking")
// const arr1 = [4,6,2,3,1,1,3,5,7,8,4,3];
// // const dup = arr1.reduce(
// //     (accumulator,currval) => {
// //         console.log(accumulator[currval])
// //     if(!accumulator[currval])
// //      return accumulator
// //     }
// //     ,{});
// // console.log(dup)
// const dup = arr1.filter((element,index) => {
//     console.log(arr1.indexOf(element))
//     console.log((arr1.indexOf(element) == index))
//     return arr1.indexOf(element) == index;

// });
// console.log(dup)  
// get and set  
// class Temperature{
//     constructor(temp){
//         this._temp = temp
//     }
//     get temp(){
//         return `${this._temp} deg celcius`
//     }
// }
// let temp1 = new Temperature(25)
// // console.log(temp1.temp)
// try{
//     num = prompt("enter the number")
//     if(isNaN(num))
//     throw "Enter a valid number"
//     console.log(num*2)
// }
// catch(error){
//     console.log(error)
// }
async function fn(){
    return 'hello'
}
console.log(fn())
// fn().then((msg) => console.log(msg))
let reachA = new Promise((resolve,reject) =>{
    const reached = false
    if(reached)
    setTimeout(resolve,3000,"vidya reached")
    else
    reject("vidya not reached")
})
async function ayncstatus(){
    try{
    console.log('hi...')
    res = await reachA
    console.log(res)
    console.log('bye')
    }
    catch(err){
        console.log(err)
    }
}
ayncstatus()