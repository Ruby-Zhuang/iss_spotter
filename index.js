// TEMP CODE FOR FETCHMYIP
// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// TEMP CODE FOR FETCHCOORDSBYIP
// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('136.143.217.38', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// TEMP CODE FOR FETCHCISSFLYOVERTIMES
// const { fetchISSFlyOverTimes } = require('./iss');

// const exampleCoords = { latitude: 43.6611, longitude: -79.3298 };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times: ', passTimes);
// });

// REQUIRES
const { nextISSTimesForMyLocation } = require('./iss');
const { printPassTimes } = require('./printPassTimes');


// CALL NEXTISSTIMESFORMYLOCATION
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});