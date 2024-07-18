import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { weaponData } from '../data/weaponData'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { PageName } from './vicPage';

const modelDiv = document.querySelector('#viewer')
const scene = new THREE.Scene()
const loader = new GLTFLoader()

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig({ type: 'js' });
dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
dracoLoader.preload();
loader.setDRACOLoader( dracoLoader );

var camera = new THREE.PerspectiveCamera(
    45,
    modelDiv.getBoundingClientRect().width / modelDiv.getBoundingClientRect().height,
    0.1,
    1000
)

scene.background = new THREE.Color('rgb(0,0,0)')
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(modelDiv.getBoundingClientRect().width, modelDiv.getBoundingClientRect().height)

modelDiv.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    //Changes size of renderer, and scales aspect ratio of camera
    camera.aspect = modelDiv.getBoundingClientRect().width / modelDiv.getBoundingClientRect().height
    renderer.setSize(modelDiv.getBoundingClientRect().width, modelDiv.getBoundingClientRect().height)
    camera.updateProjectionMatrix()
    rect = renderer.domElement.getBoundingClientRect();
})

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, 2.5, 12.5)
controls.enablePan = true
controls.update()

var meshes = new Array()
var Materials = new Set()
const materialsNames = new Array()
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
var uniqueNames = []
var uniqueMaterials = []
var abbacab

const model = PageName[0]
var internalMode = document.querySelector('#internal')

loader.load(
    `./${PageName[0]}.gltf`,
    function (gltf) {
        scene.clear()
        abbacab = gltf.scene
        abbacab.traverse(function (object) {
            if (object.material) Materials.add(object.material)
            if (object.type == 'Mesh') {
                object.material.side = THREE.FrontSide
                if (object.material.name == 'MI_Transparent_white') {
                    object.renderOrder = 4
                }
                if (object.material.name.includes('Layer')) {
                    object.renderOrder = 2
                    object.material.depthWrite = true
                }
                if (object.material.name.includes('Tracks')) {
                    object.renderOrder = 1
                    object.material.depthWrite = true
                }
                if (object.material.name.includes('Layer_Tank')) {
                    object.renderOrder = 3
                    object.material.depthWrite = false
                }

                if (object.material.name != 'MI_Transparent_white') {
                    meshes.push(object)
                }

                materialsNames.push(object.material.name)

                // Sets thickness of material for use later in Effctive Armour
                if (object.material.name == 'Engine') {
                    object.material.thickness = 2
                }
                if (object.material.name.includes('Heli')){
                    object.material.thickness = 1
                }
                if (object.material.name == 'Engine_Large') {
                    object.material.thickness = 20
                }
                if (object.material.name == 'AmmoRack') {
                    object.material.thickness = 6
                }
                if (object.material.name == 'NoPenetration') {
                    object.material.thickness = 0
                }
                var thick = object.material.name.split('mm').filter(Number)
                if (thick.length > 0) {
                    object.material.thickness = Number(thick[0])
                }
            }
        })

        var light = new THREE.AmbientLight()
        scene.add(light)
        scene.add(gltf.scene)
        let armourPens = document.getElementById('testPens')

        // Calculate the bounding box of the model
        const box = new THREE.Box3().setFromObject(abbacab);
        const size = box.getSize(new THREE.Vector3());
        
        // Calculate the distance to position the camera
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov;
        let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2)) + 6;

        // Position the camera a certain distance away from the model
        camera.position.z = cameraZ;
        camera.position.x = 3;
        camera.position.y = box.max.y + 0.5

        //armourPens.innerHTML = ''
        //document.querySelector("#button1").removeAttribute('hidden')

        //Displays Armour values on screenmm
        const uniqueList = [...Materials]

        for (let i = 0; i < uniqueList.length; i++) {
            if (uniqueNames.indexOf(uniqueList[i].name) == -1) {
                uniqueNames.push(uniqueList[i].name)
                uniqueMaterials.push(uniqueList[i])
            }
        }
        function compare(a, b) {
            if (Number(a.name.split('mm')[0]) < Number(b.name.split('mm')[0])) {
                return -1
            }
            if (Number(a.name.split('mm')[0]) > Number(b.name.split('mm')[0])) {
                return 1
            }
            return 0
        }
        function containsNumber(a,b){
            if(/\d/.test(a.name) == true && /\d/.test(b.name) == false){
                return -1
            }
            if(/\d/.test(a.name) == false && /\d/.test(b.name) == true){
                return 1
            }
            return 0
        }
        uniqueMaterials.sort(compare)
        uniqueMaterials.sort(containsNumber)

        for (let i = 0; i < uniqueMaterials.length; i++) {
            if (uniqueMaterials[i].name == 'MI_Transparent_white') {
            } else {
                let squares = uniqueMaterials[i].color.convertLinearToSRGB()
                let rgbsquares = {}
                rgbsquares[0] = squares.r * 255
                rgbsquares[1] = squares.g * 255
                rgbsquares[2] = squares.b * 255
                armourPens.innerHTML += `<p class="box" style="background-color:rgb(${rgbsquares[0]},${rgbsquares[1]},${rgbsquares[2]});"><span style="padding-left:30px;">${uniqueMaterials[i].name}</span></p>`
            }
        }
    },
    //THIS IS FOR FIX DUAL LOADING
    function ( xhr ) {
        if(xhr.loaded / xhr.total * 100 < 100){
            document.getElementById('modelDiv').style.display = "none"
            document.getElementById('preLoader0').style.removeProperty('display')
        } else {
            document.getElementById('modelDiv').style.removeProperty('display')
            document.getElementById('preLoader0').style.display = "none"
        }
    },
    undefined,
    function (error) {
        console.error(error)
        errorText = arguments['0'];
        if(errorText.toLower().includes('dracoloader')){
            alert('Error Detected: To fix this, disable "Tracking Protection" to allow decompression of model file. Then try again!')
        }
    }
)

