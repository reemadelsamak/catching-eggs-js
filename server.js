
////////////////////////////////////////////////////////////////
// fetching date
let playerLastDate;
let lastLoginLabel = document.querySelector('#lastLogin');
let getPlayerName = location.search.substring(1).split('=')[1].replace('+', ' ');

let playerNameObject = {
    name: getPlayerName
}

let postPlayerName = async function (playerNameObject) {
    try {
        let response = await fetch('https://node-monge-iti-project.herokuapp.com/games', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(playerNameObject)
        });
        return await response.json();
    }
    catch (e) {
        console.log(e);
    }
}

window.addEventListener(`DOMContentLoaded`, async function () {

    let userLastLogindate = await getUserLastLoginDate(getPlayerName);
    playerLastDate = new Date(userLastLogindate.date);

    lastLoginLabel.innerHTML=`${playerLastDate.toLocaleString()}`;
});

let getUserLastLoginDate = async function (getPlayerName) {
    try {
        let response = await fetch(`https://node-monge-iti-project.herokuapp.com/games/${getPlayerName}`);
        let userData = await response.json();
        return userData;
    }
    catch (e) {
        console.log("-");
    }
}
