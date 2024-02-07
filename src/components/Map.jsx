import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react';
import DrawerAppBar from '../components/DrawerAppBar.jsx'
import { mapBaseLayers, mapOverlays,  mapStyle, mapImageLayers, getWindLayer } from './map-style';
import LayerControl from './LayerControl';
import { useReducer } from 'react';
import BottomPanel from './BottomPanel';
import { useState } from 'react';
import MapPopup from './Popup';
import { getTiffBbox } from '../helpers/dataFetcher';
import { InfoModal, InfoButton } from './InfoModal';
import GeoLocate from './GeoLocate';
import { S3_DATA_BASE_URL as DATA_BASE_URL } from '../constants.js';


const MAP_BOUNDS = [
    [58.141, -4.195],
    [97.467, 36.530]
]

//Initial state: Has one base layer checked, all overlays checked and Wind layer is true (visible)
let initialState = {};
initialState.baseLayer = "osm-layer";

initialState.overlays = mapOverlays.reduce((accumulator, layer) => {
    if (layer.displayName) {
        accumulator.push({ id: layer.id, isVisible: true, displayName: layer.displayName });
    }

    return accumulator;
}, []);

initialState.windLayer = true;
initialState.imageLayer = "none"


//Reducer Function to manage state related to layer control component
const reducer = (state, action) => {
    switch (action.type) {
        case 'baseLayer': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.baseLayer = action.baseLayer;
            return newState;
        }

        case 'overlay': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.overlays.find((layer) => layer.id == action.layerId).isVisible = action.visibility;
            return newState;
        }

        case 'windLayer': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.windLayer = action.visibility;
            return newState;
        }

        case 'imageLayer': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.imageLayer = action.imageLayer;
            return newState;
        }

        default:
            return state;
    }
}


