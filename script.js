//user enters website finds a list of the names, dates, times, locations and descriptions of all the parties that are happening
//next to each party is a delete button that the user clicks to delete the party. party is then removed from the list
//also a form that allows the user to enter info about a new party they want to schedule.
//user fills out the form. 
let partyList = document.querySelector('tbody');
let submitParty = document.getElementById('submitParty');
let removeParty = document.getElementById('removePartyFromTable');
let partyName1 = document.getElementById('partyName');
let partyDescription = document.getElementById('partyDescription');
let partyDate = document.getElementById('partyDate');
let partyLocation = document.getElementById('partyLocation');

let state = {
    name: ['Tyler Sloan'],
    description: ['Zeus birthday Party'],
    date:['06/03/2024 6:00 PM'],
    location:['Royal Oak, MI'],
};
let render = () =>{
    //1 through 4 refers to the location in the table. 1 being the first item in the column and 4 being the last. Added a break so that it will push the next row down a 
    partyList.innerHTML="";

    for(let i=0; i < state.name.length; i++){
        let newPartyRow = document.createElement('tr');
        let partyListItem1 = document.createElement('td');
        let partyListItem2 = document.createElement('td');
        let partyListItem3 = document.createElement('td');
        let partyListItem4 = document.createElement('td');
        let removeParty1 = document.createElement('button');
    
        partyListItem1.textContent = state.name[i];
        partyListItem2.textContent = state.description[i];
        partyListItem3.textContent = state.date[i];
        partyListItem4.textContent = state.location[i];
        removeParty1.innerText = 'Remove Party';
    
        removeParty1.addEventListener('click', (event) =>{
            event.preventDefault();
            handleRemoveParty(i);
        })

        partyList.appendChild(newPartyRow);
        newPartyRow.appendChild(partyListItem1);
        newPartyRow.appendChild(partyListItem2);
        newPartyRow.appendChild(partyListItem3);
        newPartyRow.appendChild(partyListItem4);
        newPartyRow.appendChild(removeParty1);
    
    }}

//creating the code that takes the current form input values and pushes them into the blank array when the user clicks submit
submitParty.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (partyName1.value !== ''){
        state.name.push(partyName1.value);
        state.description.push(partyDescription.value);
        state.date.push(partyDate.value);
        state.location.push(partyLocation.value);
        console.log(state);
    } else {
        console.log('Name field cannot be empty');
    }
    render();
});
console.log(state);
//Need to finish this button to remove but not sure how I am going to make each button correspond to the certain table row.
let handleRemoveParty = (id) => {
    state.name.splice(id, 1);
    state.description.splice(id, 1);
    state.date.splice(id, 1);
    state.location.splice(id, 1);
    render();
}


//starting to get the information from the API to add to the website
const addPartyFromAPI = async () => {
    try {
        const events = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events')
        const jsEvents = await events.json();
        console.log(jsEvents);
        // !!!!! Commenting this section out because the API has about 1400 parties !!!!!!!!!
        // for(let i=0;  i < jsEvents.data.length; i++){
        //     let party = jsEvents.data[i];
        //     state.name.push(party.name);
        //     state.description.push(party.description);
        //     state.date.push(party.date);
        //     state.location.push(party.location);
        // } 
        render();
        }
    catch(e) {
        console.error('Failed to Retrieve Party Info');
        console.error(e);

        return false;
    }
}

addPartyFromAPI();