// console.log('person1: shows ticket');
// console.log('person2: shows ticket');

// const promiseWifeBringingTickets = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve('ticket');
//     },3000)
// });

// promiseWifeBringingTickets.then((t) => {
//     console.log(`person3: shows ${t}`);
// });

// const getPopcorn = promiseWifeBringingTickets.then((t) => {
//     console.log('wife: i have the tickets')
//     console.log('husband: we should go in');
//     console.log('wife: no i am hungry');
//     return new Promise((resolve,reject) => resolve(`${t} popcorn`));
// });

// const getButter = getPopcorn.then((t) => {
//     console.log('husband: i got some popcorn');
//     console.log('wife: i need butter on my popcorn');
//     return new Promise((resolve,reject) => resolve(`${t} butter`));
// });
// getButter.then((t)=> console.log(t));
// // getPopcorn.then((t) => console.log(t));
// console.log('person4: shows ticket');
// console.log('person5: shows ticket');

console.log('person1: shows ticket');
console.log('person2: shows ticket');
const preMovie = async() => {

    const promiseWifeBringingTickets = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('ticket');
        },3000)
    });

    const getPopcorn = new Promise((resolve,reject) => resolve('popcorn'));
    const addButter = new Promise((resolve,reject) => resolve('butter'));
    const getColdDrinks = new Promise((resolve,reject) => resolve('cold drinks'));
           let ticket = await promiseWifeBringingTickets;

        let [popcorn,addon,drink] = await Promise.all([getPopcorn,addButter,getColdDrinks]);
        console.log(`${popcorn},${addon},${drink}`);
    //         console.log(`wife: i have the ${ticket}`);
    //         console.log('husband: we should go in');
    //         console.log('wife: no i am hungry');
          
    //         let popcorn = await getPopcorn;

    //         console.log(`wife: i got some ${popcorn}`);
    //         console.log('husband: we should go in');
    // console.log('wife: i need butter on my popcorn');

    //         let butter = await addButter;

    //         console.log(`husband: i got some ${butter} on popcorn`);
    //         console.log('wife i want colddrinks also');

    //         let drinks = await getColdDrinks;
            
    //         console.log(`husband: i got some ${drinks} `);
    //         console.log('wife:thank you,lets go for movie');

    return ticket;
}



preMovie().then((m) => console.log(`person3: shows ${m}`));

console.log('person4: shows ticket');
console.log('person5: shows ticket');