import React from 'react';
import { useState, useEffect } from 'react';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'



const CovidMap = () => {
    // state variable

    // function defination
    function covidInitMap() {
        var covid_map = L.map('covid_map', { minZoom: 2.0, maxZoom: 10 }).setView([28.2180, 94.7278], 4);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18,
            attribution: 'Map data &copy;  <a href="https://www.skymapglobal.com/">Skymap Global</a>',
            id: 'mapbox.light'
        }).addTo(covid_map);
    }
    // 
    const dashboardMap = () => (
        <div className="dashboard_map_wrapper">
            <div className="covid_map" id="covid_map"></div>
        </div>
    )


    // use effect
    useEffect(() => {
        covidInitMap()
    }, [])


    // render main component
    return (
        <div>
            {dashboardMap()}
        </div>
    )
}

export default CovidMap