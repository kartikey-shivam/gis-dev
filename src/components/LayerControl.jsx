import { useState } from "react";
import { OverlayCheckbox, WindLayerCheckbox, Radio } from "./Checkbox";

function LayerControl({ baseLayers, overlays, windVisible, imageLayers, onBaseLayerChange, onOverlayClick, onWindLayerClick, onImageLayerChange, currentBaseLayer, currentImageLayer }) {
    const [open, setOpen] = useState(false);

    let baseLayerRadios = baseLayers
        .map((layer, idx) => {
            return <Radio
                key={layer.id}
                id={layer.id}
                radioName={"base-layer-radio"}
                isChecked={layer.id == currentBaseLayer}
                handleChange={onBaseLayerChange}
                displayName={layer.displayName}
            />
        })

    let overlayCheckboxes = overlays
        .map((layer, idx) => {
            return (
                <OverlayCheckbox
                    key={idx}
                    id={layer.id}
                    isChecked={layer.isVisible}
                    handleChange={onOverlayClick}
                    displayName={layer.displayName}
                />
            );
        });

    let imageLayerRadios = imageLayers
        .map((layer, idx) => {
            if (layer.id == currentImageLayer) console.log(layer.id + 'should be checked');
            return <Radio
                key={layer.id}
                id={layer.id}
                radioName={"image-layer-radio"}
                isChecked={layer.id == currentImageLayer}
                handleChange={onImageLayerChange}
                displayName={layer.displayName}
            />
        });

    imageLayerRadios.unshift(
        <Radio
            key='none'
            id='none'
            isChecked={currentImageLayer == 'none'}
            handleChange={onImageLayerChange}
            displayName='None'
        />
    );

    const content = (
        <div className="p-4" >
            {baseLayerRadios}
            <div className="layer-control-divider" />
            {overlayCheckboxes}
            <div className="layer-control-divider" />
            <WindLayerCheckbox
                isChecked={windVisible}
                handleChange={onWindLayerClick}
            />
            <div className="layer-control-divider" />
            {imageLayerRadios}
        </div>
    );

    const openButton = (
        <button
            className="layer-control-open-btn mouse-pointer"
            onClick={() => setOpen(true)}
        ></button>
    )

    const closeButton = (
        <strong class="close-btn text-xl align-center cursor-pointer alert-del"
        onClick={() => setOpen(false)}
      >&times;</strong>
    )

    return (
        <div className="layer-control bg-white">
           <div className="bg-blue-100 rounded-lg border-solid border-black border-2">
            {open ? closeButton : openButton}
            </div> 
            {open && content}
        </div>
    )

}

export default LayerControl;