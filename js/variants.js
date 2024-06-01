import { PageName } from "./vicPage.js";
import { data } from '../data/data2.js'

const variantList = document.getElementById('variantList')
const detailsButton0 = document.getElementById('detailsButton0')

for (const i in data[PageName[0]].Variants){
    const option = document.createElement('option')
    option.textContent = data[PageName[0]].Variants[i].Name
    option.title = "This is for the Vehicle Details only"
    variantList.appendChild(option)
}

variantList.addEventListener("change", ()=>{
    updateDetails(PageName[0], 0, variantList.value)
})

myFunction(0)

detailsButton0.addEventListener('click', ()=>{
    if(detailsButton0.innerText == "Additional Details"){
        document.getElementById('bodytooltip').style.setProperty("display", "none")
        document.getElementById('modelDiv').style.setProperty("display", "none")
        document.getElementById('vehicleDetails0').style.setProperty("display", "flex")
        document.getElementById('viewModeText0').style.setProperty("display", "none")
        document.getElementById('testPens').style.setProperty("display", "none")
        document.getElementById('internal').style.setProperty("display", "none")
        detailsButton0.innerText = "Model View"
    } else {
        document.getElementById('modelDiv').style.removeProperty("display")
        document.getElementById('vehicleDetails0').style.setProperty("display", "none")
        document.getElementById('viewModeText0').style.removeProperty("display")
        document.getElementById('testPens').style.removeProperty("display")
        document.getElementById('internal').style.removeProperty("display")
        detailsButton0.innerText = "Additional Details"
    }
    
})

if (PageName.length > 1){

    const variantList2 = document.getElementById('variantList2')
    const detailsButton1 = document.getElementById('detailsButton1')

    for (const i in data[PageName[1]].Variants){
        const option = document.createElement('option')
        option.textContent = data[PageName[1]].Variants[i].Name
        option.title = "This is for the Vehicle Details only"
        variantList2.appendChild(option)
    }

    variantList2.addEventListener("change", ()=>{
        updateDetails(PageName[1], 1, variantList2.value)
    })

    myFunction(1)

    detailsButton1.addEventListener('click', ()=>{
        if(detailsButton1.innerText == "Additional Details"){
            document.getElementById('bodytooltip').style.setProperty("display", "none")
            document.getElementById('modelDiv2').style.setProperty("display", "none")
            document.getElementById('vehicleDetails1').style.setProperty("display", "flex")
            document.getElementById('viewModeText1').style.setProperty("display", "none")
            document.getElementById('testPens2').style.setProperty("display", "none")
            document.getElementById('internal2').style.setProperty("display", "none")
            detailsButton1.innerText = "Model View"
        } else {
            document.getElementById('modelDiv2').style.removeProperty("display")
            document.getElementById('vehicleDetails1').style.setProperty("display", "none")
            document.getElementById('viewModeText1').style.removeProperty("display")
            document.getElementById('testPens2').style.removeProperty("display")
            document.getElementById('internal2').style.removeProperty("display")
            detailsButton1.innerText = "Additional Details"
        }
        
    })
}

