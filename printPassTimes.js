/**
 * Input:
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const date = new Date(pass.risetime * 1000);
    const duration = pass.duration;
    // const datetime = new Date(0);
    //datetime.setUTCSeconds(pass.risetime);
    
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

module.exports = { printPassTimes };