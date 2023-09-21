const person = {
    name:"gengesh",
    age:29,
    details(){
        return "i am "+this.name+" my age is "+this.age;
    }
}
// console.log(person.details())
const print = ({name,age}) =>{
    console.log(name,age);
}
print(person);
const arr = ["i","am","good","person","in","the","world"];
const [val1,val2,val3,val4,val5,val6] = arr;
console.log(val1,val2,val3,val4,val5,val6);