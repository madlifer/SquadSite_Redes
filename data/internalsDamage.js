export var absorbed = {
    "03mm": 30,
    "05mm": 50,
    "07mm": 70,
    "09mm": 90,
    "10mm": 100,
    "10mm_Layer": 40,
    "15mm": 110,
    "20mm": 150,
    "20mm_Layer": 300,
    "30mm": 200,
    "35mm": 200,
    "40mm": 250,
    "50mm": 150,
    "80mm": 200,
    "80mm_Layer": 300,
    "90mm": 150,
    "100mm": 200,
    "100mm_Layer": 300,
    "200mm": 400,
    "250mm": 400,
    "300mm": 300,
    "500mm": 300,
    "600mm": 400,
    "700mm": 600,
    "Engine": 1000,
    "Tail": 1000,
    "Ammo": 1000
}

export var engine = {
    "Engine_HP": 600,
    "Heli_Engine": {
        "Engine_HP": "1200",
        "Kinetic_Dmg": "0.6",
        "HEAT_Dmg": "2",
        "HAT_Dmg": "3",
        "Fragmentation_Dmg": "1",
    },
    "Heli_Tail": {
        "Tail_HP": "400",
        "Kinetic_Dmg": "0.4",
        "HEAT_Dmg": "2",
        "HAT_Dmg": "2",
        "Fragmentation_Dmg": "1",
    }
}

export var track1 = {
    "Track_HP": "600",
    "Kinetic_Dmg": "0.1",
    "HEAT_Dmg": "1",
    "HAT_Dmg": "1",
    "Explosive_Dmg": "1.25",
}

export var AmmoRack = {
    "Ammo_UltraLight": {
        "Ammo_HP": "2000",
        "Kinetic_Dmg": "1.5",
        "HEAT_Dmg": "1.6",
        "HAT_Dmg": "1.7",
        "Explosive_Dmg": "0",
    },
    "Ammo_Light": {
        "Ammo_HP": "2000",
        "Kinetic_Dmg": "1",
        "HEAT_Dmg": "1.6",
        "HAT_Dmg": "1.7",
        "Explosive_Dmg": "0",
    },
    "Ammo_Med": {
        "Ammo_HP": "2000",
        "Kinetic_Dmg": "0.6",
        "HEAT_Dmg": "1.6",
        "HAT_Dmg": "1.7",
        "Explpsive_Dmg": "0",
    },
    "Ammo_Heavy": {
        "Ammo_HP": "2000",
        "Kinetic_Dmg": "0.6",
        "HEAT_Dmg": "1.6",
        "HAT_Dmg": "1.6",
        "Explosive_Dmg": "0",
    },
    "Ammo_Tank": {
        "Ammo_HP": "2000",
        "Kinetic_Dmg": "0.15",
        "HEAT_Dmg": "0.8",
        "HAT_Dmg": "1.7",
        "Explosive_Dmg": "0",
    }
}

export var drone = {
    "Large": {
        "Thickness": "10mm",
        "Main_HP": "1000"
    },
    "Small": {
        "Thickness": "0mm",
        "Main_HP": "300"
    }
}