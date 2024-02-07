import { SERVER_BASE_URL } from '../constants.js';

//query server for raster value from COG for given lat and long
export async function getDataFromTiff(imageName, latitude, longitude) {
    const requestBody = {
        filename: imageName,
        latitude: latitude,
        longitude: longitude
    }

    const data = await fetch(`${SERVER_BASE_URL}/data-from-tiff`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())

    return data['data'];
}

//get bounding box of COG. Used to determine where to place the image on the map.
export async function getTiffBbox(imageName) {
    const requestBody = {
        filename: imageName
    }

    const data = await fetch(`${SERVER_BASE_URL}/bbox-tiff`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())

    return data['data'];
}

export async function getNearestPort(longitude, latitude) {
    const requestBody = {
        'longitude': longitude,
        'latitude': latitude
    }

    const data = await fetch(`${SERVER_BASE_URL}/nearest-port`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json());

    const dataString = `${data['name']} (${data['distanceToPort']} km)`;
    return dataString;
}