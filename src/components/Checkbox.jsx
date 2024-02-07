export function OverlayCheckbox({isChecked, handleChange, displayName, id}) {
    return(
        <label className="base-layer-label py-0.5">
            <input 
            type="checkbox" 
            className="bg-gray-300 form-checkbox text-green-500"
            checked={isChecked} 
            onChange={(e) => handleChange(id, e.target.checked)}
            />
            <div className={`${isChecked ? "text-green-600":""} pl-2 -mt-1`}>{displayName}</div>

        </label>
    )
}


export function WindLayerCheckbox({isChecked, handleChange}) {
    return (
        <label className="wind-layer-label py-1">
            <input
            type="checkbox"
            className="bg-gray-300 form-checkbox text-green-500"
            checked={isChecked}
            onChange={(e) => handleChange(e.target.checked)} />
            <div className={`${isChecked ? "text-green-600":""} pl-2 -mt-1`}>Wind</div>
        </label>
    )
}

export function Radio({id, radioName, isChecked, handleChange, displayName}) {
    return (
        <label className="image-layer-label py-0.5">
            <input
            type="radio"
            className="bg-gray-300 form-radio text-green-600"
            name={radioName}
            value={id}
            checked={isChecked}
            onChange={(e) => handleChange(e.target.value)} />
            <div className={`${isChecked ? "text-green-600":""} pl-2 -mt-1`}>{displayName}</div>
        </label>
    )
}