//Map Component
function Map() {
    const [map, setMap] = useState(null);
    const mapContainerRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [popupLngLat, setPopupLngLat] = useState(null);
    const [clickPoint, setClickPoint] = useState(null);
    const [bottomPanelVisible, setBottomPanelVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [geoLocateControl, setGeoLocateControl] = useState(null);

    useEffect(() => {
        let protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);

        const newMap = new maplibregl.Map({
            container: mapContainerRef.current,
            zoom: 5,
            maxZoom: 14,
            center: [75.5, 19.5],
            maxBounds: MAP_BOUNDS,
            style: mapStyle
        });

        newMap.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        const geoLocateControl = new maplibregl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }
        });

        newMap.addControl(geoLocateControl);
        setGeoLocateControl(geoLocateControl);

        newMap.on('load', () => {
            for (let layer of mapBaseLayers) {
                if (layer.displayName) newMap.addLayer(layer);
                if (layer.id !== initialState.baseLayer) newMap.setLayoutProperty(layer.id, "visibility", "none");
            }

            // for (let layer of mapOverlays) newMap.addLayer(layer);

            getWindLayer().then(layer => {
                window.windLayer = layer;
                layer.addTo(newMap)
            });

            console.log('map loaded');

            newMap.loadImage(`${DATA_BASE_URL}/gis-data/ports_marker.png`,
            (error, image) => {
                if (error) throw error;
                newMap.addImage('ports-marker', image);
                
                newMap.addSource('ports-source', {
                    'type': 'geojson',
                    'data': {
                        "type":"FeatureCollection","features":[{"type":"Feature","properties":{"Name":"Kertania ","District ":"Baleswar"},"geometry":{"type":"Point","coordinates":[87.3756,21.5727]}},{"type":"Feature","properties":{"Name":"Bahabalpur ","District ":"Baleswar"},"geometry":{"type":"Point","coordinates":[87.108,21.5148]}},{"type":"Feature","properties":{"Name":"Chandipur ","District ":"Baleswar"},"geometry":{"type":"Point","coordinates":[87.0163,21.4394]}},{"type":"Feature","properties":{"Name":"Balramgadi","District ":"Baleswar"},"geometry":{"type":"Point","coordinates":[87.0438,21.4658]}},{"type":"Feature","properties":{"Name":"Dhamra","District ":"Bhadrak"},"geometry":{"type":"Point","coordinates":[86.964,20.8237]}},{"type":"Feature","properties":{"Name":"Paradip ","District ":"Jagatingpur"},"geometry":{"type":"Point","coordinates":[86.6113,20.31655]}},{"type":"Feature","properties":{"Name":"Astaranga","District ":"Puri"},"geometry":{"type":"Point","coordinates":[86.2856,19.9319]}},{"type":"Feature","properties":{"Name":"Gopalpur","District ":"Ganjam"},"geometry":{"type":"Point","coordinates":[84.9655,19.3039]}},{"type":"Feature","properties":{"Name":"Vishakapatnam","District ":"Vishakapatnam"},"geometry":{"type":"Point","coordinates":[83.278611,17.69833]}},{"type":"Feature","properties":{"Name":"Gangavaram","District ":"Vishakapatnam"},"geometry":{"type":"Point","coordinates":[83.2298,17.6215]}},{"type":"Feature","properties":{"Name":"Kakinada Anchorage","District ":"Kakinada"},"geometry":{"type":"Point","coordinates":[82.249266,16.940015]}},{"type":"Feature","properties":{"Name":"Deep water","District ":"Kakinada"},"geometry":{"type":"Point","coordinates":[82.27503,16.969776]}},{"type":"Feature","properties":{"Name":"SEZ ","District ":"Kakinada"},"geometry":{"type":"Point","coordinates":[82.261212,16.946459]}},{"type":"Feature","properties":{"Name":"Vadarevu ","District ":"Prakasam "},"geometry":{"type":"Point","coordinates":[79.7401,15.9129]}},{"type":"Feature","properties":{"Name":"Machilipatnam","District ":"Krishna"},"geometry":{"type":"Point","coordinates":[81.18673,16.1435]}},{"type":"Feature","properties":{"Name":"Krishnapatnam","District ":"Nellore"},"geometry":{"type":"Point","coordinates":[80.1094,14.2546]}},{"type":"Feature","properties":{"Name":"Kalingapatnam ","District ":"Srikakulam"},"geometry":{"type":"Point","coordinates":[84.1287,18.3307]}}]
                    }
                });

                for (let layer of mapOverlays) newMap.addLayer(layer);
            })

            //add fai image source based on it's bounding box
            getTiffBbox(`floating-algae-index.tiff`)
                .then((bbox) => {
                    newMap.addSource('fai-source', {
                        'type': 'image',
                        'url': `${DATA_BASE_URL}/gis-data/floating-algae-index.png`,
                        'coordinates': [
                            [parseFloat(bbox[0]), parseFloat(bbox[3])],
                            [parseFloat(bbox[2]), parseFloat(bbox[3])],
                            [parseFloat(bbox[2]), parseFloat(bbox[1])],
                            [parseFloat(bbox[0]), parseFloat(bbox[1])]
                        ]
                    });

                    for (let layer of mapImageLayers) {
                        newMap.addLayer(layer);
                        newMap.setLayoutProperty(layer.id, 'visibility', 'none');
                    }
                })
        });

        newMap.on('click', (e) => {
            setPopupLngLat(e.lngLat);
            setClickPoint(e.point);
        });

        setMap(newMap);

        //cleanup function. without this, multiple maps will be created one on top of the other.
        return () => newMap.remove();
    }, []);


    const handleBaseLayerChange = (id) => {
        map.setLayoutProperty(state.baseLayer, "visibility", "none");
        map.setLayoutProperty(id, "visibility", "visible")
        dispatch({ type: 'baseLayer', baseLayer: id})
    }

    const handleOverlayClick = (id, display) => {
        const value = display ? "visible" : "none";
        map.setLayoutProperty(id, "visibility", value);
        const visibilityValue = (value == "visible");
        dispatch({ type: 'overlay', layerId: id, visibility: visibilityValue });
    }

    const handleWindLayerClick = (display) => {
        if (!display) {
            window.windLayer.stop();
            window.windLayer.unregisterEvents();
        } else {
            window.windLayer.render();
            window.windLayer.registerEvents();
        }
        dispatch({ type: 'windLayer', visibility: display });
    }


    const handleImageLayerChange = (id) => {
        if (state.imageLayer != 'none') {
            map.setLayoutProperty(state.imageLayer, 'visibility', "none");
        }

        if (id != 'none') {
            map.setLayoutProperty(id, 'visibility', "visible");
            const source = map.getSource(map.getLayer(id).source);
        }

        if (id == 'fai-layer') {
            const coords = map.getSource('fai-source').coordinates;
            map.flyTo({ center: coords[0], zoom: 10 });     //automatically position map to the layer
        }

        dispatch({ type: 'imageLayer', imageLayer: id });
    };


    const onPopupClose = () => {
        setPopupLngLat(null);
    }

    const openBottomPanel = () => setBottomPanelVisible(true);
    const closeBottomPanel = () => setBottomPanelVisible(false);
    const handleGeoLocate = () => geoLocateControl.trigger()

    return (
        <DrawerAppBar >
             <div>
            {popupLngLat && (
                <MapPopup  map={map} lngLat={popupLngLat} onClose={onPopupClose} bottomPanelVisible={bottomPanelVisible} openBottomPanel={openBottomPanel} />
            )}

            <div id='map-container' className='map' ref={mapContainerRef}></div>

            <LayerControl
                baseLayers={mapBaseLayers}
                overlays = {state.overlays}
                windVisible={state.windLayer}
                imageLayers={mapImageLayers}
                onBaseLayerChange={handleBaseLayerChange}
                onOverlayClick={handleOverlayClick}
                onWindLayerClick={handleWindLayerClick}
                onImageLayerChange={handleImageLayerChange}
                currentBaseLayer={state.baseLayer}
                currentImageLayer={state.imageLayer} />

            {bottomPanelVisible && (
                <BottomPanel
                    lngLat={popupLngLat}
                    onClose={closeBottomPanel}
                    map={map}
                    clickPoint={clickPoint} /> 
            )}
        
            <InfoButton onToggleModal={() => setInfoVisible(a => !a)} />
            <GeoLocate handleClick={handleGeoLocate} />
            <InfoModal isVisible={infoVisible} onToggleModal={() => setInfoVisible(a => !a)} />
        </div>
    </DrawerAppBar>
       
    );
}

export default Map;