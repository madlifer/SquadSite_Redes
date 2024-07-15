if (window.location.href.includes("squad-armor.com") || window.location.href.includes("www.squad-armor.com") || window.location.href.includes("localhost")){} else{
    throw new Error("This site is STOLEN");
}

var URL = window.location.hash;
//console.log(window.location.hash)
export var PageName;
PageName = URL.substring(URL.indexOf('#') + 1);
//console.log(PageName.split("#"))
if (PageName.split('#') == '') {
    window.location.href = '/';
}
PageName = PageName.split('#');
if (PageName.length > 2) {
    window.location.href = `/vicPage.html#${PageName[0]}#${PageName[1]}`;
};
document
    .getElementById('divvy')
    .style.setProperty(
        'margin-top',
        (document.getElementById('nav').clientHeight + 10).toString() + 'px'
    );
addLoader("divvy", 0);
addVicDetails("divvy", 0)
document
    .getElementById('slidecontainer')
    .style.setProperty(
        'max-width',
        document.getElementById('divvy').clientWidth.toString() + 'px'
    );
    document.getElementById('viewer').style.setProperty('height', ((window.innerHeight - document.getElementById('slidecontainer').clientHeight - document.getElementById('nav').clientHeight)-100) + "px") // Set height to modelDiv height - slidecontiner height
window.addEventListener('resize', () => {
    document
        .getElementById('divvy')
        .style.setProperty(
            'margin-top',
            (document.getElementById('nav').clientHeight + 10).toString() + 'px'
        );
    document
        .getElementById('slidecontainer')
        .style.setProperty(
            'max-width',
            document.getElementById('divvy').clientWidth.toString() + 'px'
        );
    document
        .getElementById('mySidebar')
        .style.setProperty(
            'top',
            window.scrollY * -1 +
                (document.getElementById('nav').clientHeight + 10) +
                'px'
        );
    document.getElementById('viewer').style.setProperty('height', ((window.innerHeight - document.getElementById('slidecontainer').clientHeight - document.getElementById('nav').clientHeight)-100) + "px") // Set height to modelDiv height - slidecontiner height
});

if (PageName.length > 1) {
    const option = document.createElement('div');
    option.id = 'divvy2';
    option.classList.add('containingDiv'); // HAVE THIS CHANGE FROM BLOCK TO NONE
    option.innerHTML = `<div class="w3-sidebar w3-bar-block w3-black" style="display: block; height: fit-content; max-height: 60%;  border: 2px solid #0ef; border-radius: 10px; text-align: center;" id="mySidebar2">
    <button id="sideButton2" class="w3-bar-item w3-button w3-large">Close &times;</button>
    <!--Armour values and mode-->
    <div id="armour-panel2" style="display: block">
        <p>Variants:</p>
        <select id="variantList2" style="width: 168px;">
        </select>
    <p id="viewModeText1">View Mode:</p>
    <button id="internal2">
        Normal
    </button>

    <div
        id="testPens2"
    ></div>
        </div>
    </div>
    <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
    <button id="sidebarOpen2" class="w3-button w3-white w3-xxlarge">&#9776;</button>
    <div>
                    <button id="front2">Front</button>
                    <button id="back2">Back</button>
                    <button id="left2">Left</button>
                    <button id="right2">Right</button>
                </div>
    <button id="detailsButton1">Additional Details</button>
    </div>
    <div id="modelDiv2" class="modelDiv">
    
    <div id="viewer2"></div>
<div class="slidecontainer" id="slidecontainer2">
        <div id="damageStats2" class="hidden" style="display: flex; flex-direction: column;">
                        <p>Damage</p>
                    </div>
        <select id="weaponSelect2" style="width: 160px;">
        <option selected="selected" hidden>Weapon Type</option>
        <optgroup
            id="Inf_AT2"
            label="Infantry AT"
        ><!--TO EACH OPTION ADD (title="American LAT shot") TO EXPLAIN -->
        </optgroup>
        <optgroup
            id="Other_AT2"
            label="Other AT"
        ></optgroup>
    </select>
    
    <input disabled type="range" min="0" max="3000" value="0"
        step="50"
        class="slider"
        id="mySlider2"
    />
    <div style="margin-right: 20px">
        <p>Target Distance:</p>
        <p id="distance2">-m</p>
        <p>Max Penetration:</p>
        <p id="maxPen2">-mm</p>
    </div>
    <div>
        <p>Impact & Expl Damage:</p>
        <p id="damage2">-</p>
        <p>Damage Type:</p>
        <p id="damageType2">-</p>
    </div>
</div>
</div>`;
    document.getElementById('main').appendChild(option);

    const sideB2 = document.getElementById('sideButton2');

    sideB2.addEventListener('click', () => {
        openCloseBar();
    });

    const sidebarOpen2 = document.getElementById('sidebarOpen2');

    sidebarOpen2.addEventListener('click', () => {
        openCloseBar();
    });

    document
        .getElementById('divvy2')
        .style.setProperty(
            'margin-top',
            (document.getElementById('nav').clientHeight + 10).toString() + 'px'
        );
    
    document
        .getElementById('mySidebar2')
        .style.setProperty(
            'top',
            document.getElementById('divvy2').getBoundingClientRect().y + 'px'
        );
        document.getElementById('viewer2').style.setProperty('height', ((window.innerHeight - document.getElementById('slidecontainer2').clientHeight - document.getElementById('nav').clientHeight)-100) + "px") // Set height to modelDiv height - slidecontiner height
        addLoader("divvy2", 1)
        addVicDetails("divvy2", 1)
    window.addEventListener('resize', () => {
        document
            .getElementById('divvy2')
            .style.setProperty(
                'margin-top',
                (document.getElementById('nav').clientHeight + 10).toString() +
                    'px'
            );
        document
            .getElementById('slidecontainer2')
            .style.setProperty(
                'max-width',
                document.getElementById('divvy').clientWidth.toString() + 'px'
            );
        document
            .getElementById('mySidebar2')
            .style.setProperty(
                'top',
                document.getElementById('divvy2').getBoundingClientRect().y +
                    'px'
            );
            document.getElementById('viewer2').style.setProperty('height', ((window.innerHeight - document.getElementById('slidecontainer2').clientHeight - document.getElementById('nav').clientHeight)-100) + "px") // Set height to modelDiv height - slidecontiner height
    });
    window.addEventListener('scroll', () => {
        document
            .getElementById('mySidebar2')
            .style.setProperty(
                'top',
                document.getElementById('divvy2').getBoundingClientRect().y +
                    'px'
            );
    });
}

