
const button=document.querySelector("button")
button.addEventListener('click',displayresult)
function displayresult(){
    // console.log('clicked')
    const str=document.querySelector("input").value
    console.log(str)
    var i =0
    var count=0
   while(i < str.length-1){
    console.log(str.length-1)
    switch(str.charAt(i)){
    case '+':
        var myarray = str.split("+")
        var result=Number(myarray[0]) + Number(myarray[1])
        document.querySelector("#results").innerHTML="Ans:"+result
        console.log(result)
         count=1;
        break
        case '-':
            var myarray = str.split("-")
            var result=Number(myarray[0]) - Number(myarray[1])
            document.querySelector("#results").innerHTML="Ans:"+result
            console.log(result)
            count=1;
            break
            case '*':
                var myarray = str.split("*")
                var result=Number(myarray[0]) * Number(myarray[1])
                document.querySelector("#results").innerHTML="Ans:"+result
                console.log(result)
                count=1;
                break
                case '/':
                    var myarray = str.split("/")
                    var result=Number(myarray[0]) / Number(myarray[1])
                    document.querySelector("#results").innerHTML="Ans:"+result  
                    console.log(result)
                    count=1;
                    break
   }
   if(count==1)
   break
   i++
}
}