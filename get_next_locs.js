const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('F:/Fallout/_fo4_locations_ranked.json', 'utf8')); 

const skipList = [
    'Nick Valentine','Robert MacCready','Piper Wright','Codsworth','John Hancock',
    'Preston Garvey','Fallout 4 settlement objects','Diamond City Radio','Boston',
    'The Commonwealth','Capital Wasteland','Fallout 4 settlements','Sole Survivor',
    'East Coast','Shaun','Diamond City','The Prydwen','The Castle','Vault 81',
    'Quincy ruins','Mass Fusion building','Covenant','Dunwich Borers','Sanctuary Hills',
    'Bunker Hill', 'The Institute (location)','Goodneighbor','Glowing Sea',
    'Vault 111','Concord','Lexington','Corvega assembly plant','Red Rocket truck stop',
    'USS Constitution','Far Harbor (location)','Nuka-World (location)','Boston Airport',
    'Fort Strong','Vault 95','Jamaica Plain','University Point','The Nucleus',
    'Parsons State Insane Asylum','ArcJet Systems','Yangtze','Museum of Freedom', 
    'Cambridge Police Station', 'National Guard training yard', 'Spectacle Island', 
    'HalluciGen, Inc.', 'Vault 118', 'Boston Public Library', 'Sentinel site', 
    'Vim! Pop factory', 'Kiddie Kingdom','Vault 88','Vault 75', "The Mechanist's lair",
    'Saugus Ironworks','Combat Zone','Thicket Excavations','Faneuil Hall',
    'Shaw High School','West Everett Estates','Suffolk County charter school',
    'Old North Church', 'Trinity Tower', 'General Atomics Galleria', 'Cambridge Polymer Labs', 
    'Hardware Town', 'Easy City Downs', 'Pickman Gallery', 'Museum of Witchcraft', 
    'Cabot House', 'Salem',
    'D.B. Technical High School', 'Walden Pond', 'College Square', 'Beantown Brewery', 
    'Sandy Coves Convalescent Home', 'Mahkra Fishpacking', 'Federal ration stockpile', 
    'The Shamrock Taphouse', 'Wilson Atomatoys corporate HQ', 'Nahant Oceanological Society',
    'Cooking station (Fallout 4)', 'Chemistry station (Fallout 4)', 'Automated turret (Fallout 4)', 
    'Weapons workbench (Fallout 4)', 'Armor workbench (Fallout 4)', 'Safe (Fallout 4)',
    'Gunners plaza', 'Super Duper Mart (Fallout 4)', 'Boston mayoral shelter', 'Fallon\'s department store', 
    'Longneck Lukowski\'s Cannery', 'Greenetech Genetics', 'Massachusetts State House', 'Libertalia', 
    'Grandchester Mystery Mansion', 'Hubris Comics (Fallout 4)',
    'Fort Hagen', 'The Switchboard', 'Vault 114', 'Atom Cats garage', 'Big John\'s Salvage', 
    'Med-Tek Research', 'General Atomics factory', 'Kendall Hospital', 'C.I.T. ruins', 'BADTFL regional office',
    'Robotics disposal ground', 'Revere satellite array', 'Fens Street sewer', 'Weston water treatment plant', 
    'Vault-Tec Regional HQ', 'Fiddler\'s Green Trailer Estates', 'Medford Memorial Hospital', 'Coast Guard pier', 
    'Milton General Hospital', 'Hyde Park',
    'HalluciGen, Inc. (company)', 'East Boston Preparatory School', 'Boston Police rationing site', 
    'Mass Bay Medical Center', 'Federal Surveillance Center K-21B', 'South Boston military checkpoint', 
    'Poseidon Energy (Fallout 4)', 'Hub City Auto Wreckers', 'Wattz Consumer Electronics', 'Wilson Atomatoys factory',
    'USAF Satellite Station Olivia', 'Andrew station', 'Park Street station', 'Fraternal Post 115', 
    'Monsignor Plaza', 'West Roxbury station', 'Four Leaf fishpacking plant', 'Gwinnett brewery', 
    'Irish Pride Industries shipyard', 'Hester\'s Consumer Robotics',
    'Railroad HQ', 'Starlight Drive In (Fallout 4)', 'The Slog', 'Abernathy farm', 'Kingsport Lighthouse', 
    'Graygarden', 'Warwick homestead', 'WRVR broadcast station', 'Boston Common', 'Wreck of the FMS Northern Star',
    'Revere Beach station', 'Breakheart Banks', 'Forest Grove marsh', 'Croup Manor', 'Charles View Amphitheater', 
    'Wicked Shipping Fleet Lockup', 'Jalbert Brothers Disposal', 'Listening Post Bravo', 'Fairline Hill Estates', 
    'Chestnut Hillock Reservoir',
    'Greater Mass blood clinic', 'Lake Quannapowitt', 'Nordhagen Beach', 'Reeb Marina', 'Ticonderoga',
    'Bedford Station', 'Crater of Atom', 'Cutler Bend', 'Drumlin Diner', 'Hangman\'s Alley',
    'Malden Center', 'Milton parking garage', 'Hub 360', 'The Gwinnett Restaurant', 'Trinity Church', 
    'Lynn Woods', 'Boylston Club', 'Gorski cabin', 'Ranger cabin', 'Westing Estate',
    'Memory Den', 'The Third Rail', 'Tenpines Bluff', 'Finch farm', 'Murkwater construction site', 
    'Concord civic access', 'Old Gullet sinkhole', 'Mass Pike Interchange', 'Quincy quarries', 'Slocum\'s Joe Corporate HQ',
    'County crossing', 'Greentop Nursery', 'Egret Tours Marina', 'Somerville Place', 'Outpost Zimonja', 
    'Oberland station', 'Taffington boathouse', 'Coastal cottage', 'Power Noodles', 'Mega surgery center',
    'Nuka-Town USA', 'Fizztop Mountain', 'The Gauntlet (Nuka-World)', 'Galactic Zone', 'Safari Adventure', 
    'Dry Rock Gulch', 'World of Refreshment', 'Nuka-Galaxy', 'Nuka-Cade (Nuka-World)', 'Nuka-World power plant'
];

const filtered = data.filter(d => 
    !d.title.match(/characters|merchants|concept art|gameplay|test cell|images|songs/i) && 
    !skipList.includes(d.title)
); 

console.log(filtered.slice(0, 100).map(d => d.title).join('\n'));
