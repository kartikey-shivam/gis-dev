import { Popup } from "maplibre-gl";
import { useRef } from "react";
import { useEffect } from "react";

function MapPopup({map, lngLat, bottomPanelVisible, openBottomPanel}) {
    const popupContentRef = useRef();

    const longitude = lngLat.lng.toFixed(3);
    const latitude = lngLat.lat.toFixed(3);
    

    useEffect(() => {
        const popup = new Popup({})
        .setLngLat(lngLat)
        .setDOMContent(popupContentRef.current)
        .addTo(map);
        //console.log('popup added');

        return () => {
            //console.log('effect cleanup');
            popup.remove();
        };
        
    }, [lngLat]);


    return (
        <div style={{display: "none"}}  >
            <div ref={popupContentRef} className="popup-content-div " >
                <p>Latitude: {latitude}</p>
               <p> Longitude: {longitude}</p>
                {!bottomPanelVisible && <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={openBottomPanel}>Additional Info</button>}
            </div>
        </div>
    )
}

export default MapPopup;