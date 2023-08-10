const container = document.querySelector('.container')
const btns = document.querySelectorAll('.btn')

const imglist = ["img1","img2","img3","img4","img5"]
let index=0;
btns.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log('clicked')
       if(button.classList.contains('btn-left')){
       index--;
       if(index<0){
        index = imglist.length-1;
       }
       container.style.background = `url("image/${imglist[index]}.jpg") center/cover fixed no-repeat`
       }
       else{
        index++;
        if(index===imglist.length){
         index = 0;
        }
        container.style.background = `url("image/${imglist[index]}.jpg") center/cover fixed no-repeat`
       }
    })
})