import React from "react";
import Scanner from "./scanner";
export default function QRScan(props) {
    return (
        <div>


            <button onClick={() => props.setPage(1)} >Return</button>
            <Scanner/>
        </div>
    )
}