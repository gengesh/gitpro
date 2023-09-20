const arr =  ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
const updateArr = arr.map(val => {
    if(val == ' ')
    return 'empty string';
return val;
});
console.log(updateArr);