// Function to reset vehicle details to default
function myFunction(number) {
    var currentModel = PageName[number]
    var currentDetails = data[currentModel]
    //Used to reset Vehicle details between inputs
    //Used to change display test of elements with values
    var childDivs = document
        .getElementById(`vehicleDetails${number}`)
        .getElementsByTagName('p')

    for (let i = 0; i < childDivs.length; i++) {
        //console.log(childDivs[i].textContent)
        childDivs[i].textContent = ''
    }
    
    for (let i=0; i<document.getElementById(`vehicleDetails${number}`).querySelectorAll("p:not([id])").length;){
        document.getElementById(`vehicleDetails${number}`).querySelectorAll("P:not([id])")[i].remove()
    }

    document.getElementById(`Name${number}`).textContent =
        currentDetails.Variants[0].Name
    document.getElementById(`Type${number}`).textContent =
        currentDetails.Variants[0].Type
    document.getElementById(`Ticket_Value${number}`).textContent =
        'Ticket Value: ' + currentDetails.Variants[0].Ticket_Value
    document.getElementById(`Respawn${number}`).textContent =
        'Respawn Time: ' + currentDetails.Variants[0].Respawn
    document.getElementById(`Construction_Resources${number}`).textContent =
        'Construction Resources: ' + currentDetails.Variants[0].Construction_Resources
    document.getElementById(`Ammo_Resources${number}`).textContent =
        'Ammo Resources: ' + currentDetails.Variants[0].Ammo_Resources
    document.getElementById(`Total_Resources${number}`).textContent =
        'Total Resources: ' + currentDetails.Variants[0].Total_Resources
    document.getElementById(`Useful_Seat_Count${number}`).textContent =
        'Crewman Seat Count: ' + currentDetails.Variants[0].Crew_Seat_count
    document.getElementById(`Other_Seat_Count${number}`).textContent =
        'Other Seat Count: ' + currentDetails.Variants[0].Other_Seat_Count
    document.getElementById(`Main_HP${number}`).textContent =
        'Main HP: ' + currentDetails.Variants[0].Main_HP
    if (currentDetails.Variants[0].Turret_HP != null) {
        document.getElementById(`Turret_HP${number}`).textContent =
            'Turret HP: ' + currentDetails.Variants[0].Turret_HP
    }
    if (currentDetails.Variants[0].Type.includes("UAV")){
    } else if (currentDetails.Opt_Type == "Heli"){
        document.getElementById(`Engine_HP${number}`).textContent = "Engine HP: 1200"
    } else {
        document.getElementById(`Engine_HP${number}`).textContent = "Engine HP: 600"
    }
    
    document.getElementById(`HEAT_Dmg${number}`).textContent =
        'HEAT Damage Modifier: ' + currentDetails.Variants[0].HEAT_Dmg
    document.getElementById(`Explosive_Dmg${number}`).textContent =
        'Explosive Damage Modifier: ' + currentDetails.Variants[0].Explosive_Dmg
    document.getElementById(`Kinetic_Dmg${number}`).textContent =
        'Kinetic Damage Modifier: ' + currentDetails.Variants[0].Kinetic_Dmg
    if (currentDetails.Variants[0].Fragmentation_Dmg){
        document.getElementById(`Fragmentation_Dmg${number}`).textContent =
            'Frag Damage Modifier: ' + currentDetails.Variants[0].Fragmentation_Dmg   
    }
    document.getElementById(`HAT_Dmg${number}`).textContent =
        'HAT Damage Modifier: ' + currentDetails.Variants[0].HAT_Dmg
    document.getElementById(`Amphibious${number}`).textContent =
        'Amphibious: ' + currentDetails.Variants[0].Amphibious
    for (let i = 0; i < currentDetails.Variants[0].HullDown.length; i++) {
        const option = document.createElement('p')
        option.textContent = currentDetails.Variants[0].HullDown[i]
        document.getElementById(`HullDown${number}`).appendChild(option)
    }
    for (let i = 0; i < currentDetails.Variants[0].Arm.length; i++) {
        const option = document.createElement('p')
        option.textContent = currentDetails.Variants[0].Arm[i]
        document.getElementById(`Arm${number}`).appendChild(option)
    }
    for (let i = 0; i < currentDetails.Variants[0].Other.length; i++) {
        const option = document.createElement('p')
        if (currentDetails.Variants[0].Other[i] == null) {
            option.textContent = 'None'
        } else {
            option.textContent = currentDetails.Variants[0].Other[i]
        }
        document.getElementById(`Other${number}`).appendChild(option)
    }
}

