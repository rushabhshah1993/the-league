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