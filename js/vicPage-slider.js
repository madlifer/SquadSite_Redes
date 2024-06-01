import { weaponData } from '../data/weaponData';
import { PageName } from '../js/vicPage';

const slidecontainer = document.getElementById('slidecontainer');
const slider = document.getElementById('mySlider');
const distance = document.getElementById('distance');
export const maxPen = document.getElementById('maxPen');
export const damage = document.getElementById('damage');
export const damageType = document.getElementById('damageType');

for (const i in weaponData.inf_AT) {
    const option = document.createElement('option');
    option.textContent = i;
    option.title = weaponData.inf_AT[i].Title;
    document.getElementById('Inf_AT').appendChild(option);
}
for (const i in weaponData.Other) {
    const option = document.createElement('option');
    option.textContent = i;
    option.title = weaponData.Other[i].Title;
    document.getElementById('Other_AT').appendChild(option);
}

slidecontainer.addEventListener('input', () => {
    var penIndex = 0;
    slider.removeAttribute('disabled');
    var selectedWeapon = document.querySelector('#weaponSelect option:checked');
    if (selectedWeapon.parentElement.label == 'Infantry AT') {
        maxPen.innerText =
            weaponData.inf_AT[selectedWeapon.innerText].Pen[0] + 'mm';
        damage.innerText =
            weaponData.inf_AT[selectedWeapon.innerText].BaseDamage +
            ' + ' +
            weaponData.inf_AT[selectedWeapon.innerText].ExplosiveDamage;
        damageType.innerText =
            weaponData.inf_AT[selectedWeapon.innerText].Damage_Type;
        if (weaponData.inf_AT[selectedWeapon.innerText].Pen[1] == undefined) {
            slider.setAttribute('disabled', true);
        }
        penIndex = slider.value / 50;
        slider.setAttribute(
            'max',
            (weaponData.inf_AT[selectedWeapon.innerText].Pen.length - 1) * 50
        );
    }
    if (selectedWeapon.parentElement.label == 'Other AT') {
        maxPen.innerText =
            weaponData.Other[selectedWeapon.innerText].Pen[0] + 'mm';

        damageType.innerText =
            weaponData.Other[selectedWeapon.innerText].Damage_Type;
        if (weaponData.Other[selectedWeapon.innerText].Pen[1] == undefined) {
            slider.setAttribute('disabled', true);
        }
        slider.setAttribute(
            'max',
            (weaponData.Other[selectedWeapon.innerText].Pen.length - 1) * 50
        );
        var penIndex = slider.value / 50;
        maxPen.innerText =
            weaponData.Other[selectedWeapon.innerText].Pen[penIndex] + 'mm';

        if (
            weaponData.Other[selectedWeapon.innerText].Damage_Curve != undefined
        ) {
            var currDamage = '-';
            var x1 =
                weaponData.Other[selectedWeapon.innerText].Damage_Curve[0][0] /
                100;
            var y1 =
                weaponData.Other[selectedWeapon.innerText].Damage_Curve[0][1];
            var x2 =
                weaponData.Other[selectedWeapon.innerText].Damage_Curve[1][0] /
                100;
            var y2 =
                weaponData.Other[selectedWeapon.innerText].Damage_Curve[1][1];
            var m = (y2 - y1) / (x2 - x1);
            var c = (x2 * y1 - x1 * y2) / (x2 - x1);
            if (slider.value < x1) {
                currDamage = y1;
            } else if (slider.value > x2) {
                currDamage = y2;
            } else {
                currDamage = Math.round((m * slider.value + c) * 100) / 100;
            }
            damage.innerText =
                currDamage +
                ' + ' +
                weaponData.Other[selectedWeapon.innerText].ExplosiveDamage;
        } else {
            damage.innerText =
                weaponData.Other[selectedWeapon.innerText].BaseDamage +
                ' + ' +
                weaponData.Other[selectedWeapon.innerText].ExplosiveDamage;
        }
    }
    if (slider.value == slider.max) {
        distance.innerText = slider.value + 'm+';
    } else {
        distance.innerText = slider.value + 'm';
    }
});

export let maxPen2;
export let damage2;
export let damageType2;