internalMode.addEventListener('click', () => {
    abbacab.traverse(function (object) {
        if (object.type == 'Mesh') {
            if (internalMode.innerText == 'Normal') {
                if (object.material.name == 'MI_Transparent_white') {
                    object.material.opacity = 0.15
                } else if (object.material.name.includes('Layer')) {
                    object.material.opacity = 0.5
                } else if (object.material.name.includes('Tracks')) {
                    object.material.opacity = 0.3
                } else if (object.material.name.includes('Layer_Tank')) {
                    object.material.opacity = 0.5
                } else if (
                    object.material.name.includes('Engine') ||
                    object.material.name == 'AmmoRack' ||
                    object.material.name == 'NoPenetration' ||
                    object.material.name.includes('Heli')
                ) {
                    object.renderOrder = 0
                    object.material.depthTest = true
                } else {
                    object.material.transparent = false
                    object.material.opacity = 1
                    object.material.depthWrite = true
                }
            }
            if (internalMode.innerText == 'Internal') {
                if (object.material.name == 'MI_Transparent_white') {
                    object.material.opacity = 0.15
                } else if (object.material.name.includes('Layer')) {
                    object.material.opacity = 0.5
                } else if (object.material.name.includes('Tracks')) {
                    object.material.opacity = 0.3
                } else if (object.material.name.includes('Layer_Tank')) {
                    object.material.opacity = 0.5
                } else if (
                    object.material.name.includes('Engine') ||
                    object.material.name == 'AmmoRack' ||
                    object.material.name == 'NoPenetration' ||
                    object.material.name.includes('Heli')
                ) {
                    object.renderOrder = 0
                    object.material.depthTest = true
                    object.material.transparent = true
                } else {
                    object.material.transparent = false
                    object.material.opacity = 1
                    object.material.depthWrite = false
                }
            }
        }
    })

    animate()
})

const front = document.getElementById("front")
front.addEventListener("click", ()=>{
    controls.reset();
    camera.position.set(15,0,0)
    
})

const back = document.getElementById("back")
back.addEventListener("click", ()=>{
    controls.reset();
    camera.position.set(-15,0,0)
})

const left = document.getElementById("left")
left.addEventListener("click", ()=>{
    controls.reset();
    camera.position.set(0,0,-15)
})

const right = document.getElementById("right")
right.addEventListener("click", ()=>{
    controls.reset();
    camera.position.set(0,0,15)
})

let clock = new THREE.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 30;

