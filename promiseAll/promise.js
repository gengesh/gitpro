const posts = [
    {name2:"ramesh"},
    {name2:"rajesh"},
    {name2:"sownthar"}]
function updateLastUserActivityTime() {
return new Promise((resolve,reject) =>{
setTimeout( () => {
   let time = new Date();
//    console.log(time)
 resolve(time);
},1000)
})
}
function createPost(name1) {
    return new Promise((resolve,reject) =>{
        setTimeout( () => {
            // console.log(name1)
         posts.push(name1);
         resolve(name1);
        },1000)
        })
        }
        function deletePost() {
            return new Promise((resolve,reject) =>{
                setTimeout( () => {
                if(posts.length>=1)
                 resolve(posts.pop());
                else
                reject("ERROR");
                },1000)
                })
                }
                function displayAll(){
                    return new Promise((resolve,reject) =>{
                        
                        setTimeout( () =>{
                      for(let i=0;i<posts.length;i++){
                        console.log(posts[i]);
                       }
                       resolve();
                    },1000)

                    })
                }
               Promise.all([createPost({name2:"suresh"}),updateLastUserActivityTime()])
               .then((nam) => console.log(nam)).catch((err) => console.log(err))
               .then(deletePost).then((delPost)=> console.log(delPost))
               .then(displayAll);