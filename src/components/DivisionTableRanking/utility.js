export const createTableData = (divisionData, fighters) => {
    let data = [];
    let pointsData = divisionData.points;
    for(let fighterId in pointsData) {
        let fighter = fighters[fighterId];
        if(fighter !== undefined) {
            let obj = {
                name: `${fighter.firstName} ${fighter.lastName}`,
                total: fighter.fights.total,
                win: fighter.fights.won,
                points: pointsData[fighterId],
                lastRoundGained: fighter.lastRoundGained,
                id: fighter.id
            };
            data.push(obj);
        }
    }
    // data
    //     .sort((a, b) => b.points - a.points)
    //     .sort((a, b) => b.total - a.total)
    //     .sort((a, b) => a.lastRoundGained - b.lastRoundGained);
    // console.log("Before:   ", data);
    data.sort((a, b) => {
        return b.total - a.total;
    }).sort((a, b) => {
        // console.log(a, b, isNaN(a.lastGained - b.lastGained));
        if(isNaN(a.lastRoundGained - b.lastRoundGained) && typeof a.lastRoundGained === 'string' && typeof b.lastRoundGained === 'number') return 1;
        else if(isNaN(a.lastRoundGained - b.lastRoundGained) && typeof a.lastRoundGained === 'number' && typeof b.lastRoundGained === 'string') return -1;
        else if(isNaN(a.lastRoundGained - b.lastRoundGained) && typeof a.lastRoundGained === 'string' && typeof b.lastRoundGained === 'string') return 0;
        else return a.lastRoundGained - b.lastRoundGained;
        // return a.lastGained - b.lastGained;
    }).sort((a, b) => {
        return b.points - a.points;
    });

    // console.log("Data:  ", data); 
    // console.log("After:   ", data);
    return data;
}


// https://jsfiddle.net/a9ocdexg/

// Final table: https://jsfiddle.net/sg0woen4/1/

// Final table points calculation code

const sortFighterPoints = (fighters, fightersData) => {
    let fightersRank = {};
    for(let index in fighters) {
        let restFighters = [...fighters];
        let fighterData = fightersData[fighters[index]].rounds;
        restFighters.splice(index, 1)
        let total = 0;
            
        for(let opponent of restFighters) {
            let roundNo = Object.keys(fighterData).find(round => fighterData[round].fighter === opponent);
            if(fighterData[roundNo].result === "win") total += 3;
        }
        // console.log(fighters[index], total);
        fightersRank[fighters[index]] = total;
    }
    let sortedRanks = Object.keys(fightersRank).sort((a, b) => {
        return fightersRank[b] - fightersRank[a];
    })
    // console.log("Sorted Ranks:   ", sortedRanks);
    return sortedRanks;
}
  
const finalTableRankings = list => {
    let arr = [];
    let byPoints = Object.keys(list).sort((a, b) => b - a).reduce((arrr, key) => {
        arrr = [...arrr, ...list[key]];
        return arrr;
    }, []);
    return byPoints;
}


export function sortDivisionByPoints(points, fightersData) {
    let fightersByPoints = {};
    for(let fighter in points) {
        let fighterPoints = points[fighter];
        if(Object.keys(fightersByPoints).length === 0) {
            let arr = [];
            arr.push(fighter);
            fightersByPoints[points[fighter]] = arr;
        } else if(fightersByPoints[fighterPoints] === undefined) {
            let arr = [];
            arr.push(fighter);
            fightersByPoints[fighterPoints] = arr;
        } else {
            fightersByPoints[fighterPoints].push(fighter);
        }
    }
    
    let sorted_fightersByPoints = {};
    for(let points in fightersByPoints) {
        if(fightersByPoints[points].length > 1) {
            let sortedFighters = sortFighterPoints(fightersByPoints[points], fightersData);
            sorted_fightersByPoints[points] = sortedFighters;
        } else {
            sorted_fightersByPoints[points] = fightersByPoints[points];
        }
    }
    
    let ultimateRankings = finalTableRankings(sorted_fightersByPoints);
	// console.log(ultimateRankings);
    return fullTable(ultimateRankings, fightersData);
}

function fullTable(ranks, fightersData) {
	let arr = [];
	let fullFighterTable = ranks.map(fighter => fightersData[fighter]);
    // console.log(fullFighterTable);
    return fullFighterTable;
}

export const fetchFinalRankTable = (fighters, ranksList, pointsData) => {
    let finalList = [];
    for(let fighterObj of ranksList) {
        let fighter = fighters[fighterObj.id];

        if(fighter !== undefined) {
            let obj = {
                name: `${fighter.firstName} ${fighter.lastName}`,
                total: fighter.fights.total,
                win: fighter.fights.won,
                points: pointsData[fighterObj.id],
                lastRoundGained: fighter.lastRoundGained,
                id: fighter.id
            };
            finalList.push(obj);
        }
    }
    return finalList;
}