function animate() {
    requestAnimationFrame(animate)
    
    delta += clock.getDelta();

    if (delta  > interval) {
       // The draw or time dependent code are here
        raycaster.setFromCamera(mouse, camera)
        controls.update()
        renderer.render(scene, camera)

        delta = delta % interval;
    }
    
}
animate()
//FOR MULTIPLE PAGES----------------------------------------------------------------------------
if(PageName.length == 2){
    const modelDiv2 = document.querySelector('#viewer2')
const scene2 = new THREE.Scene()
const loader2 = new GLTFLoader()

const dracoLoader2 = new DRACOLoader();
dracoLoader2.setDecoderConfig({ type: 'js' });
dracoLoader2.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
dracoLoader2.preload();
loader2.setDRACOLoader( dracoLoader );

var camera2 = new THREE.PerspectiveCamera(
    45,
    modelDiv2.getBoundingClientRect().width / modelDiv2.getBoundingClientRect().height,
    0.1,
    1000
)

scene2.background = new THREE.Color('rgb(0,0,0)')
const renderer2 = new THREE.WebGLRenderer({ antialias: true })
renderer2.setSize(modelDiv2.getBoundingClientRect().width, modelDiv2.getBoundingClientRect().height)

modelDiv2.appendChild(renderer2.domElement)

window.addEventListener('resize', () => {
    //Changes size of renderer, and scales aspect ratio of camera
    camera2.aspect = modelDiv2.getBoundingClientRect().width / modelDiv2.getBoundingClientRect().height
    renderer2.setSize(modelDiv2.getBoundingClientRect().width, modelDiv2.getBoundingClientRect().height)
    camera2.updateProjectionMatrix()
    rect2 = renderer2.domElement.getBoundingClientRect();
})

const controls2 = new OrbitControls(camera2, renderer2.domElement)
camera2.position.set(0, 2.5, 12.5)
controls2.enablePan = true
controls2.update()

var meshes2 = new Array()
var Materials2 = new Set()
const materialsNames2 = new Array()
const mouse2 = new THREE.Vector2()
const raycaster2 = new THREE.Raycaster()
var uniqueNames2 = []
var uniqueMaterials2 = []
var abbacab2

const model2 = PageName[1]
var internalMode2 = document.querySelector('#internal2')

loader2.load(
    `./${PageName[1]}.gltf`,
    function (gltf) {
        scene2.clear()
        abbacab2 = gltf.scene
        abbacab2.traverse(function (object) {
            if (object.material) Materials2.add(object.material)
            if (object.type == 'Mesh') {
                object.material.side = THREE.FrontSide
                if (object.material.name == 'MI_Transparent_white') {
                    object.renderOrder = 4
                }
                if (object.material.name.includes('Layer')) {
                    object.renderOrder = 2
                    object.material.depthWrite = true
                }
                if (object.material.name.includes('Tracks')) {
                    object.renderOrder = 1
                    object.material.depthWrite = true
                }
                if (object.material.name.includes('Layer_Tank')) {
                    object.renderOrder = 3
                    object.material.depthWrite = false
                }

                if (object.material.name != 'MI_Transparent_white') {
                    meshes2.push(object)
                }

                materialsNames2.push(object.material.name)

                // Sets thickness of material for use later in Effctive Armour
                if (object.material.name == 'Engine') {
                    object.material.thickness = 2
                }
                if (object.material.name.includes('Heli')){
                    object.material.thickness = 1
                }
                if (object.material.name == 'Engine_Large') {
                    object.material.thickness = 20
                }
                if (object.material.name == 'AmmoRack') {
                    object.material.thickness = 6
                }
                var thick = object.material.name.split('mm').filter(Number)
                if (thick.length > 0) {
                    object.material.thickness = Number(thick[0])
                }
            }
        })

        var light2 = new THREE.AmbientLight()
        scene2.add(light2)
        scene2.add(gltf.scene)
        let armourPens2 = document.getElementById('testPens2')

        // Calculate the bounding box of the model
        const box2 = new THREE.Box3().setFromObject(abbacab2);
        const size2 = box2.getSize(new THREE.Vector3());
        
        // Calculate the distance to position the camera
        const maxDim2 = Math.max(size2.x, size2.y, size2.z);
        const fov2 = camera2.fov;
        let cameraZ2 = Math.abs(maxDim2 / 4 * Math.tan(fov2 * 2)) + 6;

        // Position the camera a certain distance away from the model
        camera2.position.z = cameraZ2;
        camera2.position.x = 3;
        camera2.position.y = box2.max.y + 0.5

        //armourPens.innerHTML = ''
        //document.querySelector("#button1").removeAttribute('hidden')

        //Displays Armour values on screenmm
        const uniqueList2 = [...Materials2]

        for (let i = 0; i < uniqueList2.length; i++) {
            if (uniqueNames2.indexOf(uniqueList2[i].name) == -1) {
                uniqueNames2.push(uniqueList2[i].name)
                uniqueMaterials2.push(uniqueList2[i])
            }
        }
        function compare(a, b) {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            return 0
        }
        function containsNumber(a,b){
            if(/\d/.test(a.name) == true && /\d/.test(b.name) == false){
                return -1
            }
            if(/\d/.test(a.name) == false && /\d/.test(b.name) == true){
                return 1
            }
            return 0
        }
        uniqueMaterials2.sort(compare)
        uniqueMaterials2.sort(containsNumber)

        for (let i = 0; i < uniqueMaterials2.length; i++) {
            if (uniqueMaterials2[i].name == 'MI_Transparent_white') {
            } else {
                let squares2 = uniqueMaterials2[i].color.convertLinearToSRGB()
                let rgbsquares2 = {}
                rgbsquares2[0] = squares2.r * 255
                rgbsquares2[1] = squares2.g * 255
                rgbsquares2[2] = squares2.b * 255
                armourPens2.innerHTML += `<p class="box" style="background-color:rgb(${rgbsquares2[0]},${rgbsquares2[1]},${rgbsquares2[2]});"><span style="padding-left:30px;">${uniqueMaterials2[i].name}</span></p>`
            }
        }
    },
    //THIS IS FOR FIX DUAL LOADING
    function ( xhr ) {
        if(xhr.loaded / xhr.total * 100 < 100){
            document.getElementById('modelDiv2').style.display = "none"
            document.getElementById('preLoader1').style.removeProperty('display')
        } else {
            document.getElementById('modelDiv2').style.removeProperty('display')
            document.getElementById('preLoader1').style.display = "none"
        }
    },
    undefined,
    function (error) {
        console.error(error)
        errorText = arguments['0'];
        if(errorText.toLower().includes('dracoloader')){
            alert('Error Detected: To fix this, disable "Tracking Protection" to allow decompression of model file. Then try again!')
        }
    }
)

internalMode2.addEventListener('click', () => {
    abbacab2.traverse(function (object) {
        if (object.type == 'Mesh') {
            if (internalMode2.innerText == 'Normal') {
                if (object.material.name == 'MI_Transparent_white') {
                    object.material.opacity = 0.15
                } else if (object.material.name.includes('Layer')) {
                    object.material.opacity = 0.5
                } else if (object.material.name.includes('Tracks')) {
                    object.material.opacity = 0.3
                } else if (object.material.name.includes('Layer_Tank')) {
                    object.material.opacity = 0.5
                } else if (
                    object.material.name.includes('Engine') ||
                    object.material.name == 'AmmoRack' ||
                    object.material.name == 'NoPenetration' ||
                    object.material.name.includes('Heli')
                ) {
                    object.renderOrder = 0
                    object.material.depthTest = true
                } else {
                    object.material.transparent = false
                    object.material.opacity = 1
                    object.material.depthWrite = true
                }
            }
            if (internalMode2.innerText == 'Internal') {
                if (object.material.name == 'MI_Transparent_white') {
                    object.material.opacity = 0.15
                } else if (object.material.name.includes('Layer')) {
                    object.material.opacity = 0.5
                } else if (object.material.name.includes('Tracks')) {
                    object.material.opacity = 0.3
                } else if (object.material.name.includes('Layer_Tank')) {
                    object.material.opacity = 0.5
                } else if (
                    object.material.name.includes('Engine') ||
                    object.material.name == 'AmmoRack' ||
                    object.material.name == 'NoPenetration' ||
                    object.material.name.includes('Heli')
                ) {
                    object.renderOrder = 0
                    object.material.depthTest = true
                    object.material.transparent = true
                } else {
                    object.material.transparent = false
                    object.material.opacity = 1
                    object.material.depthWrite = false
                }
            }
        }
    })

    animate2()
})

const front2 = document.getElementById("front2")
front2.addEventListener("click", ()=>{
    controls2.reset();
    camera2.position.set(15,0,0)
})

const back2 = document.getElementById("back2")
back2.addEventListener("click", ()=>{
    controls2.reset();
    camera2.position.set(-15,0,0)
})

const left2 = document.getElementById("left2")
left2.addEventListener("click", ()=>{
    controls2.reset();
    camera2.position.set(0,0,-15)
})

const right2 = document.getElementById("right2")
right2.addEventListener("click", ()=>{
    controls2.reset();
    camera2.position.set(0,0,15)
})

let clock = new THREE.Clock();
let delta2 = 0;
// 30 fps
let interval2 = 1 / 30;

function animate2() {
    requestAnimationFrame(animate2)
    delta2 += clock.getDelta();

    if (delta2  > interval2) {
       // The draw or time dependent code are here
        raycaster2.setFromCamera(mouse2, camera2)
    controls2.update()
    renderer2.render(scene2, camera2)

        delta2 = delta2 % interval2;
    }
    
}
animate2()

var intersects2
var tooltip = document.getElementById('bodytooltip')
var tooltiplist = document.querySelector('#bodytooltiplist')
var childDivs1 = document
    .querySelector('#bodytooltiplist')
    .getElementsByTagName('p')
var HullIndex2
var Track1Index2
var Track2Index2
var EngineIndex2
var TailIndex2
var AmmoIndex2
var penIndex2
var rect2 = renderer2.domElement.getBoundingClientRect();
// IF ROUND PENS HULL ONCE, IT CANNOT PEN IT AGAIN
// LAYER ARMOUR DOES NOT REMOVE PENETRATION FROM A ROUND, JUST DAMAGE (LOL)
renderer2.domElement.addEventListener(
    'mousemove',
    (event) => {
        mouse2.set(
            ( ( event.clientX - rect2.left ) / ( rect2.right - rect2.left ) ) * 2 - 1,
            - ( ( event.clientY - rect2.top ) / ( rect2.bottom - rect2.top) ) * 2 + 1
        )

        intersects2 = raycaster2.intersectObjects(meshes2)
        penIndex2 = -1
        var alreadyTrack2 = false
        var alreadyAmmo2 = false
        var hasMain2 = false
        HullIndex2 = 0
        Track1Index2 = -1
        Track2Index2 = -1
        EngineIndex2 = -1
        TailIndex2 = -1
        AmmoIndex2 = -1
        var NoPen2 = -1
        var PenReq2 = []
        var DistReq2 = []
        for (let i = 0; i < childDivs1.length; ) {
            childDivs1[i].remove()
        }

        if (intersects2.length > 0) {
            for (let i = intersects2.length; i > 0; i--) {
                if (
                    intersects2[
                        intersects2.length - 1
                    ].object.material.name.includes('Layer')
                ) {
                    intersects2.pop()
                }
            }

            if (intersects2.length > 0) {
                for (let i = 0; i < intersects2.length; i++) {
                    if (hasMain2 == false) {
                        if (
                            intersects2[i].object.material.name.slice(-2) ==
                                'mm' &&
                            HullIndex2 == 0
                        ) {
                            HullIndex2 = i + 1
                            hasMain2 = true
                        }
                    }

                    if (
                        intersects2[i].object.material.name.slice(-2) == 'mm' &&
                        i != HullIndex2 - 1
                    ) {
                        intersects2.splice(i, 1)
                        i = i - 1
                    }

                    if (
                        intersects2[i].object.material.name == 'NoPenetration'
                    ) {
                        NoPen2 = i + 1
                    }
                }

                for (let i = intersects2.length; i > 0; i--) {
                    if (
                        intersects2[
                            intersects2.length - 1
                        ].object.material.name.includes('Layer')
                    ) {
                        intersects2.pop()
                    }
                }

                while (intersects2.length > NoPen2 && NoPen2 > -1) {
                    intersects2.pop()
                }
                ////////////////////////////////////////////////////////////////////////////
                for (let i = 0; i < intersects2.length; i++) {
                    if (intersects2[i].object.material.name.includes("Tracks")){
                        if(alreadyTrack2 == false){
                            Track1Index2 = i
                            alreadyTrack2 = true
                        } else {
                            Track2Index2 = i
                        }
                    }
                    if (intersects2[i].object.material.name.includes("Engine")){
                        EngineIndex2 = i
                    }
                    if (intersects2[i].object.material.name.includes("Tail")){
                        TailIndex2 = i
                    }
                    if (intersects2[i].object.material.name.includes("AmmoRack")){
                        if (alreadyAmmo2 == false){
                            AmmoIndex2 = i
                            alreadyAmmo2 = true
                        } else {}
                    }
                    
                    let n = intersects2[i].normal
                    let p = intersects2[i].point
                    let c = camera2.position
                    let v = new THREE.Vector3()

                    for (let f = 0; f < 3; f++) {
                        v.setX(p.x - c.x)
                        v.setY(p.y - c.y)
                        v.setZ(p.z - c.z)
                    }

                    let rad = v.angleTo(n)
                    let angle = (rad * 180.0) / Math.PI - 90
                    if (PenReq2[i-1] == undefined){
                        PenReq2[i] = Math.round(
                            (Math.abs(
                                    intersects2[i].object.material
                                        .thickness /
                                        Math.sin(angle * (Math.PI / 180))
                                ) +
                                Number.EPSILON) *
                                100
                        ) / 100
                    } else {
                        PenReq2[i] = Math.round(
                        (PenReq2[i-1] +
                            Math.abs(
                                intersects2[i].object.material
                                    .thickness /
                                    Math.sin(angle * (Math.PI / 180))
                            ) +
                            Number.EPSILON) *
                            100
                    ) / 100
                    }
                    DistReq2[i] = intersects2[i].distance-intersects2[0].distance
                }
                HullIndex2 = HullIndex2 -1 
                var selectedWeapon = document.querySelector('#weaponSelect2 option:checked')
                var traceDist
                if (selectedWeapon.parentElement.label == 'Infantry AT'){
                    traceDist = weaponData.inf_AT[selectedWeapon.innerText].Trace
                } else if (selectedWeapon.parentElement.label == 'Other AT'){
                    traceDist = weaponData.Other[selectedWeapon.innerText].Trace
                }
                var m = - Number(maxPen2.innerText.slice(0, -2)) / traceDist
                var c = Number(maxPen2.innerText.slice(0, -2))
                var tracedPen
                
                
                for (let i = 0; i < intersects2.length; i++) {
                    const option = document.createElement('p')
                    option.textContent = intersects2[i].object.material.name
                    tooltiplist.appendChild(option)
                
                    tracedPen = (m*DistReq2[i]) + c
                    if (tracedPen > PenReq2[i]){
                        penIndex2 = i
                    }
                }

                const tempBreak3 = document.createElement('p')
                tempBreak3.textContent = '-----------------'
                tooltiplist.appendChild(tempBreak3)

                if (HullIndex2 <= penIndex2 && HullIndex2 != -1){
                    const option = document.createElement('p')
                    option.textContent = 'Hull Pen: Yes'
                    option.style.color = "green"
                    tooltiplist.appendChild(option)
                } else {
                    const option = document.createElement('p')
                    option.textContent = 'Hull Pen: No'
                    option.style.color = "red"
                    tooltiplist.appendChild(option)
                }
                if (uniqueNames2.includes('30mm_Tracks')){
                    if (Track1Index2 <= penIndex2 && Track1Index2 != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Track Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else {
                        const option = document.createElement('p')
                        option.textContent = 'Track Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                    if (Track2Index2 <= penIndex2 && Track2Index2 != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Both Track Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else if (Track2Index2 != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Both Track Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                }
                if (uniqueNames2.includes('AmmoRack')){
                    if (AmmoIndex2 <= penIndex2 && AmmoIndex2 != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Ammo Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else {
                        const option = document.createElement('p')
                        option.textContent = 'Ammo Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                }
                if (EngineIndex2 <= penIndex2 && EngineIndex2 != -1){
                    const option = document.createElement('p')
                    option.textContent = 'Engine Pen: Yes'
                    option.style.color = "green"
                    tooltiplist.appendChild(option)
                } else {
                    const option = document.createElement('p')
                    option.textContent = 'Engine Pen: No'
                    option.style.color = "red"
                    tooltiplist.appendChild(option)
                }
                if (uniqueNames2.includes('Heli_Tail')){
                    if (TailIndex2 <= penIndex2 && TailIndex2 != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Tail Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else {
                        const option = document.createElement('p')
                        option.textContent = 'Tail Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                }

                const tempBreak = document.createElement('p')
                tempBreak.textContent = '-----------------'
                tooltiplist.appendChild(tempBreak)

                const option2 = document.createElement('p')
                if (PenReq2[HullIndex2] == undefined){
                    option2.textContent = 'Hull Thickness: -'
                } else {
                    option2.textContent = 'Hull Thickness: ' + PenReq2[HullIndex2]
                }
                tooltiplist.appendChild(option2)

                const option = document.createElement('p')
                option.textContent = 'Total Thickness: ' + PenReq2[PenReq2.length-1]
                tooltiplist.appendChild(option)
                
                const tempBreak2 = document.createElement('p')
                tempBreak2.textContent = '-----------------'
                tooltiplist.appendChild(tempBreak2)
            }
        }

        if (intersects2.length > 0) {
            tooltip.style.display = 'flex'
            tooltip.style.left = event.pageX + 'px'
            tooltip.style.top = event.pageY + 'px'
        } else tooltip.style.display = 'none'
    },
    false
)
let timer3
let timer4
renderer2.domElement.addEventListener(
    'click',
    () => {
        if (intersects2.length != 0 && damageType2.innerText != '-'){
            var NextDamage = 0;
            const DamageTypeText = damageType2.innerText;
            var Impact = damage2.innerText.split(" ")[0];
            var Expl = damage2.innerText.split(" ")[2];
            var alreadyTrack = false
            var alreadyAmmo = false
            var alreadyTail = false
            //const Pen = maxPen.innerText; //TAKE A LOOK AT TYPE OF PEN. TRACK/HULL
            //INCLUDING CHECK FOR TRACK1 AND TRACK2 ON TOOLTIP TRACE DISTANCE
            var HullHP = 0;
            var TrackHP = 0;
            var AmmoHP = 0;
            var EngineHP = 0;
            var TailHP = 0;
            var HullMod = 0;
            var HullRadial = 0;
            var TrackMod = 0;
            var AmmoMod = 0;
            var EngineMod = 0;
            var TailMod = 0;
            var HullDamage = 0;
            var EngineDamage = 0;
            var Track1Damage = 0;
            var Track2Damage = 0;
            var AmmoDamage = 0;
            var TailDamage = 0;
            if (document.getElementById(DamageTypeText+'_Dmg1') == null || document.getElementById(DamageTypeText+'_Dmg1').innerText == ""){
                HullMod = 1;
            } else {
                HullMod = Number(document.getElementById(DamageTypeText+'_Dmg1').textContent.split(" ").slice(-1)[0]);
            };
            if (data[PageName[1]].Variants[0][DamageTypeText+'_Radial'] == undefined){
                HullRadial = 0;
            } else {
                HullRadial = data[PageName[1]].Variants[0][DamageTypeText+'_Radial']
            };
            HullHP = document.getElementById('Main_HP1').textContent.split(" ").slice(-1)[0]
            for (let i=0;i<intersects2.length;i++){
                if (intersects2[i].object.material.name.includes("Tracks")){
                    if(track1[DamageTypeText+'_Dmg'] == undefined){
                        TrackMod = 1
                    } else {
                        TrackMod = track1[DamageTypeText+'_Dmg']
                    }
                    TrackHP = track1.Track_HP
                } else if (intersects2[i].object.material.name.includes("Engine")){
                    if (intersects2[i].object.material.name == "Heli_Engine"){
                        if(engine.Heli_Engine[DamageTypeText+'_Dmg'] == undefined){
                            EngineMod = 1
                        } else {
                            EngineMod = engine.Heli_Engine[DamageTypeText+'_Dmg']
                        }
                        EngineHP = engine.Heli_Engine.Engine_HP
                    } else {
                        if(engine[DamageTypeText+'_Dmg'] == undefined){
                            EngineMod = 1
                        } else {
                            EngineMod = engine[DamageTypeText+'_Dmg']
                        }
                        EngineHP = engine.Engine_HP
                    }
                    
                } else if (intersects2[i].object.material.name.includes("Tail")){
                    if(engine.Heli_Tail[DamageTypeText+'_Dmg'] == undefined){
                        TailMod = 1
                    } else {
                        TailMod = engine.Heli_Tail[DamageTypeText+'_Dmg']
                    }
                    TailHP = engine.Heli_Tail.Tail_HP
                } else if (intersects2[i].object.material.name.includes("AmmoRack")){
                    var RackData = AmmoRack[data[PageName[1]].Variants[0].Rack_Type]
                    if(RackData[DamageTypeText+'_Dmg'] == undefined){
                        AmmoMod = 1
                    } else {
                        AmmoMod = RackData[DamageTypeText+'_Dmg']
                    }
                    AmmoHP = RackData.Ammo_HP
                }
                Impact = Impact - NextDamage;
                if (intersects2[i].object.material.name.includes('Engine')){
                    if(DamageTypeText == "Explosive"){
                        EngineDamage = 0;
                    } else {
                        EngineDamage = Impact * EngineMod;
                        NextDamage = absorbed.Engine;
                    }
                    
                } else if (intersects2[i].object.material.name.includes('Tail')){
                    if(alreadyTail == false){
                        TailDamage = Impact * TailMod;
                        alreadyTail = true
                    }
                    NextDamage = absorbed.Tail;
                } else if (intersects2[i].object.material.name.includes('Ammo')){
                    if(DamageTypeText == "Explosive"){
                        AmmoDamage = 0;
                    } else {
                        if(alreadyAmmo == false){
                            AmmoDamage = Impact * AmmoMod;
                            alreadyAmmo = true
                        }
                        NextDamage = absorbed.Ammo;
                    }
                    
                } else {
                    if(absorbed[intersects2[i].object.material.name] == undefined){
                        if (intersects2[i].object.material.name.includes("Tracks")){
                            if(alreadyTrack == false){
                                Track1Damage = Impact * TrackMod
                                alreadyTrack = true
                            } else {
                                Track2Damage = Impact * TrackMod
                            }
                        }
                        if (intersects2[i].object.material.name.includes("Tank")){
                            NextDamage = absorbed[intersects2[i].object.material.name.substring(0,intersects[i].object.material.name.length-5)]
                        } else {
                            NextDamage = absorbed[intersects2[i].object.material.name.split("_").slice(0)[0]]
                        }
                        
                    } else {
                        if(DamageTypeText == "Explosive"){
                            HullDamage = damage2.innerText.split(" ")[0];
                        } else {
                            HullDamage = Impact * HullMod
                            HullDamage = HullDamage + (Expl * HullRadial)
                            NextDamage = absorbed[intersects2[i].object.material.name]
                        }
                        
                    }
                }
                //console.log("Impact Damage: "+Impact)
                //console.log("Distance from first hit: " + (intersects[i].distance-intersects[0].distance))
            };
            const damageStats = document.getElementById('damageStats2')
            damageStats.innerHTML = ""   
            if(HullDamage>0 && HullIndex2 != -1 && HullIndex2<=penIndex2){
                HullDamage = overKill(toPositive(HullDamage), HullHP)
                const option = document.createElement('p')
                option.textContent = 'Hull Damage: ' + HullDamage + ' / ' + HullHP
                damageStats.appendChild(option)
            }
            if(Track1Damage>0 && Track1Index2 != -1 && Track1Index2<=penIndex2){
                Track1Damage = overKill(toPositive(Track1Damage), TrackHP)
                const option = document.createElement('p')
                option.textContent = 'Track1 Damage: ' + Track1Damage + ' / ' + TrackHP
                damageStats.appendChild(option)
            }
            if(Track2Damage>0 && Track2Index2 != -1 && Track2Index2<=penIndex2){
                Track2Damage = overKill(toPositive(Track2Damage), TrackHP)
                const option = document.createElement('p')
                option.textContent = 'Track2 Damage: ' + Track2Damage + ' / ' + TrackHP
                damageStats.appendChild(option)
            }
            if(EngineDamage>0 && EngineIndex2 != -1 && EngineIndex2<=penIndex2){
                EngineDamage = overKill(toPositive(EngineDamage), EngineHP)
                const option = document.createElement('p')
                option.textContent = 'Engine Damage: ' + EngineDamage + ' / ' + EngineHP
                damageStats.appendChild(option)
            }
            if(AmmoDamage>0 && AmmoIndex2 != -1 && AmmoIndex2<=penIndex2){
                AmmoDamage = overKill(toPositive(AmmoDamage), AmmoHP)
                const option = document.createElement('p')
                option.textContent = 'AmmoRack Damage: ' + AmmoDamage + ' / ' + AmmoHP
                damageStats.appendChild(option)
            }
            if(TailDamage>0 && TailIndex2 != -1 && TailIndex2<=penIndex2){
                TailDamage = overKill(toPositive(TailDamage), TailHP)
                const option = document.createElement('p')
                option.textContent = 'Tail Damage: ' + TailDamage + ' / ' + TailHP
                damageStats.appendChild(option)
            }
            if (damageStats.innerHTML == ""){
                const option = document.createElement('p')
                option.textContent = 'No Damage Done'
                damageStats.appendChild(option)
            }
            // USED TO DISPLAY DAMAGE BOX FOR 5 SECONDS ON CLICK //
            function clickDisplay() {
                damageStats.classList.remove('visible');
                damageStats.classList.add('hidden');
                clearTimeout(timer4)
                timer4 = setTimeout(function(){damageStats.innerHTML = ""}, 500)
            }

            damageStats.classList.remove('hidden');
            damageStats.classList.add('visible');
            clearTimeout(timer3);
            timer3 = setTimeout(clickDisplay, 5000)
            // //
        }
    })
function overKill(Damage, Health){
    var overDamage
    if (Damage>Health){
        overDamage = Damage - Health
        Damage = Math.round(Health) + " (+"  + Math.round(overDamage) + ")"
    } else {
        Damage = Math.round(Damage)
    }
    return Damage
}
function toPositive(value){
    value = Math.max(0, value);
    return value
}

const damageStates2 = document.getElementById('damageStats2')
let resizeObserver2 = new ResizeObserver(() => {
    document.getElementById('viewer2').style.setProperty('height', ((window.innerHeight - document.getElementById('slidecontainer2').clientHeight - document.getElementById('nav').clientHeight)-100) + "px")
})
resizeObserver2.observe(damageStates2)
}
import { data } from '../data/data2.js';
import { track1, AmmoRack, engine, absorbed } from '../data/internalsDamage.js'
let timer
let timer2
renderer.domElement.addEventListener(
    'click',
    () => {
        if (intersects.length != 0 && damageType.innerText != '-'){
            var NextDamage = 0;
            const DamageTypeText = damageType.innerText;
            var Impact = damage.innerText.split(" ")[0];
            var Expl = damage.innerText.split(" ")[2];
            var alreadyTrack = false
            var alreadyAmmo = false
            var alreadyTail = false
            //const Pen = maxPen.innerText; //TAKE A LOOK AT TYPE OF PEN. TRACK/HULL
            //INCLUDING CHECK FOR TRACK1 AND TRACK2 ON TOOLTIP TRACE DISTANCE
            var HullHP = 0;
            var TrackHP = 0;
            var AmmoHP = 0;
            var EngineHP = 0;
            var TailHP = 0;
            var HullMod = 0;
            var HullRadial = 0;
            var TrackMod = 0;
            var AmmoMod = 0;
            var EngineMod = 0;
            var TailMod = 0;
            var HullDamage = 0;
            var EngineDamage = 0;
            var Track1Damage = 0;
            var Track2Damage = 0;
            var AmmoDamage = 0;
            var TailDamage = 0;
            if (document.getElementById(DamageTypeText+'_Dmg0') == null || document.getElementById(DamageTypeText+'_Dmg0').innerText == ""){
                HullMod = 1;
            } else {
                HullMod = Number(document.getElementById(DamageTypeText+'_Dmg0').textContent.split(" ").slice(-1)[0]);
            };
            if (data[PageName[0]].Variants[0][DamageTypeText+'_Radial'] == undefined){
                HullRadial = 0;
            } else {
                HullRadial = data[PageName[0]].Variants[0][DamageTypeText+'_Radial']
            };
            HullHP = document.getElementById('Main_HP0').textContent.split(" ").slice(-1)[0]
            for (let i=0;i<intersects.length;i++){
                if (intersects[i].object.material.name.includes("Tracks")){
                    if(track1[DamageTypeText+'_Dmg'] == undefined){
                        TrackMod = 1
                    } else {
                        TrackMod = track1[DamageTypeText+'_Dmg']
                    }
                    TrackHP = track1.Track_HP
                } else if (intersects[i].object.material.name.includes("Engine")){
                    if (intersects[i].object.material.name == "Heli_Engine"){
                        if(engine.Heli_Engine[DamageTypeText+'_Dmg'] == undefined){
                            EngineMod = 1
                        } else {
                            EngineMod = engine.Heli_Engine[DamageTypeText+'_Dmg']
                        }
                        EngineHP = engine.Heli_Engine.Engine_HP
                    } else {
                        if(engine[DamageTypeText+'_Dmg'] == undefined){
                            EngineMod = 1
                        } else {
                            EngineMod = engine[DamageTypeText+'_Dmg']
                        }
                        EngineHP = engine.Engine_HP
                    }
                    
                } else if (intersects[i].object.material.name.includes("Tail")){
                    if(engine.Heli_Tail[DamageTypeText+'_Dmg'] == undefined){
                        TailMod = 1
                    } else {
                        TailMod = engine.Heli_Tail[DamageTypeText+'_Dmg']
                    }
                    TailHP = engine.Heli_Tail.Tail_HP
                } else if (intersects[i].object.material.name.includes("AmmoRack")){
                    var RackData = AmmoRack[data[PageName[0]].Variants[0].Rack_Type]
                    if(RackData[DamageTypeText+'_Dmg'] == undefined){
                        AmmoMod = 1
                    } else {
                        AmmoMod = RackData[DamageTypeText+'_Dmg']
                    }
                    AmmoHP = RackData.Ammo_HP
                }
                Impact = Impact - NextDamage;
                if (intersects[i].object.material.name.includes('Engine')){
                    if(DamageTypeText == "Explosive"){
                        EngineDamage = 0;
                    } else {
                        EngineDamage = Impact * EngineMod;
                        NextDamage = absorbed.Engine;
                    }
                    
                } else if (intersects[i].object.material.name.includes('Tail')){
                    if(alreadyTail == false){
                        TailDamage = Impact * TailMod;
                        alreadyTail = true
                    }
                    NextDamage = absorbed.Tail;
                } else if (intersects[i].object.material.name.includes('Ammo')){
                    if(DamageTypeText == "Explosive"){
                        AmmoDamage = 0;
                    } else {
                        if(alreadyAmmo == false){
                            AmmoDamage = Impact * AmmoMod;
                            alreadyAmmo = true
                        }
                        NextDamage = absorbed.Ammo;
                    }
                    
                } else {
                    if(absorbed[intersects[i].object.material.name] == undefined){
                        if (intersects[i].object.material.name.includes("Tracks")){
                            if(alreadyTrack == false){
                                Track1Damage = Impact * TrackMod
                                alreadyTrack = true
                            } else {
                                Track2Damage = Impact * TrackMod
                            }
                        }
                        if (intersects[i].object.material.name.includes("Tank")){
                            NextDamage = absorbed[intersects[i].object.material.name.substring(0,intersects[i].object.material.name.length-5)]
                        } else {
                            NextDamage = absorbed[intersects[i].object.material.name.split("_").slice(0)[0]]
                        }
                        
                    } else {
                        if(DamageTypeText == "Explosive"){
                            HullDamage = damage.innerText.split(" ")[0];
                        } else {
                            HullDamage = Impact * HullMod
                            HullDamage = HullDamage + (Expl * HullRadial)
                            NextDamage = absorbed[intersects[i].object.material.name]
                        }
                        
                    }
                }
                //console.log("Impact Damage: "+Impact)
                //console.log("Distance from first hit: " + (intersects[i].distance-intersects[0].distance))
            };
            const damageStats = document.getElementById('damageStats')
            damageStats.innerHTML = ""   
            if(HullDamage>0 && HullIndex != -1 && HullIndex<=penIndex){
                HullDamage = overKill(toPositive(HullDamage), HullHP)
                const option = document.createElement('p')
                option.textContent = 'Hull Damage: ' + HullDamage + ' / ' + HullHP
                damageStats.appendChild(option)
            }
            if(Track1Damage>0 && Track1Index != -1 && Track1Index<=penIndex){
                Track1Damage = overKill(toPositive(Track1Damage), TrackHP)
                const option = document.createElement('p')
                option.textContent = 'Track1 Damage: ' + Track1Damage + ' / ' + TrackHP
                damageStats.appendChild(option)
            }
            if(Track2Damage>0 && Track2Index != -1 && Track2Index<=penIndex){
                Track2Damage = overKill(toPositive(Track2Damage), TrackHP)
                const option = document.createElement('p')
                option.textContent = 'Track2 Damage: ' + Track2Damage + ' / ' + TrackHP
                damageStats.appendChild(option)
            }
            if(EngineDamage>0 && EngineIndex != -1 && EngineIndex<=penIndex){
                EngineDamage = overKill(toPositive(EngineDamage), EngineHP)
                const option = document.createElement('p')
                option.textContent = 'Engine Damage: ' + EngineDamage + ' / ' + EngineHP
                damageStats.appendChild(option)
            }
            if(AmmoDamage>0 && AmmoIndex != -1 && AmmoIndex<=penIndex){
                AmmoDamage = overKill(toPositive(AmmoDamage), AmmoHP)
                const option = document.createElement('p')
                option.textContent = 'AmmoRack Damage: ' + AmmoDamage + ' / ' + AmmoHP
                damageStats.appendChild(option)
            }
            if(TailDamage>0 && TailIndex != -1 && TailIndex<=penIndex){
                TailDamage = overKill(toPositive(TailDamage), TailHP)
                const option = document.createElement('p')
                option.textContent = 'Tail Damage: ' + TailDamage + ' / ' + TailHP
                damageStats.appendChild(option)
            }
            if (damageStats.innerHTML == ""){
                const option = document.createElement('p')
                option.textContent = 'No Damage Done'
                damageStats.appendChild(option)
            }
            // USED TO DISPLAY DAMAGE BOX FOR 5 SECONDS ON CLICK //
            function clickDisplay() {
                damageStats.classList.remove('visible');
                damageStats.classList.add('hidden');
                clearTimeout(timer2)
                timer2 = setTimeout(function(){damageStats.innerHTML = ""}, 500)
            }

            damageStats.classList.remove('hidden');
            damageStats.classList.add('visible');
            clearTimeout(timer);
            timer = setTimeout(clickDisplay, 5000)
            // //
        }
    })
function overKill(Damage, Health){
    var overDamage
    if (Damage>Health){
        overDamage = Damage - Health
        Damage = Math.round(Health) + " (+"  + Math.round(overDamage) + ")"
    } else {
        Damage = Math.round(Damage)
    }
    return Damage
}
function toPositive(value){
    value = Math.max(0, value);
    return value
}


var intersects
var tooltip = document.getElementById('bodytooltip')
var tooltiplist = document.querySelector('#bodytooltiplist')
var childDivs1 = document
    .querySelector('#bodytooltiplist')
    .getElementsByTagName('p')
var HullIndex
var Track1Index
var Track2Index
var EngineIndex
var TailIndex
var AmmoIndex
var penIndex
var rect = renderer.domElement.getBoundingClientRect();
// IF ROUND PENS HULL ONCE, IT CANNOT PEN IT AGAIN
renderer.domElement.addEventListener(
    'mousemove',
    (event) => {
        mouse.set(
            ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1,
            - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1
        )

        intersects = raycaster.intersectObjects(meshes)
        penIndex = -1
        var alreadyTrack = false
        var alreadyAmmo = false
        var hasMain = false
        HullIndex = 0
        Track1Index = -1
        Track2Index = -1
        EngineIndex = -1
        TailIndex = -1
        AmmoIndex = -1
        var NoPen = -1
        var PenReq = []
        var DistReq = []
        for (let i = 0; i < childDivs1.length; ) {
            childDivs1[i].remove()
        }

        if (intersects.length > 0) {
            for (let i = intersects.length; i > 0; i--) {
                if (
                    intersects[
                        intersects.length - 1
                    ].object.material.name.includes('Layer')
                ) {
                    intersects.pop()
                }
            }

            if (intersects.length > 0) {
                for (let i = 0; i < intersects.length; i++) {
                    //////////////////////////////////KEEP THIS FOR REFACTOR ///////////////////////////////////////
                    if (hasMain == false) {
                        if (
                            intersects[i].object.material.name.slice(-2) ==
                                'mm' &&
                            HullIndex == 0
                        ) {
                            HullIndex = i + 1
                            hasMain = true
                        }
                    }

                    if (
                        intersects[i].object.material.name.slice(-2) == 'mm' &&
                        i != HullIndex - 1
                    ) {
                        intersects.splice(i, 1)
                        i = i - 1
                    }

                    if (intersects[i].object.material.name == 'NoPenetration') {
                        NoPen = i + 1
                    }
                }
                //For Techie as it is speshul
                for (let i = intersects.length; i > 0; i--) {
                    if (
                        intersects[
                            intersects.length - 1
                        ].object.material.name.includes('Layer')
                    ) {
                        intersects.pop()
                    }
                }

                while (intersects.length > NoPen && NoPen > -1) {
                    intersects.pop()
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////
                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object.material.name.includes("Tracks")){
                        if(alreadyTrack == false){
                            Track1Index = i
                            alreadyTrack = true
                        } else {
                            Track2Index = i
                        }
                    }
                    if (intersects[i].object.material.name.includes("Engine")){
                        EngineIndex = i
                    }
                    if (intersects[i].object.material.name.includes("Tail")){
                        TailIndex = i
                    }
                    if (intersects[i].object.material.name.includes("AmmoRack")){
                        if (alreadyAmmo == false){
                            AmmoIndex = i
                            alreadyAmmo = true
                        } else {}
                    }
                    
                    let n = intersects[i].normal
                    let p = intersects[i].point
                    let c = camera.position
                    let v = new THREE.Vector3()

                    for (let f = 0; f < 3; f++) {
                        v.setX(p.x - c.x)
                        v.setY(p.y - c.y)
                        v.setZ(p.z - c.z)
                    }

                    let rad = v.angleTo(n)
                    let angle = (rad * 180.0) / Math.PI - 90
                    if (PenReq[i-1] == undefined){
                        PenReq[i] = Math.round(
                            (Math.abs(
                                    intersects[i].object.material
                                        .thickness /
                                        Math.sin(angle * (Math.PI / 180))
                                ) +
                                Number.EPSILON) *
                                100
                        ) / 100
                    } else {
                        PenReq[i] = Math.round(
                        (PenReq[i-1] +
                            Math.abs(
                                intersects[i].object.material
                                    .thickness /
                                    Math.sin(angle * (Math.PI / 180))
                            ) +
                            Number.EPSILON) *
                            100
                    ) / 100
                    }
                    DistReq[i] = intersects[i].distance-intersects[0].distance
                }
                HullIndex = HullIndex -1 
                var selectedWeapon = document.querySelector('#weaponSelect option:checked')
                var traceDist
                if (selectedWeapon.parentElement.label == 'Infantry AT'){
                    traceDist = weaponData.inf_AT[selectedWeapon.innerText].Trace
                } else if (selectedWeapon.parentElement.label == 'Other AT'){
                    traceDist = weaponData.Other[selectedWeapon.innerText].Trace
                }
                var m = - Number(maxPen.innerText.slice(0, -2)) / traceDist
                var c = Number(maxPen.innerText.slice(0, -2))
                var tracedPen
                
                
                for (let i = 0; i < intersects.length; i++) {
                    const option = document.createElement('p')
                    option.textContent = intersects[i].object.material.name
                    tooltiplist.appendChild(option)
                
                    tracedPen = (m*DistReq[i]) + c
                    if (tracedPen > PenReq[i]){
                        penIndex = i
                    }
                }

                const tempBreak3 = document.createElement('p')
                tempBreak3.textContent = '-----------------'
                tooltiplist.appendChild(tempBreak3)

                if (HullIndex <= penIndex && HullIndex != -1){
                    const option = document.createElement('p')
                    option.textContent = 'Hull Pen: Yes'
                    option.style.color = "green"
                    tooltiplist.appendChild(option)
                } else {
                    const option = document.createElement('p')
                    option.textContent = 'Hull Pen: No'
                    option.style.color = "red"
                    tooltiplist.appendChild(option)
                }
                if (uniqueNames.includes('30mm_Tracks')){
                    if (Track1Index <= penIndex && Track1Index != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Track Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else {
                        const option = document.createElement('p')
                        option.textContent = 'Track Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                    if (Track2Index <= penIndex && Track2Index != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Both Track Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else if (Track2Index != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Both Track Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                }
                if (uniqueNames.includes('AmmoRack')){
                    if (AmmoIndex <= penIndex && AmmoIndex != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Ammo Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else {
                        const option = document.createElement('p')
                        option.textContent = 'Ammo Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                }
                if (EngineIndex <= penIndex && EngineIndex != -1){
                    const option = document.createElement('p')
                    option.textContent = 'Engine Pen: Yes'
                    option.style.color = "green"
                    tooltiplist.appendChild(option)
                } else {
                    const option = document.createElement('p')
                    option.textContent = 'Engine Pen: No'
                    option.style.color = "red"
                    tooltiplist.appendChild(option)
                }
                if (uniqueNames.includes('Heli_Tail')){
                    if (TailIndex <= penIndex && TailIndex != -1){
                        const option = document.createElement('p')
                        option.textContent = 'Tail Pen: Yes'
                        option.style.color = "green"
                        tooltiplist.appendChild(option)
                    } else {
                        const option = document.createElement('p')
                        option.textContent = 'Tail Pen: No'
                        option.style.color = "red"
                        tooltiplist.appendChild(option)
                    }
                }

                const tempBreak = document.createElement('p')
                tempBreak.textContent = '-----------------'
                tooltiplist.appendChild(tempBreak)

                const option2 = document.createElement('p')
                if (PenReq[HullIndex] == undefined){
                    option2.textContent = 'Hull Thickness: -'
                } else {
                    option2.textContent = 'Hull Thickness: ' + PenReq[HullIndex]
                }
                tooltiplist.appendChild(option2)

                const option = document.createElement('p')
                option.textContent = 'Total Thickness: ' + PenReq[PenReq.length-1]
                tooltiplist.appendChild(option)
                
                const tempBreak2 = document.createElement('p')
                tempBreak2.textContent = '-----------------'
                tooltiplist.appendChild(tempBreak2)
            }
        }

        if (intersects.length > 0) {
            tooltip.style.display = 'flex'
            tooltip.style.left = event.pageX + 'px'
            tooltip.style.top = event.pageY + 'px'
        } else tooltip.style.display = 'none'
    },
    false
)

const damageStates = document.getElementById('damageStats')
let resizeObserver = new ResizeObserver(() => {
    document.getElementById('viewer').style.setProperty('height', ((window.innerHeight - document.getElementById('slidecontainer').clientHeight - document.getElementById('nav').clientHeight)-100) + "px")
})
resizeObserver.observe(damageStates)