function updateDetails(name, number, varname){
    const varName = varname
    var currentModel = name
    var currentDetails = data[currentModel]
    for (let i=0; i<document.getElementById(`vehicleDetails${number}`).querySelectorAll("p:not([id])").length;){
            document.getElementById(`vehicleDetails${number}`).querySelectorAll("p:not([id])")[i].remove()
    }
    myFunction(number)
    
    for (let i = 0; i < currentDetails.Variants.length; i++) {
        if (currentDetails.Variants[i].Name == varName) {
            for (var item in currentDetails.Variants[i]) {
                switch (item) {
                    case 'Name':
                        document.getElementById(`Name${number}`).textContent =
                            currentDetails.Variants[i].Name
                        break
                    case 'Type':
                        document.getElementById(`Type${number}`).textContent =
                            currentDetails.Variants[i].Type
                        break
                    case 'Ticket_Value':
                        document.getElementById(`Ticket_Value${number}`).textContent =
                            'Ticket Value: ' +
                            currentDetails.Variants[i].Ticket_Value
                        break
                    case 'Respawn':
                        document.getElementById(`Respawn${number}`).textContent =
                            'Respawn Time: ' + currentDetails.Variants[i].Respawn
                        break
                    case 'Construction_Resources':
                        document.getElementById(`Construction_Resources${number}`).textContent =
                            'Construction Resources: ' + currentDetails.Variants[i].Construction_Resources
                        break
                    case 'Ammo_Resources':
                        document.getElementById(`Ammo_Resources${number}`).textContent =
                            'Ammo Resources: ' +
                            currentDetails.Variants[i].Ammo_Resources
                        break
                    case 'Total_Resources':
                        document.getElementById(`Total_Resources${number}`).textContent =
                            'Total Resources: ' +
                            currentDetails.Variants[i].Total_Resources
                        break
                    case 'Crew_Seat_count':
                        document.getElementById(
                            `Useful_Seat_Count${number}`
                        ).textContent =
                            'Crewman Seat Count: ' +
                            currentDetails.Variants[i].Crew_Seat_count
                        break
                    case 'Other_Seat_Count':
                        document.getElementById(
                            `Other_Seat_Count${number}`
                        ).textContent =
                            'Other Seat Count: ' +
                            currentDetails.Variants[i].Other_Seat_Count
                        break
                    case 'Main_HP':
                        document.getElementById(`Main_HP${number}`).textContent =
                            'Main HP: ' + currentDetails.Variants[i].Main_HP
                        break
                    case 'Turret_HP':
                        if (currentDetails.Variants[i].Turret_HP != null) {
                            document.getElementById(`Turret_HP${number}`).textContent =
                                'Turret HP: ' +
                                currentDetails.Variants[i].Turret_HP
                        } else { document.getElementById(`Turret_HP${number}`).textContent = ''}
                        break
                    case 'HEAT_Dmg':
                        document.getElementById(`HEAT_Dmg${number}`).textContent =
                            'HEAT Damage Modifier: ' +
                            currentDetails.Variants[i].HEAT_Dmg
                        break
                    case 'Explosive_Dmg':
                        document.getElementById(`Explosive_Dmg${number}`).textContent =
                            'Explosive Damage Modifier: ' +
                            currentDetails.Variants[i].Explosive_Dmg
                        break
                    case 'Kinetic_Dmg':
                        document.getElementById(`Kinetic_Dmg${number}`).textContent =
                            'Kinetic Damage Modifier: ' +
                            currentDetails.Variants[i].Kinetic_Dmg
                        break
                    case 'Fragmentation_Dmg':
                            document.getElementById(`Fragmentation_Dmg${number}`).textContent =
                                'Frag Damage Modifier: ' + currentDetails.Variants[i].Fragmentation_Dmg   
                    case 'HAT_Dmg':
                        document.getElementById(`HAT_Dmg${number}`).textContent =
                            'HAT Damage Modifier: ' +
                            currentDetails.Variants[i].HAT_Dmg
                        break
                    case 'Amphibious':
                        document.getElementById(`Amphibious${number}`).textContent =
                            'Amphibious: ' +
                            currentDetails.Variants[i].Amphibious
                        break
                    case 'HullDown':
                        var childDivs = document
                            .getElementById(`HullDown${number}`)
                            .getElementsByTagName('p')
                        for (let y = 0; y < childDivs.length; y++) {
                            childDivs[y].textContent = ''
                        }
                        for (
                            let z = 0;
                            z < currentDetails.Variants[i].HullDown.length;
                            z++
                        ) {
                            const option = document.createElement('p')
                            option.textContent =
                                currentDetails.Variants[i].HullDown[z]
                            document
                                .getElementById(`HullDown${number}`)
                                .appendChild(option)
                        }
                        break
                    case 'Arm':
                        var childDivs = document
                            .getElementById(`Arm${number}`)
                            .getElementsByTagName('p')
                        for (let y = 0; y < childDivs.length; y++) {
                            childDivs[y].textContent = ''
                        }
                        for (
                            let z = 0;
                            z < currentDetails.Variants[i].Arm.length;
                            z++
                        ) {
                            const option = document.createElement('p')
                            option.textContent =
                                currentDetails.Variants[i].Arm[z]
                            document.getElementById(`Arm${number}`).appendChild(option)
                        }
                        break
                    case 'Other':
                        var childDivs = document
                            .getElementById(`Other${number}`)
                            .getElementsByTagName('p')
                        for (let y = 0; y < childDivs.length; y++) {
                            childDivs[y].textContent = ''
                        }
                        for (
                            let z = 0;
                            z < currentDetails.Variants[i].Other.length;
                            z++
                        ) {
                            const option = document.createElement('p')
                            if (currentDetails.Variants[i].Other[z] == null) {
                                option.textContent = 'None'
                            } else {
                                option.textContent =
                                    currentDetails.Variants[i].Other[z]
                            }
                            document.getElementById(`Other${number}`).appendChild(option)
                        }
                        break
                }
            }
        }
    }
}
