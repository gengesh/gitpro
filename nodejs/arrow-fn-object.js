const sum = (a,b) => {
    return a+b;
}
console.log(sum(45,78));
const student = {
    name:"gengesh",
    age:"29",
    details(){
        console.log("hi, i am " +this.name)
    }
};
student.details();