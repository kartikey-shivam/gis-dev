import { WindLayer } from '@sakitam-gis/mapbox-wind';

import { S3_DATA_BASE_URL as DATA_BASE_URL, S3_BASEMAPS_BASE_URL as BASEMAPS_BASE_URL } from '../constants.js';

//this is passed to the map. It contains only sources and icons, layers will be added after map has been loaded.
export let mapStyle = {
    version: 8,
    sources: {
        "osm": {
            "type": "raster",
            "tiles": ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            "tileSize": 256,
            "maxzoom": 19
        },

        "gebco": {
            "type": "raster",
            "tiles": ["https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getmap&service=wms&BBOX={bbox-epsg-3857}&crs=EPSG:3857&format=image/jpeg&layers=gebco_latest_sub_ice_topo&width=256&height=256&version=1.3.0"],
            "tileSize": 256
        },

        "coral-reef-source": {
            "type": "vector",
            "url": `pmtiles://${BASEMAPS_BASE_URL}/gis-data/coral.pmtiles`
        },

        "potential-sites-source": {
            "type": "geojson",
            "data": `${DATA_BASE_URL}/gis-data/potential_seaweed_sites.geojson`
        },

        "ssh-source": {
            'type': 'image',
            'url': `${DATA_BASE_URL}/gis-data/ss-height.png`,
            'coordinates': [
                [66.25, 24.92],
                [96.08, 24.92],
                [96.08, 4.7499],
                [66.25, 4.7499]
            ]
        },

        'ss-temperature-source': {
            'type': 'image',
            'url': `${DATA_BASE_URL}/gis-data/ss-temperature.png`,
            'coordinates': [
                [66.25, 24.92],
                [96.08, 24.92],
                [96.08, 4.7499],
                [66.25, 4.7499]
            ]
        },

        'ss-salinity-source': {
            'type': 'image',
            'url': `${DATA_BASE_URL}/gis-data/ss-salinity.png`,
            'coordinates': [
                [66.25, 24.92],
                [96.08, 24.92],
                [96.08, 4.7499],
                [66.25, 4.7499]
            ]
        }
    },

    layers: [],

    sprite: `${DATA_BASE_URL}/gis-data/potential_sites_marker`
}

//contains the basemaps
export let mapBaseLayers = [
    // {
    //     id: 'background-layer',
    //     type: 'background',
    //     paint: {
    //         'background-color': '#bbbbbb'
    //     }
    // },

    {
        "source": "osm",
        "id": "osm-layer",
        "type": "raster",
        "displayName": "OSM Base Map"
    },

    {
        "source": "gebco",
        "id": "gebco-layer",
        "type": "raster",
        "displayName": "Gebco Base Map"
    },
]

//contains all overlays where coordinates are fixed
export let mapOverlays = [
    {
        "source": "coral-reef-source",
        "id": "coral-reef-layer",
        "source-layer": "sample_coral_reeflayer",
        "type": "fill",
        "paint": {
            "fill-color": "red",
            "fill-opacity": 0.6
        },
        "displayName": "Coral Reefs"
    },

    {
        'source': 'potential-sites-source',
        'id': 'potential-sites-layer',
        'type': 'symbol',
        'layout': {
            'icon-image': 'potential_sites_marker'
        },
        'displayName': 'Potential Sites'
    },

    {
        'id': 'ports-layer',
        'type': 'symbol',
        'source': 'ports-source',
        'layout': {
            'icon-image': 'ports-marker'
        },
        'displayName': 'Ports'
    }
]

//image layers. Here coordinates are not fixed and have to be queried before placing the image on the map.
export let mapImageLayers = [
    {
        'source': 'ssh-source',
        'id': 'ssh-layer',
        'type': 'raster',
        'displayName': 'Sea Swell Height'
    },

    {
        'id': 'fai-layer',
        'source': 'fai-source',
        'type': 'raster',
        'displayName': 'Floating Algae Index'
    },

    {
        'id': 'ss-temperature-layer',
        'source': 'ss-temperature-source',
        'type': 'raster',
        'displayName': 'Sea Surface Temperature'
    },

    {
        'id': 'ss-salinity-layer',
        'source': 'ss-salinity-source',
        'type': 'raster',
        'displayName': 'Sea Surface Salinity'
    }
]

//function that creates a new instance of wind layer
export async function getWindLayer() {
    const data = await fetch(`${DATA_BASE_URL}/gis-data/gfs.json`).then(res => res.json())
    const windLayer = new WindLayer('wind', data, {
        windOptions: {
            frameRate: 16,
            maxAge: 45,
            globalAlpha: 0.8,
            velocityScale: 0.0025,
            paths: 3000,
            // colorScale: [
            //     "rgb(36,104, 180)",
            //     "rgb(60,157, 194)",
            //     "rgb(128,205,193 )",
            //     "rgb(151,218,168 )",
            //     "rgb(198,231,181)",
            //     "rgb(238,247,217)",
            //     "rgb(255,238,159)",
            //     "rgb(252,217,125)",
            //     "rgb(255,182,100)",
            //     "rgb(252,150,75)",
            //     "rgb(250,112,52)",
            //     "rgb(245,64,32)",
            //     "rgb(237,45,28)",
            //     "rgb(220,24,32)",
            //     "rgb(180,0,35)"
            // ]
        }
    });
    return windLayer;
}
