// REQUIRE LIBRARY & MODULES
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  const endpoint = 'https://api.ipify.org?format=json';

  // MAKE GET REQUEST TO API END POINT TO FETCH IP ADDRESS FROM JSON API
  request(endpoint, (error, response, body) => {
    // ERRORS IN REQUEST
    if (error) {
      // If there's an error, error can be set if invalid domain, user is offline, etc.
      return callback('Request Failed! Invalid domain name', null);
    }
    if (response.statusCode !== 200) {
      // If request was successful (correct domain) but if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // IF REQUEST WAS SUCCESSFUL
    // Convert JSON string into actual object if request goes well
    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const endpoint = `https://freegeoip.app/json/${ip}`;

  // MAKE GET REQUEST TO API END POINT TO FETCH IP ADDRESS FROM JSON API
  request(endpoint, (error, response, body) => {
    // ERRORS IN REQUEST
    if (error) {
      // If there's an error, error can be set if invalid domain, user is offline, etc.
      return callback('Request Failed! Invalid domain name', null);
    }
    if (response.statusCode !== 200) {
      // If request was successful (correct domain) but if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // IF REQUEST WAS SUCCESSFUL
    // Convert JSON string into actual object if request goes well
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const endpoint = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  // MAKE GET REQUEST TO API END POINT TO FETCH IP ADDRESS FROM JSON API
  request(endpoint, (error, response, body) => {
    // ERRORS IN REQUEST
    if (error) {
      // If there's an error, error can be set if invalid domain, user is offline, etc.
      return callback('Request Failed! Invalid domain name', null);
    }
    if (response.statusCode !== 200) {
      // If request was successful (correct domain) but if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // IF REQUEST WAS SUCCESSFUL
    // Convert JSON string into actual object if request goes well
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 */
const nextISSTimesForMyLocation = function(callback) {
  // Get IP address
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    // If IP sucessfully successfully retrieved, get coordinates
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      // If coordinates successfully retrieved, get fly over times
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { nextISSTimesForMyLocation };