

document.addEventListener("DOMContentLoaded", function() {
var form = document.getElementById("addForm");
var search = document.getElementById('search');
var editPage = document.getElementById('editpage');
const updatePlayer = document.getElementById("updatePlayer");



form.addEventListener('submit',addPlayer);
search.addEventListener('click',searchPlayer);
editPage.addEventListener('click',editPlayer);
updatePlayer.addEventListener('click',updatePlayers);
inputSearch.addEventListener('input',searchDownPlayer);




function searchDownPlayer(){
    console.log("this is searchdown player");
    searchResults.innerHTML = "";
    axios.get('http://localhost:4000/')
    .then(response => {
     const allPlayers = response.data.allPlayers;
     const searchItem = document.getElementById('inputSearch').value;
     console.log("this is names:",allPlayers);
     console.log("this is searchItem:",searchItem);
      if (searchItem) {
     // Filter items based on the query
     const filteredPlayers = allPlayers.filter(player => player.name.toLowerCase().includes(searchItem.toLowerCase()));
     
     // Display the filtered items
     filteredPlayers.forEach(player => {
        //  const li = document.createElement("li");
        //  li.textContent = player.name;
    //     //  searchResults.appendChild(li);
    const listItem = document.createElement("input");
    listItem.style.border = "0px";
    listItem.style.cursor = "pointer";
    listItem.value = player.name;
    listItem.addEventListener("click", function () {
      inputSearch.value = player.name;
      searchResults.style.display = "none";
    });
    searchResults.appendChild(listItem);
  });

  if (filteredPlayers.length > 0) {
    searchResults.style.display = "flex";
  } else {
    searchResults.style.display = "none";
  }
} else {
    searchResults.style.display = "none";
}


document.addEventListener("click", function (event) {
if (event.target !== inputSearch && event.target !== searchResults) {
    searchResults.style.display = "none";
}
});

// Prevent clicks inside the dropdown list from closing it
searchResults.addEventListener("click", function (event) {
event.stopPropagation();  //won't trigger any event listeners
});
    });
}



function addPlayer(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var dob = document.getElementById('dob').value;
    var photo = document.getElementById('photo').value;
    var birthplace = document.getElementById('birthplace').value;
    var career = document.getElementById('career').value;
    var score = document.getElementById('score').value;
    var matches = document.getElementById('matches').value;
    var fifties = document.getElementById('fifties').value;
    var centuries = document.getElementById('centuries').value;
    var wicket = document.getElementById('wicket').value;
    var average = document.getElementById('average').value;
    document.getElementById('name').value = "";
     document.getElementById('dob').value = "";
     document.getElementById('photo').value = "";
     document.getElementById('birthplace').value = "";
     document.getElementById('career').value = "";
     document.getElementById('score').value = "";
     document.getElementById('matches').value = "";
     document.getElementById('fifties').value = "";
     document.getElementById('centuries').value = "";
     document.getElementById('wicket').value = "";
     document.getElementById('average').value = "";
    const obj = {
        name:name,
        dob:dob,
        photo:photo,
        birthplace:birthplace,
        career:career,
        score:score,
        matches:matches,
        fifties:fifties,
        centuries:centuries,
        wicket:wicket,
        average:average
     };
     axios.post('http://localhost:4000/',obj)
     .then(response => console.log(response))
     .catch(err => console.log(err));
}



function searchPlayer(param="e"){
    let search;
    if (typeof param === "string") {
     search = param;
     console.log("search Player:with param:",search);
    }else{
        search = document.getElementById('inputSearch').value;
        console.log("without param:",search);
    }
     
    axios.post('http://localhost:4000/search/',{search:search})
    .then(response => {
        const player = response.data.searchPlayer;
        console.log("search player is: ",player);
        const details = document.getElementById('details');
        details.style.display = "block";
        var name1 = document.getElementById('name1');
        name1.innerText = player.name;
        var dob1 = document.getElementById('dob1');
        dob1.innerText = player.dob;
        var birthPlace = document.getElementById('birthPlace');
        birthPlace.innerText = player.birthplace;
        const matches1 = document.getElementById('matches1');
        matches1.innerText = `Matches: ${player.matches}`;
        var score = document.getElementById('runs');
        score.innerText = `Runs: ${player.score}`;
        var career1 = document.getElementById('career1');
        career1.innerText = player.career;

        var wickets = document.getElementById('wicket1');
        wickets.innerText = `Wickets: ${player.wicket}`;

        

        var fifties1 = document.getElementById('fifties1');
        fifties1.innerText = `Fifties: ${player.fifties}`;

        var centuries1 = document.getElementById('centuries1');
        centuries1.innerText = `Centuries: ${player.centuries}`;

        var average1 = document.getElementById('average1');
        average1.innerText = `Average: ${player.average}`;
 
        const info = document.getElementById('info');
        info.innerText = "Personal Information:";       
        const img1 = document.getElementById('img1');
        img1.src = player.photo;
        img1.alt = player.name;
        const useId = document.getElementById('useId');
        useId.innerText = player.id;
        const editPage = document.getElementById('info');
        editPage.focus();
    })
    .catch(err => console.log(err));
}






function editPlayer(e)
{
e.preventDefault();
const playerId = document.getElementById('useId');
const id = playerId.innerText;
axios.post("http://localhost:4000/edit/",{id:id})
.then(response => {
    const player = response.data.player;
console.log("response is: ",player);
     document.getElementById('name').value = player.name;
     document.getElementById('dob').value = player.dob;
     document.getElementById('photo').value = player.photo;
     document.getElementById('birthplace').value = player.birthplace;
     document.getElementById('career').value = player.career;
     document.getElementById('score').value = player.score;
     document.getElementById('matches').value = player.matches;
     document.getElementById('fifties').value = player.fifties;
     document.getElementById('centuries').value = player.centuries;
     document.getElementById('wicket').value = player.wicket;
     document.getElementById('average').value = player.average;
     const nameFocus = document.getElementById('name');
     const addPlayer = document.getElementById("addPlayer");
     const updatePlayer = document.getElementById("updatePlayer");
     addPlayer.style.display = "none";
     updatePlayer.style.display = "block";
     nameFocus.focus();
})
.catch(err => console.log(err));
} 




function updatePlayers(e){
e.preventDefault();
var name = document.getElementById('name').value;
    var dob = document.getElementById('dob').value;
    var photo = document.getElementById('photo').value;
    var birthplace = document.getElementById('birthplace').value;
    var career = document.getElementById('career').value;
    var score = document.getElementById('score').value;
    var matches = document.getElementById('matches').value;
    var fifties = document.getElementById('fifties').value;
    var centuries = document.getElementById('centuries').value;
    var wicket = document.getElementById('wicket').value;
    var average = document.getElementById('average').value;
    document.getElementById('name').value = "";
     document.getElementById('dob').value = "";
     document.getElementById('photo').value = "";
     document.getElementById('birthplace').value = "";
     document.getElementById('career').value = "";
     document.getElementById('score').value = "";
     document.getElementById('matches').value = "";
     document.getElementById('fifties').value = "";
     document.getElementById('centuries').value = "";
     document.getElementById('wicket').value = "";
     document.getElementById('average').value = "";
     const playerId = document.getElementById('useId');
const id = playerId.innerText;
    const obj = {
        id:id,
        name:name,
        dob:dob,
        photo:photo,
        birthplace:birthplace,
        career:career,
        score:score,
        matches:matches,
        fifties:fifties,
        centuries:centuries,
        wicket:wicket,
        average:average
     };
     axios.put('http://localhost:4000/update',obj)
     .then(response => {
        console.log(response);
        const addPlayer = document.getElementById("addPlayer");
     const updatePlayer = document.getElementById("updatePlayer");
     addPlayer.style.display = "block";
     updatePlayer.style.display = "none";
     }).then(() =>{
        searchPlayer(name);
     })
     .catch(err => console.log(err));
}
});