function openCloseBar() {
    const side2 = document.getElementById('mySidebar2');

    if (side2.style.display != 'none') {
        side2.style.display = 'none';
    } else {
        side2.style.display = 'block';
    }
}

function addLoader(objectId, number){
	const addTo = document.getElementById(objectId)
	const option = document.createElement('div');
    option.id = `preLoader${number}`
	option.style.display = "none";
	option.classList.add('loader')
	option.innerHTML = `<svg class="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
	<defs>
			<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stop-color="#5ebd3e" />
				<stop offset="33%" stop-color="#ffb900" />
				<stop offset="67%" stop-color="#f78200" />
				<stop offset="100%" stop-color="#e23838" />
			</linearGradient>
			<linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
				<stop offset="0%" stop-color="#e23838" />
				<stop offset="33%" stop-color="#973999" />
				<stop offset="67%" stop-color="#009cdf" />
				<stop offset="100%" stop-color="#5ebd3e" />
			</linearGradient>
		</defs>
		<g fill="none" stroke-linecap="round" stroke-width="16">
			<g class="ip__track" stroke="#ddd">
				<path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
			<g stroke-dasharray="180 656">
				<path class="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path class="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
		</g>
	</svg>`;
	addTo.appendChild(option);
}
//TAKE VEHICLEDETAILS OUT OF DETAILSPAGE(NOT NEEDED)
function addVicDetails(objectId, number){
    const addTo = document.getElementById(objectId)
	const option = document.createElement('div');
    option.id = `vehicleDetails${number}`
	option.style.display = "none";
    option.style.borderColor = "white";
	option.classList.add('roundBorder')
    option.classList.add('vehicleDetails')
	option.innerHTML = `
    <!--Name-->
    <p id="Name${number}" class="roundBorder"></p>
    <!--Type-->
    <p id="Type${number}" class="roundBorder"></p>
    <div class="container1">
        <!--Left Side-->
        <div class="container2">
            <p id="Ticket_Value${number}" class="roundBorder"></p>
            <p id="Respawn${number}" class="roundBorder"></p>
        </div>

        <!--Right Side-->
        <div class="container2">
            <p id="Amphibious${number}" class="roundBorder"></p>
        </div>
    </div>
    <div class="container1">
        <!--Left Side-->
        <div class="container2">
            <ul class="roundBorder" style="color: white">
                <p id="Main_HP${number}"></p>
                <p id="Turret_HP${number}"></p>
                <p id="Engine_HP${number}"></p>
            </ul>
        </div>
        <!--Right Side-->
        <div class="container2">
            <ul class="roundBorder" style="color: white">
                <p id="HEAT_Dmg${number}"></p>
                <p id="Explosive_Dmg${number}"></p>
                <p id="Kinetic_Dmg${number}"></p>
                <p id="HAT_Dmg${number}"></p>
                <p id="Fragmentation_Dmg${number}"></p>
            </ul>
        </div>
    </div>
    <div class="container1">
        <!--Left Side-->
        <div class="container2">
            <ul class="roundBorder" style="color: white">
                <p id="Construction_Resources${number}"></p>
                <p id="Ammo_Resources${number}"></p>
                <p id="Total_Resources${number}"></p>
            </ul>
        </div>
        <!--Right Side-->
        <div class="container2">
            <ul class="roundBorder" style="color: white">
                <p id="Useful_Seat_Count${number}"></p>
                <p id="Other_Seat_Count${number}"></p>
            </ul>
        </div>
    </div>
    <div>
        <ul
            id="HullDown${number}"
            class="roundBorder"
            style="color: white; font-size: 20px"
        >
            <span>Hulldown:</span>
        </ul>
    </div>
    <div>
        <ul
            id="Arm${number}"
            class="roundBorder"
            style="color: white; font-size: 20px"
        >
            <span>Armament:</span>
        </ul>
    </div>
    <div>
        <ul
            id="Other${number}"
            class="roundBorder"
            style="color: white; font-size: 20px"
        >
            <span>Other Comments:</span>
        </ul>
    </div>`;
    addTo.appendChild(option);
}
