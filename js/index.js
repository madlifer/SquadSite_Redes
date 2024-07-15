if (window.location.href.includes("squad-armor.com") || window.location.href.includes("www.squad-armor.com") || window.location.href.includes("localhost")){} else{
    throw new Error("This site is STOLEN");
}

import { data } from '../data/data2.js';
const vehicleSelector = document.getElementById('vehicleSelector');
document
    .getElementById('vehicleSelector')
    .style.setProperty(
        'margin-top',
        (document.getElementById('nav').clientHeight + 10).toString() + 'px'
    );
window.addEventListener('resize', () => {
    document
        .getElementById('vehicleSelector')
        .style.setProperty(
            'margin-top',
            (document.getElementById('nav').clientHeight + 10).toString() + 'px'
        );
});

const searchSort = document.getElementById('searchSort');
searchSort.addEventListener('input', () => {
    fullDisplay();
    for (let i = 0; i < vehicleSelector.children.length; i++) {
        if (vehicleSelector.children[i].style.display == 'block') {
            for (
                let a = 0;
                a < vehicleSelector.children[i].children.length;
                a++
            ) {
                if (
                    vehicleSelector.children[i].children[
                        a
                    ].children[0].innerText
                        .toLowerCase().replace(/[- ]/g, '')
                        .includes(searchSort.value.toLowerCase()) || vehicleSelector.children[i].children[
                            a
                        ].children[0].innerText
                            .toLowerCase().replace(/[- ]/g, '')
                            .includes(searchSort.value.toLowerCase().replace(/[- ]/g, ''))
                ) {
                    vehicleSelector.children[i].style.setProperty(
                        'display',
                        'block'
                    );
                } else {
                    vehicleSelector.children[i].style.setProperty(
                        'display',
                        'none'
                    );
                }
            }
        }
    }
});

const factionType = document.getElementById('factionType');
factionType.addEventListener('mousedown', (event) => {
    if (
        event.target.text == 'BLUFOR' ||
        event.target.text == 'REDFOR' ||
        event.target.text == 'Independent'
    ) {
        document.getElementById('BLUFOR').style.setProperty('display', 'none');
        document.getElementById('REDFOR').style.setProperty('display', 'none');
        document
            .getElementById('Independent')
            .style.setProperty('display', 'none');
        document
            .getElementById(event.target.text)
            .style.setProperty('display', 'flex');
    } else {
        if (event.target.text != undefined) {
            fullDisplay();
            searchSort.value = '';
            for (let i = 0; i < vehicleSelector.children.length; i++) {
                for (
                    let a = 0;
                    a < vehicleSelector.children[i].children.length;
                    a++
                ) {
                    var faccies =
                        vehicleSelector.children[i].children[
                            a
                        ].children[3].innerText.split(': ')[1];
                    if (
                        faccies.includes(
                            event.target.text || event.target.text + ','
                        )
                    ) {
                    } else {
                        vehicleSelector.children[i].style.setProperty(
                            'display',
                            'none'
                        );
                    } //TYPE OF VIC FOR TYPE SEARCHING
                }
            }
        }
    }
    document
        .getElementById('vehicleSelector')
        .style.setProperty(
            'margin-top',
            document.getElementById('nav').clientHeight.toString() + 'px'
        );
});
const type = document.getElementById('type');
type.addEventListener('mousedown', (event) => {
    if (event.target.id != 'searchSort') {
        searchSort.value = '';
    }
    if (event.target.text == 'Factions') {
        factionType.style.setProperty('display', 'flex');
    } else if (event.target.text != undefined) {
        factionType.style.setProperty('display', 'none');
        document.getElementById('BLUFOR').style.setProperty('display', 'none');
        document.getElementById('REDFOR').style.setProperty('display', 'none');
        document
            .getElementById('Independent')
            .style.setProperty('display', 'none');
    }

    //FOR MOVING THE SCROLL TO ALLOW VIEWING OF ALL OF PAGE
    document
        .getElementById('vehicleSelector')
        .style.setProperty(
            'margin-top',
            document.getElementById('nav').clientHeight.toString() + 'px'
        );

    if (event.target.text == 'Aerial') {
        fullDisplay();
        for (let i = 0; i < vehicleSelector.children.length; i++) {
            //vehicleSelector.children[i].style.setProperty("display", "block");
            for (
                let a = 0;
                a < vehicleSelector.children[i].children.length;
                a++
            ) {
                if (
                    vehicleSelector.children[i].children[
                        a
                    ].children[2].innerText.split(' ')[1] != 'Heli'
                ) {
                    vehicleSelector.children[i].style.setProperty(
                        'display',
                        'none'
                    );
                } //TYPE OF VIC FOR TYPE SEARCHING
            }
        }
    } else if (
        event.target.text != 'Factions' &&
        event.target.text != 'All' &&
        event.target.text != undefined
    ) {
        fullDisplay();
        for (let i = 0; i < vehicleSelector.children.length; i++) {
            //vehicleSelector.children[i].style.setProperty("display", "block");
            for (
                let a = 0;
                a < vehicleSelector.children[i].children.length;
                a++
            ) {
                if (
                    vehicleSelector.children[i].children[
                        a
                    ].children[2].innerText.split(' ')[1] != event.target.text
                ) {
                    vehicleSelector.children[i].style.setProperty(
                        'display',
                        'none'
                    );
                } //TYPE OF VIC FOR TYPE SEARCHING
            }
        }
    } else if (event.target.text == 'All') {
        fullDisplay();
    }
});

for (let item in data) {
    var factions = '';
    for (let i = 0; i < data[item].Opt_Faction.length; i++) {
        if (factions == '') {
        } else {
            factions = factions + ', ';
        }
        factions = factions + data[item].Opt_Faction[i];
    }
    populateVehicles(item, factions);
}

function populateVehicles(item, factions) {
    const option = document.createElement('a');
    option.href = 'vicPage#' + item;
    option.style.setProperty('display', 'block'); // HAVE THIS CHANGE FROM BLOCK TO NONE
    option.innerHTML = `<div class="item">
                    <h3>${data[item].Opt_Name}</h3>
                    <img src="/imgs/${item}.webp" alt="${item}">
                    <p>Type: ${data[item].Opt_Type}</p>
                    <p>Faction: ${factions}</p>
                    <input name="compare" type="checkbox" value="${item}"> Compare</input>
                </div>`;
    document.getElementById('vehicleSelector').appendChild(option);
}

function fullDisplay() {
    for (let i = 0; i < vehicleSelector.children.length; i++) {
        vehicleSelector.children[i].style.setProperty('display', 'block');
    }
}

document.addEventListener('click', () => {
    const compare = document.querySelectorAll('input[name="compare"]:checked');
    var comparisonString = '';
    if (compare.length == 2) {
        for (let i = 0; i < compare.length; i++) {
            console.log(compare[i].attributes.value.nodeValue);
            comparisonString =
                comparisonString + '#' + compare[i].attributes.value.nodeValue;
        }
        window.location.href = 'vicPage' + comparisonString;
    }
});

//CHANGE METHOD TO DISPLAY ITEMS TO DISPLAY IT ONCE, THEN HIDE THEM DEPENDING ON FACTION/TYPE ETC

// USE https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
// TO MAYBE SAVE WHERE USER WAS ON A PAGETO ALLOW NAVIGATE BACK TO IT?
