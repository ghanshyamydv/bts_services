function getDistance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const rad = (deg) => deg * Math.PI / 180;

    const theta = lon1 - lon2;

    // Apply spherical law of cosines (same as your PHP formula)
    let miles = Math.sin(rad(lat1)) * Math.sin(rad(lat2)) +
                Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(theta));

    miles = Math.acos(miles);
    miles = miles * (180 / Math.PI); // rad2deg
    miles = miles * 60 * 1.1515;

    const kilometers = miles * 1.609344;

    return kilometers;
}
export default getDistance;

// Example usage:
// console.log(getDistance(27.700769, 85.300140, 27.692261, 85.319176));