if (PageName.length == 2) {
    const slidecontainer2 = document.getElementById('slidecontainer2');
    const slider2 = document.getElementById('mySlider2');
    const distance2 = document.getElementById('distance2');
    maxPen2 = document.getElementById('maxPen2');
    damage2 = document.getElementById('damage2');
    damageType2 = document.getElementById('damageType2');

    for (const i in weaponData.inf_AT) {
        const option = document.createElement('option');
        option.textContent = i;
        option.title = weaponData.inf_AT[i].Title;
        document.getElementById('Inf_AT2').appendChild(option);
    }
    for (const i in weaponData.Other) {
        const option = document.createElement('option');
        option.textContent = i;
        option.title = weaponData.Other[i].Title;
        document.getElementById('Other_AT2').appendChild(option);
    }

    slidecontainer2.addEventListener('input', () => {
        var penIndex = 0;
        slider2.removeAttribute('disabled');
        var selectedWeapon = document.querySelector(
            '#weaponSelect2 option:checked'
        );
        if (selectedWeapon.parentElement.label == 'Infantry AT') {
            maxPen2.innerText =
                weaponData.inf_AT[selectedWeapon.innerText].Pen[0] + 'mm';
            damage2.innerText =
                weaponData.inf_AT[selectedWeapon.innerText].BaseDamage +
                ' + ' +
                weaponData.inf_AT[selectedWeapon.innerText].ExplosiveDamage;
            damageType2.innerText =
                weaponData.inf_AT[selectedWeapon.innerText].Damage_Type;
            if (
                weaponData.inf_AT[selectedWeapon.innerText].Pen[1] == undefined
            ) {
                slider2.setAttribute('disabled', true);
            }
            penIndex = slider2.value / 50;
            slider2.setAttribute(
                'max',
                (weaponData.inf_AT[selectedWeapon.innerText].Pen.length - 1) *
                    50
            );
        }
        if (selectedWeapon.parentElement.label == 'Other AT') {
            maxPen2.innerText =
                weaponData.Other[selectedWeapon.innerText].Pen[0] + 'mm';

            damageType2.innerText =
                weaponData.Other[selectedWeapon.innerText].Damage_Type;
            if (
                weaponData.Other[selectedWeapon.innerText].Pen[1] == undefined
            ) {
                slider2.setAttribute('disabled', true);
            }
            slider2.setAttribute(
                'max',
                (weaponData.Other[selectedWeapon.innerText].Pen.length - 1) * 50
            );
            var penIndex = slider2.value / 50;
            maxPen2.innerText =
                weaponData.Other[selectedWeapon.innerText].Pen[penIndex] + 'mm';

            if (
                weaponData.Other[selectedWeapon.innerText].Damage_Curve !=
                undefined
            ) {
                var currDamage = '-';
                var x1 =
                    weaponData.Other[selectedWeapon.innerText]
                        .Damage_Curve[0][0] / 100;
                var y1 =
                    weaponData.Other[selectedWeapon.innerText]
                        .Damage_Curve[0][1];
                var x2 =
                    weaponData.Other[selectedWeapon.innerText]
                        .Damage_Curve[1][0] / 100;
                var y2 =
                    weaponData.Other[selectedWeapon.innerText]
                        .Damage_Curve[1][1];
                var m = (y2 - y1) / (x2 - x1);
                var c = (x2 * y1 - x1 * y2) / (x2 - x1);
                if (slider2.value < x1) {
                    currDamage = y1;
                } else if (slider2.value > x2) {
                    currDamage = y2;
                } else {
                    currDamage =
                        Math.round((m * slider2.value + c) * 100) / 100;
                }
                damage2.innerText =
                    currDamage +
                    ' + ' +
                    weaponData.Other[selectedWeapon.innerText].ExplosiveDamage;
            } else {
                damage2.innerText =
                    weaponData.Other[selectedWeapon.innerText].BaseDamage +
                    ' + ' +
                    weaponData.Other[selectedWeapon.innerText].ExplosiveDamage;
            }
        }
        if (slider2.value == slider2.max) {
            distance2.innerText = slider2.value + 'm+';
        } else {
            distance2.innerText = slider2.value + 'm';
        }
    });
}
