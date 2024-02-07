import { useEffect } from "react";
import { useState } from "react";
import { getDataFromTiff, getNearestPort } from "../helpers/dataFetcher";
import { Fragment } from "react";


let initialState = {
    'Sea Floor Depth': null,
    'Wind': null,
    'Sea Surface Height': null,
    'Sea Surface Temperature': null,
    'Sea Surface Salinity': null,
    'Wave Velocity': null,
    'Potential Site': null,
    'Nearest Port': null,
    'Port': null
}

let units = {
    'Sea Floor Depth': 'm',
    'Wind': 'm/s',
    'Sea Surface Height': 'm',
    'Sea Surface Temperature': 'C',
    'Sea Surface Salinity': 'ppm',
    'Wave Velocity': 'm/s',
    'Potential Site': null,
    'Nearest Port': null,
    'Port': null
}

function BottomPanel({ lngLat, clickPoint, onClose, map }) {

    const [allValues, setAllValues] = useState(initialState);

    const longitude = lngLat.lng.toFixed(3);
    const latitude = lngLat.lat.toFixed(3);

    const closeButton = (
        <button
            className="mouse-pointer close-btn close-btn-bottompanel"
            onClick={onClose}
        >
            <span className="close-symbol">+</span>
        </button>
    )

    const valsToDisplay = (allValues) => {
        let values = Object.getOwnPropertyNames(allValues);
        values = values.filter(key => allValues[key])
    }

    useEffect(() => {

        (async () => {
            const newState = { ...initialState };
            const features = map.queryRenderedFeatures(clickPoint);

            features.map((feature) => {
                if (feature.source == 'potential-sites-source') {
                    newState['Potential Site'] = `${feature.properties.Name}, ${feature.properties.Area}`;
                }

                if (feature.source == 'ports-source') {
                    newState['Port'] = `${feature.properties.Name}, ${feature.properties['District ']}`;
                } 
            });

            newState['Wind'] = window.windLayer.wind.field.valueAt(longitude, latitude).m.toFixed(2);

            newState['Sea Surface Height'] = await getDataFromTiff("ss-height.tiff", lngLat.lat, lngLat.lng);
            newState['Sea Surface Salinity'] = await getDataFromTiff("ss-salinity.tiff", lngLat.lat, lngLat.lng);
            newState['Sea Surface Temperature'] = await getDataFromTiff("ss-temperature.tiff", lngLat.lat, lngLat.lng);
            newState['Wave Velocity'] = await getDataFromTiff("sw-velocity.tiff", lngLat.lat, lngLat.lng);

            if (!newState['Port']) {
                newState['Nearest Port'] = await getNearestPort(longitude, latitude);
            }

            let bathyData = await getDataFromTiff('bathymetry.tif', lngLat.lat, lngLat.lng);
            bathyData = parseFloat(bathyData);
            if (bathyData <= 0) newState['Sea Floor Depth'] = Math.abs(bathyData);

            console.log(newState);
            setAllValues(newState);
        })();

    }, [lngLat])


    return (
        <div className="bottom-panel-wrapper w-96">
            <div className="bottom-panel-heading">
            <h5 style={{textAlign: 'center'}}>{`${longitude}, ${latitude}`}</h5>
                {closeButton}
            </div>
            <div className="map-bottom-panel-content">
                {
                    Object.getOwnPropertyNames(allValues)
                    .filter((key) => allValues[key])
                    .map((key, idx) => {
                        return (
                        <Fragment key={idx}>
                            <BottomPanelSection heading={key} value={allValues[key]} unit={units[key]} />
                            <div className="vertical-divider"></div>
                        </Fragment>
                    )
                    })
                }
            </div>
        </div>
    )
}



function BottomPanelSection({ heading, value, unit }) {
    return (
        <div className="bottom-panel-section">
            <h5 style={{ textDecoration: 'underline', textAlign: 'center' }}>{heading}</h5>
            <div style={{ textAlign: 'center', fontSize: '0.83em' }}>{value + (unit ? unit : '')}</div>
        </div>
    )
}

export default BottomPanel;
