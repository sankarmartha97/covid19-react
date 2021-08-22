// import React, { Component } from 'react'
// import * as L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
// import 'leaflet-defaulticon-compatibility';
// import 'leaflet.awesome-markers';
// import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// var $ = require("jquery");

// // var geojson_data = {},map,geojson,info;

// var geojson,isolation_geojson,checkGates_geojson,quarantine_geojson,info;

// function onEachFeature(feature, layer) {
//     // layer.bindPopup(popupContent2);
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         // click: zoomToFeature
//  });
// //  layer.setStyle({
// //     weight: 5,
// //     // color: 'red',
// //     // dashArray: '',
// //     fillOpacity: 0,
// // // fillColor: '#f03',
// // "opacity": 0.99
// // });
// // console.log(feature);
// }

// function highlightFeature(e) {
//     // console.log(e);
//     var layer = e.target;
//     layer.setStyle({
//         "weight": "5",
//         // "color": "red",

//     });
//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         // layer.bringToFront();
//     }
//     // info.update(layer.feature.properties);
// }

// function resetHighlight(e) {
//     // console.log(geojson);
//     geojson.resetStyle(e.target);
//     // geojson.setStyle({color: "red"});
//     // geojson.setStyle({
//     //         weight: 5,
//     //         // color: 'red',
//     //         // dashArray: '',
//     //         fillOpacity: 0,
//     //     // fillColor: '#f03',
//     //     "opacity": 0.99
//     //     });
//     info.update();
// }

// function onEachHospitalFeature(feature, layer) {

//     var popupContent = "<div> <h6>Centre Information</h6>"
//     // + "<p>Layer:&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; <b>" + feature.properties.id

//     + "<br></b>Name: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<b>" + feature.properties.name_of_ho
//     + "</b><br>Facility:&nbsp;&nbsp; &nbsp; <b>" + feature.properties.quaratine
//     + "</b><br>Capacity:&nbsp;&nbsp;  <b>" + feature.properties.capacity
    
//     +"</b></p></div>";

//     // var popupContent = "<p>I started out as a GeoJSON " +
//     //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

//     // if (feature.properties && feature.properties.popupContent) {
//     //     popupContent += feature.properties.popupContent;
//     // }

//     layer.bindPopup(popupContent);
// };


// function onEachQuarantineFeature(feature, layer) {

//     var popupContent = "<div> <h6>Hospital</h6>"
//     // + "<p>Layer:&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; <b>" + feature.properties.id

//     + "<br></b>Name: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<b>" + feature.properties.name_of_ho
//     + "</b><br>Facility:&nbsp;&nbsp; &nbsp; <b>" + feature.properties.quaratine
//     + "</b><br>Capacity:&nbsp;&nbsp;  <b>" + feature.properties.capacity
    
//     +"</b></p></div>";

//     // var popupContent = "<p>I started out as a GeoJSON " +
//     //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

//     // if (feature.properties && feature.properties.popupContent) {
//     //     popupContent += feature.properties.popupContent;
//     // }

//     layer.bindPopup(popupContent);
// };
    
//     //                 pointToLayer: function (feature, latlng) {
//     //                     if(feature.properties.a_status==='rejected'){
//     //                        return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'globe-asia', prefix: 'fa', markerColor: 'red'}) });
//     //                     }
//     //                     else if(feature.properties.a_status==='approved'){
//     //                        return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'globe-asia', prefix: 'fa', markerColor: 'green'}) });
//     //                     }
//     //                     else if(feature.properties.a_status==='pending'){
//     //                         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'globe-asia', prefix: 'fa', markerColor: 'blue'}) });
//     //                      }
//     //                 }
//     //             })

        
        

// function onEachCheckGatesFeature(feature, layer) {

//     var popupContent = "<div> <h6>Check Point Description</h6>"
//     // + "<p>Layer:&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  <b>" + feature.properties.id
//     + "<br></b>Name: &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;<b>" + feature.properties.name
        
//     +"</b></p></div>";

//     // var popupContent = "<p>I started out as a GeoJSON " +
//     //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

//     // if (feature.properties && feature.properties.popupContent) {
//     //     popupContent += feature.properties.popupContent;
//     // }

//     layer.bindPopup(popupContent);
// };         
// class Home extends Component {
//     // constructor def
//     constructor(props) {
//         super(props);
//         this.state = {
//             data:[],
//             districts_shape:[],
//             quarantine_shap:[],
//             Check_gates_shap:[],
//             isolation_shap:[]
//         }
//     }
//     // end of constructor def


   
//     async componentDidMount() {

//         var covid_map = L.map('covid_map', { minZoom: 2.0, maxZoom: 25 }).setView([28.2180, 94.7278], 25);
//         L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
//             maxZoom: 25,
//             attribution: 'Map data &copy;  <a href="https://www.skymapglobal.com/">Skymap Global</a>',
//             id: 'mapbox.light'
//         }).addTo(covid_map);


        
//         //dark theme
//         //https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png

//         //default theme
//         //https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
          
//         // info = L.control();
//         // info.onAdd = function (map) {
//         // this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//         // this.update();
//         // return this._div;
//         // };

        
//         // method that we will use to update the control based on feature properties passed
//         // info.update = function (props) {
//         // this._div.innerHTML = '<h4>Districts Details</h4>' +  (props ?
//         //     '<span>Districts Name: </span>' +  '<b>' + props.name + '</b><br />'
//         //     + '<span >No. of Isolation: </span>' + '<b>' + Math.round(props.isolation) + '</b>'+ '<br />'  
//         //     + '<span  >No. of Quarantine: </span>' + '<b >' + Math.round(props.quarantine) + '</b>'+ '<br />'                 
//         //     + '<span >No. of Check Gate: </span>' + '<b>' + Math.round(props.chack_gate) + '</b><br />'
//         //     // + '<span >CityRoad: </span>' + '<b>' + props.city_road + '</b>' +' sq.km'+ '<br />'  
//         //     // + '<span >DistrictRoad: </span>' + '<b>' + props.dist_road + '</b>' +' sq.km'+ '<br />'  
//         //     // + '<span >VillRoad: </span>' + '<b>' + props.vill_road + '</b>' +' sq.km'+ '<br />'  
//         //     // + '<span >NH: </span>' + '<b>' + props.nh + '</b>' +' sq.km'+ '<br />'  

//         //     : '<span  >Hover over a region</span>');
//         // };

//         // info.addTo(covid_map);
        
//         await fetch(`${process.env.REACT_APP_URL}/districts_boundary`).then(
//             res => res.json()
//         )
//         .then(districts_shape => this.setState({ districts_shape }, () => {
//             covid_map.on('click', function(districts_shape) {
//                 // alert(districts_shape.latlng); // ev is an event object (MouseEvent in this case)
//             });
//             var myStyle = {
//                 "color": "blue",
//                 "weight": 2.5 ,
//                 // "opacity": 0.5,
//                 "fillOpacity": 0,
//                 // "interactive": false,

//             };    
//         // geojson =  L.geoJSON(districts_shape,{style:myStyle,onEachFeature:onEachFeature}).addTo(covid_map);
//         geojson =  L.geoJSON(districts_shape).addTo(covid_map);

//         covid_map.fitBounds(geojson.getBounds(),{padding: [20, 40]});
            
//         }));

//         // await fetch(`${process.env.REACT_APP_URL}/Check_gates`).then(
//         //     res => res.json()
//         // )
//         // .then(Check_gates_shap => this.setState({ Check_gates_shap }, () => {
//         //     covid_map.on('click', function(Check_gates_shap) {
//         //         // alert(Check_gates_shap.latlng); // ev is an event object (MouseEvent in this case)
//         //     });
//         //     var myStyle = {
//         //         "color": "white",
//         //         "weight": 2.5 ,
//         //         // "opacity": 0.5,
//         //         "fillOpacity": 0,
//         //         // "interactive": false,

//         //     };    
//         //     checkGates_geojson =  L.geoJSON(Check_gates_shap,{style:myStyle,onEachFeature:onEachCheckGatesFeature,
//         //     pointToLayer: function (feature, latlng) {
//         //         // <i class="fas "></i>
//         //         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'chalkboard-teacher', prefix: 'fa'}) });
//         //     }});
//         //     // covid_map.fitBounds(geojson.getBounds());
            
//         // }));

//         // await fetch(`${process.env.REACT_APP_URL}/isolation`).then(
//         //     res => res.json()
//         // )
//         // .then(isolation_shap => this.setState({ isolation_shap }, () => {
//         //     covid_map.on('click', function(isolation_shap) {
//         //         // alert(hospitals_shap.latlng); // ev is an event object (MouseEvent in this case)
//         //     });
//         //     var myStyle = {
//         //         "color": "white",
//         //         "weight": 2.5 ,
//         //         // "opacity": 0.5,
//         //         "fillOpacity": 0,
//         //         // "interactive": false,

//         //     };    
//         //     isolation_geojson =  L.geoJSON(isolation_shap,{style:myStyle,onEachFeature:onEachHospitalFeature,
//         //     pointToLayer: function (feature, latlng) {
//         //         // <i class="fas "></i>
//         //         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'procedures', prefix: 'fa', markerColor: 'orange'}) });
//         //     }
//         // });
//         // // covid_map.fitBounds(geojson.getBounds(),{padding: [20, 20]});
            
//         // }));

//         // await fetch(`${process.env.REACT_APP_URL}/quarantine`).then(
//         //     res => res.json()
//         // )
//         // .then(quarantine_shap => this.setState({ quarantine_shap }, () => {
//         //     covid_map.on('click', function(quarantine_shap) {
//         //         // alert(hospitals_shap.latlng); // ev is an event object (MouseEvent in this case)
//         //     });
//         //     var myStyle = {
//         //         "color": "white",
//         //         "weight": 2.5 ,
//         //         // "opacity": 0.5,
//         //         "fillOpacity": 0,
//         //         // "interactive": false,

//         //     };    
//         //     quarantine_geojson =  L.geoJSON(quarantine_shap,{style:myStyle,onEachFeature:onEachQuarantineFeature,
//         //     pointToLayer: function (feature, latlng) {
//         //         // <i class="fas "></i>
//         //         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'hospital-symbol', prefix: 'fa', markerColor: 'darkred'}) });
//         //     }
//         // }).addTo(covid_map);
//         // // covid_map.fitBounds(geojson.getBounds(),{padding: [20, 20]});
            
//         // }));

//         // var overlays = {
//         //     "Isolation":isolation_geojson,
//         //     "Quarantine":quarantine_geojson,
//         //     "Check Gates":checkGates_geojson,
//         // };    
//         // L.control.layers(overlays,null,{position: 'bottomright'}).addTo(covid_map);

//     }



//     render() {
//         return (
//             <div className="dashboard_map_wrapper">
//             <div className="covid_map" id="covid_map"></div>
//         </div>
//         )
//     }
// }
// export default Home;






import React, { Component } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import 'leaflet.awesome-markers';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';

import 'react-toastify/dist/ReactToastify.css';



var geojson,isolation_geojson,checkGates_geojson,quarantine_geojson, info, covid_map , n;
var legend, districts_shape;
function onEachFeature(feature, layer) {
    // var label = L.marker(layer.getBounds().getCenter(), {
    //     icon: L.divIcon({
    //       className: 'label',
    //       html: feature.properties.confirmed,
    //       iconSize: [4, 4]
    //     })
    //   }).addTo(covid_map);
    // layer.bindPopup(popupContent2);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
 });
//  layer.setStyle({
//     weight: 5,
//     // color: 'red',
//     // dashArray: '',
//     fillOpacity: 0,
// // fillColor: '#f03',
// "opacity": 0.99
// });
// console.log(feature);
}

function highlightFeature(e) {
    // console.log(e);
    var layer = e.target;
    layer.setStyle({
        weight: 1.5,
        "color": "#FF597E",
        // "color": "#FFFFFF",

    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

// function zoomToFeature(e) {
//     covid_map.fitBounds(e.target.getBounds());
    
// }
var lastEventTarget = null; 
function zoomToFeature(e) {

        // console.log(e.target);
        if(lastEventTarget !== null) {  
            geojson.resetStyle(lastEventTarget); 
            info.update()
        }
    
        var layer = e.target;
        lastEventTarget = e.target;
        layer.setStyle({
            weight: 1.5,
            "color": "#FF597E",
            // "color": "#FFFFFF",

        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
        
    }
    
function onEachHospitalFeature(feature, layer) {

    var popupContent = "<div> <h6>Centre Information</h6>"
    // + "<p>Layer:&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; <b>" + feature.properties.id

    + "<br></b>Name: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<b>" + feature.properties.name_of_ho
    + "</b><br>Facility:&nbsp;&nbsp; &nbsp; <b>" + feature.properties.quaratine
    + "</b><br>Capacity:&nbsp;&nbsp;  <b>" + feature.properties.capacity
    
    +"</b></p></div>";

    // var popupContent = "<p>I started out as a GeoJSON " +
    //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    // if (feature.properties && feature.properties.popupContent) {
    //     popupContent += feature.properties.popupContent;
    // }

    layer.bindPopup(popupContent);
};


function onEachQuarantineFeature(feature, layer) {

    var popupContent = "<div> <h6>Hospital</h6>"
    // + "<p>Layer:&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; <b>" + feature.properties.id

    + "<br></b>Name: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<b>" + feature.properties.name_of_ho
    + "</b><br>Facility:&nbsp;&nbsp; &nbsp; <b>" + feature.properties.quaratine
    + "</b><br>Capacity:&nbsp;&nbsp;  <b>" + feature.properties.capacity
    
    +"</b></p></div>";

    // var popupContent = "<p>I started out as a GeoJSON " +
    //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    // if (feature.properties && feature.properties.popupContent) {
    //     popupContent += feature.properties.popupContent;
    // }

    layer.bindPopup(popupContent);
};
    
    //                 pointToLayer: function (feature, latlng) {
    //                     if(feature.properties.a_status==='rejected'){
    //                        return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'globe-asia', prefix: 'fa', markerColor: 'red'}) });
    //                     }
    //                     else if(feature.properties.a_status==='approved'){
    //                        return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'globe-asia', prefix: 'fa', markerColor: 'green'}) });
    //                     }
    //                     else if(feature.properties.a_status==='pending'){
    //                         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'globe-asia', prefix: 'fa', markerColor: 'blue'}) });
    //                      }
    //                 }
    //             })

        
        

function onEachCheckGatesFeature(feature, layer) {

    var popupContent = "<div> <h6>Check Point Description</h6>"
    // + "<p>Layer:&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  <b>" + feature.properties.id
    + "<br></b>Name: &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;<b>" + feature.properties.name
        
    +"</b></p></div>";

    // var popupContent = "<p>I started out as a GeoJSON " +
    //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    // if (feature.properties && feature.properties.popupContent) {
    //     popupContent += feature.properties.popupContent;
    // }

    layer.bindPopup(popupContent);
};     

// function getColor(d) {
//     return d > 40 ? '#FF000A' :
//             d > 30 ? '#FF1710' :
//             d > 20 ? '#FF5228' :
//             d > 10 ? '#FF8556' :
//             d > 0   ? '#FFC9AB' :
//                         '#FFFFFF';
// }


class Home extends Component {
    // constructor def
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            districts_shape:[],
            quarantine_shap:[],
            Check_gates_shap:[],
            isolation_shap:[]
        }
    }
    // end of constructor def


   
    async componentDidMount() {
        // console.log(this.props.mapType);
        console.log(window.screen.width);
        var min_zoom,  max_zoom;
        if(parseInt(window.screen.width)  <  575.98){ // Mobile Potrait Screen
            min_zoom = max_zoom =  6.5;
        }else  if(parseInt(window.screen.width)  >  575.98 && parseInt(window.screen.width) < 767.98){ // Mobile Potrait Screen
            min_zoom = max_zoom =  6.9;
        }else{
            min_zoom = max_zoom =  7.07; //Large Screen Device
        }
        covid_map = L.map('covid_map', { attributionControl: true, zoomControl: false, minZoom: min_zoom, maxZoom: max_zoom }).setView([28.2180, 94.7278], 7);
        // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        //     maxZoom: 18,
        //     attribution: 'Map data &copy;  <a href="https://www.skymapglobal.com/">Skymap Global</a>',
        //     id: 'mapbox.light'
        // }).addTo(covid_map);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        // attribution: 'Map data &copy;  <a href="https://www.skymapglobal.com/">Skymap Global</a>',
            id: 'mapbox/light-v9',
            tileSize: 512,
            // zoomOffset: -1
        }).addTo(covid_map);
        covid_map.attributionControl.setPrefix('Map Not to Scale')

            
        //dark theme
        //https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png

        //default theme
        //https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
          
        info = L.control();
        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        
        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
        this._div.innerHTML =  (props ?
            `<span style="color:#00000; font-weight: bold;" >` + props.name + `</span>` + '</b>' + '<br />'
            + '<span style="color:#ff8193;background-color: #ffe0e6">New Cases : </span>' + '<b>' +`<span style="color:#ff073f;background-color: #ffe0e6" >` + Math.round(props.confirmed)+ `</span>` + '</b>'+ '<br />'  
            + '<span style="color:#a5aeff;background-color: #eff7ff"; >Active : </span>' + '<b>' +`<span style="color:#0083ff;background-color: #eff7ff" >` + Math.round(props.active)+ `</span>` + '</b>'+ '<br />'  
            + '<span style="color:#73c686;background-color: #e4f4e8" >Tests Done : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.tested)+ `</span>`  + '</b>'+ '<br />' 
            + '<span style="color:#a5aeff;background-color: #eff7ff" >Positivity Rate: </span>' + '<b >' +`<span style="color:#0083ff;background-color: #eff7ff" >`+ ( props.tested ?  ((props.confirmed/props.tested)*100).toFixed(2): 0)+ `%</span>`  + '</b>'+ '<br />' 
            + '<span style="color:#73c686;background-color: #e4f4e8" >Discharged : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.recovered)+ `</span>`  + '</b>'+ '<br />' 
            + '<span style="color:#a3a9ae;background-color: #f6f6f7"> Deceased : </span>' + '<b>'+`<span style="color:#6c7591;background-color: #f6f6f7" >` + Math.round(props.deceased)+ `</span>` + '</b><br />'
            // + `<br><span style="color:#00000; font-weight: bold;" >` + 'Cummulative' + `</span>` + '</b>' + '<br />'
            // + '<span style="color:#ff8193;background-color: #ffe0e6">Cumm. New Cases : </span>' + '<b>' +`<span style="color:#ff073f;background-color: #ffe0e6" >` + Math.round(props.cumConfirmed || 0)+ `</span>` + '</b>'+ '<br />'  
            // + '<span style="color:#a5aeff;background-color: #eff7ff">Cumm. Active : </span>' + '<b>' +`<span style="color:#0083ff;background-color: #eff7ff" >` + Math.round(props.cumActive || 0)+ `</span>` + '</b>'+ '<br />'  
            // + '<span style="color:#73c686;background-color: #e4f4e8">Cumm. Discharged : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.cumRecovered || 0)+ `</span>`  + '</b>'+ '<br />' 
            // + '<span style="color:#a3a9ae;background-color: #f6f6f7">Cumm. Deceased : </span>' + '<b>'+`<span style="color:#6c7591;background-color: #f6f6f7" >` + Math.round(props.cumDeceased || 0)+ `</span>` + '</b><br />'
            // + '<span >CityRoad: </span>' + '<b>' + props.city_road + '</b>' +' sq.km'+ '<br />'  6c7591
            // + '<span >DistrictRoad: </span>' + '<b>' + props.dist_road + '</b>' +' sq.km'+ '<br />'  
            // + '<span >VillRoad: </span>' + '<b>' + props.vill_road + '</b>' +' sq.km'+ '<br />'  
            // + '<span >NH: </span>' + '<b>' + props.nh + '</b>' +' sq.km'+ '<br />'  

            : '<span style="font-size:12px;">Hover over a region for details</span>');
        };


        info.addTo(covid_map);
        
        
        await fetch(`${process.env.REACT_APP_URL}/v2/districts_boundary`).then(
            res => res.json()
        )
        .then(districts_shape => this.setState({ districts_shape }, () => {
            const maxvalue = districts_shape.features[0].properties.confirmed;
            n = ~~(maxvalue/5)  || 1;
            covid_map.on('click', function(districts_shape) {
                // alert(districts_shape.latlng); // ev is an event object (MouseEvent in this case)
            });
            // var myStyle = {
            //     "color": "blue",
            //     "weight": 2.5 ,
            //     // "opacity": 0.5,
            //     "fillOpacity": 0,
            //     // "interactive": false,
            // };    
        geojson =  L.geoJSON(districts_shape,{
                style:style,
                onEachFeature:onEachFeature,
                // pointToLayer: function(feature,latlng){
                //     var label = String(feature.properties.confirmed) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
                //     return new L.CircleMarker(latlng, {
                //       radius: 1,
                //     }).bindTooltip(label, {permanent: true, opacity: 1}).openTooltip();
                //     }
            })
            // .bindTooltip(function (layer) {
            //     return layer.feature.properties.name; //merely sets the tooltip text
            //  }, {permanent: true, opacity: 0.5}  //then add your options
            // )
            .addTo(covid_map);
        // covid_map.fitBounds(geojson.getBounds(),{padding: [20, 40]});
        covid_map.fitBounds(geojson.getBounds());
        covid_map.setMaxBounds(geojson.getBounds());

        geojson.eachLayer(function(layer) {
            if(layer.feature.properties.name) {
              layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.confirmed + "</span>", {
                className: "my-labels",
                opacity: 0.7,
                permanent: true,
                sticky:true,
                interactive:true,
                direction: "center"
              }).openTooltip();
             }
          });

          
        }));
 
        // // New Cases	 	0-10;11-30; 31-50; 51-90; 91+ 
        //     function getColorNewCases(d) {
        //         return  d > 90 ? '#66ccff' :
        //                 d > 50 ? '#ccecff' :
        //                 d > 30 ? '#ffff00' :
        //                 d > 10 ? '#ccff66' :
        //                          '#99cc00' ;
        //         }


        function getColor(d) {
            return d > 5*n ? '#E8000A' :
                    d > 4*n ? '#FF070B' :
                    d > 3*n ? '#FF2F17' :
                    d > 2*n ? '#FF6B3B' :
                    d > 1*n ? '#FFA177' :
                    d > 0  ? '#FFD1B6' :
                            '#FFFFFF';
        }   

       // Tests Done// 0-1000; 1001-2500; 2501-5000; 5000-10000; 10001+
        function getColorTestsDone(d) {
            return d > 10000 ? '#E8000A' :
                    d > 5000 ? '#FF2F17' :
                    d > 2500 ? '#FF6B3B' :
                    d > 1000 ? '#FFA177' :
                              '#FFD1B6' ;
            }   
        // New Cases	 	0-10;11-30; 31-50; 51-90; 91+
        function getColorNewCases(d) {
            return  d > 90 ? '#E8000A' :
                    d > 50 ? '#FF2F17' :
                    d > 30 ? '#FF6B3B' :
                    d > 10 ? '#FFA177' :
                             '#FFD1B6' ;
            }   

        //Positivity Rate	 	0-5; 6-10; 11-30; 31-50; 51 +
        function getColorPositivityRate(d) {
            return  d > 50 ? '#E8000A' :
                    d > 30 ? '#FF2F17' :
                    d > 10 ? '#FF6B3B' :
                    d > 5 ?  '#FFA177' :
                             '#FFD1B6' ;
            }   

            // Deceased 	0-5; 6-10; 11-30; 31-50; 51 +
            function getColorDeceased(d) {
                return  d > 50 ? '#E8000A' :
                        d > 30 ? '#FF2F17' :
                        d > 10 ? '#FF6B3B' :
                        d > 5 ?  '#FFA177' :
                                 '#FFD1B6' ;
                }   

            // Discharged	     0-10; 11-30; 31-50; 51-100; 101+
            function getColorDischarged(d) {
                return  d > 50 ? '#E8000A' :
                        d > 30 ? '#FF2F17' :
                        d > 30 ? '#FF6B3B' :
                        d > 10 ? '#FFA177' :
                                 '#FFD1B6' ;
                }   
            // Active Cases 	 0-100;101-200; 201-300; 301-400; 401+
            function getColorActive(d) {
                return  d > 400 ? '#E8000A' :
                        d > 300 ? '#FF2F17' :
                        d > 200 ? '#FF6B3B' :
                        d > 100 ? '#FFA177' :
                                 '#FFD1B6' ;
                }   

        

        function style(feature) {
            return {
                weight: 0.5,
                opacity: 1,
                color: '#FF7390', //backup color
                // color: '#FFFFFF',
                // dashArray: '5',
                fillOpacity: 0.7,
                fillColor: getColorNewCases(feature.properties.confirmed)
            };
        }


        // await fetch(`${process.env.REACT_APP_URL}/Check_gates`).then(
        //     res => res.json()
        // )
        // .then(Check_gates_shap => this.setState({ Check_gates_shap }, () => {
        //     covid_map.on('click', function(Check_gates_shap) {
        //         // alert(Check_gates_shap.latlng); // ev is an event object (MouseEvent in this case)
        //     });
        //     var myStyle = {
        //         "color": "white",
        //         "weight": 2.5 ,
        //         // "opacity": 0.5,
        //         "fillOpacity": 0,
        //         // "interactive": false,

        //     };    
        //     checkGates_geojson =  L.geoJSON(Check_gates_shap,{style:style,onEachFeature:onEachCheckGatesFeature,
        //     pointToLayer: function (feature, latlng) {
        //         // <i class="fas "></i>
        //         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'chalkboard-teacher', prefix: 'fa'}) });
        //     }});
        //     // covid_map.fitBounds(geojson.getBounds());
            
        // }));

        // await fetch(`${process.env.REACT_APP_URL}/isolation`).then(
        //     res => res.json()
        // )
        // .then(isolation_shap => this.setState({ isolation_shap }, () => {
        //     covid_map.on('click', function(isolation_shap) {
        //         // alert(hospitals_shap.latlng); // ev is an event object (MouseEvent in this case)
        //     });
        //     var myStyle = {
        //         "color": "white",
        //         "weight": 2.5 ,
        //         // "opacity": 0.5,
        //         "fillOpacity": 0,
        //         // "interactive": false,
        //     };    
        //     isolation_geojson =  L.geoJSON(isolation_shap,{style:style,onEachFeature:onEachHospitalFeature,
        //     pointToLayer: function (feature, latlng) {
        //         // <i class="fas "></i>
        //         return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'procedures', prefix: 'fa', markerColor: 'orange'}) });
        //     }
        // });
        // covid_map.fitBounds(geojson.getBounds(),{padding: [20, 20]});
            
        // }));

        // await fetch(`${process.env.REACT_APP_URL}/quarantine`).then(
        //     res => res.json()
        // )
        // .then(quarantine_shap => this.setState({ quarantine_shap }, () => {
        //     covid_map.on('click', function(quarantine_shap) {
        //         // alert(hospitals_shap.latlng); // ev is an event object (MouseEvent in this case)
        //     });
        //     var myStyle = {
        //         "color": "white",
        //         "weight": 2.5 ,
        //         // "opacity": 0.5,
        //         "fillOpacity": 0,
        //         // "interactive": false,
        //     };    
        //     quarantine_geojson =  L.geoJSON(quarantine_shap,{style:style,onEachFeature:onEachQuarantineFeature,
        //         pointToLayer: function (feature, latlng) {
        //             // <i class="fas "></i>
        //             return   L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'hospital-symbol', prefix: 'fa', markerColor: 'darkred'}) });
        //         }
        //     })
        //     // .addTo(covid_map);
        // // covid_map.fitBounds(geojson.getBounds(),{padding: [20, 20]});
            
        // }));

        // var overlays = {
        //     "Isolation":isolation_geojson,
        //     "Quarantine":quarantine_geojson,
        //     "Check Gates":checkGates_geojson,
        // };    
        // L.control.layers(overlays,null,{position: 'bottomleft'}).addTo(covid_map);
        // L.control.scale().addTo(covid_map);
        // var legend = L.control({position: 'bottomright'});
        legend = L.control({position: 'topleft'});


        legend.onAdd = function (covid_map) {
            var div = L.DomUtil.create('div', 'info legend'),
                // grades = [0, 1, 1*n, 2*n, 3*n, 4*n, 5*n],
                grades = [0,10,30,50,90],
                labels = ['<strong style="color:red"> New Cases </strong>'],
                from, to;
                labels.push(
                    // '<i class="color-pallete" style="background:' + getColorTestsDone(0) + '"></i> ' +
                    '<i class="color-pallete" style="background:' + getColorNewCases(0) + '"></i> ' +
                    0 + (10 ? '&ndash;' + 10 : '+'));
                    
            for (var i = 1; i < grades.length; i++) {
                from = grades[i] + 1;
                to = grades[i + 1];
                labels.push(
                    // '<i class="color-pallete" style="background:' + getColorTestsDone(from + 1) + '"></i> ' +
                    '<i class="color-pallete" style="background:' + getColorNewCases(from + 1) + '"></i> ' +
                    from  + (to ? '&ndash;' + to : '+'));
            }

            div.innerHTML = labels.join('<br>');
            return div;

            // for (var i = 1; i < grades.length; i++) {
            //     from = grades[i];
            //     to = grades[i + 1];
            //     labels.push('<i style="background:' + getColor(from + 1) + '"></i> ' +
            //             from + (to ? '&ndash;' + to : '+'))
            //     }

            // div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
            // return div
        };

        legend.addTo(covid_map);


    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        const mapType =  nextProps.mapType;
        const mapViewType = nextProps.mapViewType;

        if (mapViewType === 'cummulative') {
            info.remove(covid_map);
            info.update = function (props) {
                this._div.innerHTML =  (props ?
                    `<span style="color:#00000; font-weight: bold;" >` + props.name + `</span>` + '</b>' + '<br />'
                      // + `<br><span style="color:#00000; font-weight: bold;" >` + 'Cummulative' + `</span>` + '</b>' + '<br />'
                    + '<span style="color:#ff8193;background-color: #ffe0e6">Cum. Tested : </span>' + '<b>' +`<span style="color:#ff073f;background-color: #ffe0e6" >` + Math.round(props.cumTested || 0)+ `</span>` + '</b>'+ '<br />'  
                    + '<span style="color:#a5aeff;background-color: #eff7ff">Cum. Confirmed : </span>' + '<b>' +`<span style="color:#0083ff;background-color: #eff7ff" >` + Math.round(props.cumConfirmed || 0)+ `</span>` + '</b>'+ '<br />'  
                    + '<span style="color:#73c686;background-color: #e4f4e8">Cum. Discharged : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.cumRecovered || 0)+ `</span>`  + '</b>'+ '<br />' 
                    + '<span style="color:#a3a9ae;background-color: #f6f6f7">Cum. Deceased : </span>' + '<b>'+`<span style="color:#6c7591;background-color: #f6f6f7" >` + Math.round(props.cumDeceased || 0)+ `</span>` + '</b><br />'
                    : '<span style="font-size:12px;">Hover over a region for details</span>');
                };
                info.addTo(covid_map);
        } else if (mapViewType === 'daily'){
            info.remove(covid_map);
            info.update = function (props) {
                this._div.innerHTML =  (props ?
                    `<span style="color:#00000; font-weight: bold;" >` + props.name + `</span>` + '</b>' + '<br />'
                    + '<span style="color:#ff8193;background-color: #ffe0e6">New Cases : </span>' + '<b>' +`<span style="color:#ff073f;background-color: #ffe0e6" >` + Math.round(props.confirmed)+ `</span>` + '</b>'+ '<br />'  
                    + '<span style="color:#a5aeff;background-color: #eff7ff"; >Active : </span>' + '<b>' +`<span style="color:#0083ff;background-color: #eff7ff" >` + Math.round(props.active)+ `</span>` + '</b>'+ '<br />'  
                    + '<span style="color:#73c686;background-color: #e4f4e8" >Tests Done : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.tested)+ `</span>`  + '</b>'+ '<br />' 
                    + '<span style="color:#a5aeff;background-color: #eff7ff" >Positivity Rate: </span>' + '<b >' +`<span style="color:#0083ff;background-color: #eff7ff" >`+ ( props.tested ?  ((props.confirmed/props.tested)*100).toFixed(2): 0)+ `%</span>`  + '</b>'+ '<br />' 
                    + '<span style="color:#73c686;background-color: #e4f4e8" >Discharged : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.recovered)+ `</span>`  + '</b>'+ '<br />' 
                    + '<span style="color:#a3a9ae;background-color: #f6f6f7"> Deceased : </span>' + '<b>'+`<span style="color:#6c7591;background-color: #f6f6f7" >` + Math.round(props.deceased)+ `</span>` + '</b><br />'
                   
                    : '<span style="font-size:12px;">Hover over a region for details</span>');
                };
        
                info.addTo(covid_map);
        } 
        else if (mapViewType === 'beds'){
            info.remove(covid_map);
            info.update = function (props) {
                this._div.innerHTML =  (props ?
                    `<span style="color:#00000; font-weight: bold; " >` + props.name + `</span>` + '</b>' + '<br />'
                    + '<span style="color:#ff8193;background-color: #ffe0e6">ICU Beds : </span>' + '<b>' +`<span style="color:#ff073f;background-color: #ffe0e6" >` + Math.round(props.icubeds)+ `</span>` + '</b>'+ '<br />'  
                    + '<span style="color:#a5aeff;background-color: #eff7ff"; >O<sub>2</sub> Beds  : </span>' + '<b>' +`<span style="color:#0083ff;background-color: #eff7ff" >` + Math.round(props.o2beds)+ `</span>` + '</b>'+ '<br />'  
                    + '<span style="color:#73c686;background-color: #e4f4e8" >Non-O<sub>2</sub> Beds  : </span>' + '<b >' +`<span style="color:#28a745;background-color: #e4f4e8" >`+ Math.round(props.nono2beds)+ `</span>`  + '</b>'+ '<br />' 
                    + '<span style="color:#000000; font-size:9px;display: inline-block;margin-top:4px">*Total Beds count (DCH + DCHC + CCC)</span><br />' 
                     
                    : '<span style="font-size:12px;">Hover over a region for details</span>');
                };
        
                info.addTo(covid_map);
        }
      
            
 
        if (mapType === 'newCases') {
            legend.remove(covid_map);

                        // Back up color code
                        // New Cases	 	0-10;11-30; 31-50; 51-90; 91+
                        function getColorNewCases(d) {
                            return  d > 90 ? '#E8000A' :
                                    d > 50 ? '#FF2F17' :
                                    d > 30 ? '#FF6B3B' :
                                    d > 10 ? '#FFA177' :
                                             '#FFD1B6' ;
                            }
                        // Back up color code

            // New Cases	 	0-10;11-30; 31-50; 51-90; 91+
            // function getColorNewCases(d) {
            //     return  d > 90 ? '#66ccff' :
            //             d > 50 ? '#ccecff' :
            //             d > 30 ? '#ffff00' :
            //             d > 10 ? '#ccff66' :
            //                      '#99cc00' ;
            //     }
                function style(feature) {
                    return {
                        weight: 0.7,
                        opacity: 1,
                        color: '#FF7390',
                        // dashArray: '5',
                        fillOpacity: 0.7,
                        fillColor: getColorNewCases(feature.properties.confirmed)
                    };
                }
                if (geojson !== undefined) {
                    geojson.remove(covid_map)
                }
                // console.log(this.state.districts_shape);
                geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
                covid_map.fitBounds(geojson.getBounds());
                covid_map.setMaxBounds(geojson.getBounds());
                geojson.eachLayer(function(layer) {
                    if(layer.feature.properties.name) {
                      layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.confirmed + "</span>", {
                        className: "my-labels",
                        opacity: 0.7,
                        permanent: true,
                        sticky:true,
                        interactive:true,
                        direction: "center"
                      }).openTooltip();
                     }
                  });
            legend.onAdd = function (covid_map) {
                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,10,30,50,90],
                    labels = ['<strong style="color:red"> New Cases </strong>'],
                    from, to;
                    labels.push(
                        '<i class="color-pallete" style="background:' + getColorNewCases(0) + '"></i> ' +
                        0 + (10 ? '&ndash;' + 10 : '+'));
                for (var i = 1; i < grades.length; i++) {
                    from = grades[i] + 1;
                    to = grades[i + 1];
                    labels.push(
                        '<i class="color-pallete" style="background:' + getColorNewCases(from + 1) + '"></i> ' +
                        from  + (to ? '&ndash;' + to : '+'));
                }
                div.innerHTML = labels.join('<br>');
                return div;
            };

            legend.addTo(covid_map);
            

        } else if  (mapType === 'testsDone') {
                legend.remove(covid_map);
                // Tests Done// 0-1000; 1001-2500; 2501-5000; 5000-10000; 10001+
                // function getColorTestsDone(d) {
                //     return d > 500 ? '#66ccff' :
                //             d > 250 ? '#ccecff' :
                //             d > 100 ? '#ffff00' :
                //             d > 50 ? '#ccff66' :
                //                     '#99cc00' ;
                // }

                function getColorTestsDone(d) {
                    return d > 500 ? '#E8000A' :
                            d > 250 ? '#FF2F17' :
                            d > 100 ? '#FF6B3B' :
                            d > 50 ? '#FFA177' :
                                    '#FFD1B6' ;
                }

                function style(feature) {
                    return {
                        weight: 0.7,
                        opacity: 1,
                        color: '#FF7390',
                        // dashArray: '5',
                        fillOpacity: 0.7,
                        fillColor: getColorTestsDone(feature.properties.tested)
                    };
                }
                if (geojson !== undefined) {
                    geojson.remove(covid_map)
                }
                // console.log(this.state.districts_shape);
                geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
                covid_map.fitBounds(geojson.getBounds());
                covid_map.setMaxBounds(geojson.getBounds());
                geojson.eachLayer(function(layer) {
                    if(layer.feature.properties.name) {
                      layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.tested + "</span>", {
                        className: "my-labels",
                        opacity: 0.7,
                        permanent: true,
                        sticky:true,
                        interactive:true,
                        direction: "center"
                      }).openTooltip();
                     }
                  });

                legend.onAdd = function (covid_map) {
                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [0,50,100,250,500],
                        labels = ['<strong style="color:red"> Tests Done </strong>'],
                        from, to;
                        labels.push(
                            '<i class="color-pallete" style="background:' + getColorTestsDone(0) + '"></i> ' +
                            0 + (50 ? '&ndash;' + 50 : '+'));
                    for (var i = 1; i < grades.length; i++) {
                        from = grades[i] + 1;
                        to = grades[i + 1];
                        labels.push(
                            '<i class="color-pallete" style="background:' + getColorTestsDone(from + 1) + '"></i> ' +
                            from  + (to ? '&ndash;' + to : '+'));
                    }
                    div.innerHTML = labels.join('<br>');
                    return div;
                };
                legend.addTo(covid_map);
        }
      
        else if  (mapType === 'positivityRate') {
            legend.remove(covid_map);
            //Positivity Rate	 	0-5; 6-10; 11-30; 31-50; 51 +
            // function getColorPositivityRate(d) {
            // return  d > 50 ?  '#66ccff':
            //         d > 30 ?  '#ccecff':
            //         d > 10 ? '#ffff00' :
            //         d > 5 ?  '#ccff66' :
            //                  '#99cc00' ;
            // }  
            function getColorPositivityRate(d) {
                return  d > 50 ? '#E8000A' :
                        d > 30 ? '#FF2F17' :
                        d > 10 ? '#FF6B3B' :
                        d > 5 ?  '#FFA177' :
                                 '#FFD1B6' ;
                }  

            function style(feature) {
                return {
                    weight: 0.7,
                    opacity: 1,
                    color: '#FF7390',
                    // dashArray: '5',
                    fillOpacity: 0.7,
                    fillColor: getColorPositivityRate(  feature.properties.tested ? (feature.properties.confirmed/feature.properties.tested*100) : 0)
                };
            }
            if (geojson !== undefined) {
                geojson.remove(covid_map)
            }
            // console.log(this.state.districts_shape);
            geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
            covid_map.fitBounds(geojson.getBounds());
            covid_map.setMaxBounds(geojson.getBounds());
            geojson.eachLayer(function(layer) {
                if(layer.feature.properties.name) {
                  var positivityRate = layer.feature.properties.tested ? (layer.feature.properties.confirmed/layer.feature.properties.tested*100).toFixed(2)+'%' : 0+'%' ;
                  layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + positivityRate + "</span>", {
                    className: "my-labels",
                    opacity: 0.7,
                    permanent: true,
                    sticky:true,
                    interactive:true,
                    direction: "center"
                  }).openTooltip();
                 }
              });

            legend.onAdd = function (covid_map) {
                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,5,10,30,50],
                    labels = ['<strong style="color:red"> Positivity Rate</strong>'],
                    from, to;
                    labels.push(
                        '<i class="color-pallete" style="background:' + getColorPositivityRate(0) + '"></i> ' +
                        0 + (5 ? '&ndash;' + 5 : '+'));
                for (var i = 1; i < grades.length; i++) {
                    from = grades[i] + 1;
                    to = grades[i + 1];
                    labels.push(
                        '<i class="color-pallete" style="background:' + getColorPositivityRate(from + 1) + '"></i> ' +
                        from  + (to ? '&ndash;' + to : '+'));
                }
                div.innerHTML = labels.join('<br>');
                return div;
            };
            legend.addTo(covid_map);
        }

        else if  (mapType === 'deceased') {
            legend.remove(covid_map);

            
            //Positivity Rate	 	0-5; 6-10; 11-30; 31-50; 51 +
            // Deceased 	0-5; 6-10; 11-30; 31-50; 51 +
            // function getColorDeceased(d) {
            //     return  d > 15 ? '#66ccff' :
            //             d > 10 ? '#ccecff':
            //             d > 4 ?  '#ffff00' :
            //             d > 1 ?  '#ccff66' :
            //                      '#99cc00' ;
            //     }  

            function getColorDeceased(d) {
                return  d > 15 ? '#E8000A' :
                        d > 10 ? '#FF2F17' :
                        d > 4 ? '#FF6B3B' :
                        d > 1 ?  '#FFA177' :
                                 '#FFD1B6' ;
                }  

                function style(feature) {
                    return {
                        weight: 0.7,
                        opacity: 1,
                        color: '#FF7390',
                        // dashArray: '5',
                        fillOpacity: 0.7,
                        fillColor: getColorDeceased(feature.properties.deceased)
                    };
                }
 
                if (geojson !== undefined) {
                    geojson.remove(covid_map)
                }
                // console.log(this.state.districts_shape);
                geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
                covid_map.fitBounds(geojson.getBounds());
                covid_map.setMaxBounds(geojson.getBounds());
                geojson.eachLayer(function(layer) {
                    if(layer.feature.properties.name) {
                      layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.deceased + "</span>", {
                        className: "my-labels",
                        opacity: 0.7,
                        permanent: true,
                        sticky:true,
                        interactive:true,
                        direction: "center"
                      }).openTooltip();
                     }
                  });

            legend.onAdd = function (covid_map) {
                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,1,4,10,15],
                    labels = ['<strong style="color:red"> Deceased</strong>'],
                    from, to;
                    labels.push(
                        '<i class="color-pallete" style="background:' + getColorDeceased(0) + '"></i> ' +
                        0 + (1 ? '&ndash;' + 1 : '+'));
                for (var i = 1; i < grades.length; i++) {
                    from = grades[i] + 1;
                    to = grades[i + 1];
                    labels.push(
                        '<i class="color-pallete" style="background:' + getColorDeceased(from + 1) + '"></i> ' +
                        from  + (to ? '&ndash;' + to : '+'));
                }
                div.innerHTML = labels.join('<br>');
                return div;
            };
            legend.addTo(covid_map);
        }
        else if (mapType === 'discharged'){
                    legend.remove(covid_map);
                    // Discharged	     0-10; 11-30; 31-50; 51-100; 101+
                    // function getColorDischarged(d) {
                    //     return  d > 100 ? '#66ccff' :
                    //             d > 50 ?  '#ccecff':
                    //             d > 30 ?  '#ffff00' :
                    //             d > 10 ?  '#ccff66'  :
                    //                       '#99cc00';
                    //     }  
                    
                    function getColorDischarged(d) {
                        return  d > 100 ? '#E8000A' :
                                d > 50 ? '#FF2F17' :
                                d > 30 ? '#FF6B3B' :
                                d > 10 ? '#FFA177' :
                                          '#FFD1B6' ;
                        }   

                        function style(feature) {
                            return {
                                weight: 0.7,
                                opacity: 1,
                                color: '#FF7390',
                                // dashArray: '5',
                                fillOpacity: 0.7,
                                fillColor: getColorDischarged(feature.properties.recovered)
                            };
                        }
         
                        if (geojson !== undefined) {
                            geojson.remove(covid_map)
                        }
                        // console.log(this.state.districts_shape);
                        geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
                        covid_map.fitBounds(geojson.getBounds());
                        covid_map.setMaxBounds(geojson.getBounds());
                        geojson.eachLayer(function(layer) {
                            if(layer.feature.properties.name) {
                              layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.recovered + "</span>", {
                                className: "my-labels",
                                opacity: 0.7,
                                permanent: true,
                                sticky:true,
                                interactive:true,
                                direction: "center"
                              }).openTooltip();
                             }
                          });
        
                        legend.onAdd = function (covid_map) {
                            var div = L.DomUtil.create('div', 'info legend'),
                                grades = [0,10,30,50,100],
                                labels = ['<strong style="color:red"> Discharged</strong>'],
                                from, to;
                                labels.push(
                                    '<i class="color-pallete" style="background:' + getColorDischarged(0) + '"></i> ' +
                                    0 + (10 ? '&ndash;' + 10 : '+'));
                            for (var i = 1; i < grades.length; i++) {
                                from = grades[i] + 1;
                                to = grades[i + 1];
                                labels.push(
                                    '<i class="color-pallete" style="background:' + getColorDischarged(from + 1) + '"></i> ' +
                                    from  + (to ? '&ndash;' + to : '+'));
                            }
                            div.innerHTML = labels.join('<br>');
                            return div;
                        };
                        legend.addTo(covid_map);
        }
        else if (mapType === 'active'){
            legend.remove(covid_map);
                 // Active Cases 	 0-100;101-200; 201-300; 301-400; 401+
                //  function getColorActive(d) {
                //     return  d > 400 ?   '#66ccff' :
                //             d > 300 ?   '#ccecff':
                //             d > 200 ?   '#ffff00' :
                //             d > 100 ?   '#ccff66' :
                //                         '#99cc00' ;
                //     }   

                function getColorActive(d) {
                    return  d > 400 ? '#E8000A' :
                            d > 300 ? '#FF2F17' :
                            d > 200 ? '#FF6B3B' :
                            d > 100 ? '#FFA177' :
                                     '#FFD1B6' ;
                    } 

                    function style(feature) {
                        return {
                            weight: 0.7,
                            opacity: 1,
                            color: '#FF7390',
                            // dashArray: '5',
                            fillOpacity: 0.7,
                            fillColor: getColorActive(feature.properties.active)
                        };
                    }
     
                    if (geojson !== undefined) {
                        geojson.remove(covid_map)
                    }
                    // console.log(this.state.districts_shape);
                    geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
                    covid_map.fitBounds(geojson.getBounds());
                    covid_map.setMaxBounds(geojson.getBounds());
                    geojson.eachLayer(function(layer) {
                        if(layer.feature.properties.name) {
                          layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.active + "</span>", {
                            className: "my-labels",
                            opacity: 0.7,
                            permanent: true,
                            sticky:true,
                            interactive:true,
                            direction: "center"
                          }).openTooltip();
                         }
                      });

                legend.onAdd = function (covid_map) {
                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [0,100,200,300,400],
                        labels = ['<strong style="color:red"> Active Cases</strong>'],
                        from, to;
                        labels.push(
                            '<i class="color-pallete" style="background:' + getColorActive(0) + '"></i> ' +
                            0 + (100 ? '&ndash;' + 100 : '+'));
                    for (var i = 1; i < grades.length; i++) {
                        from = grades[i] + 1;
                        to = grades[i + 1];
                        labels.push(
                            '<i class="color-pallete" style="background:' + getColorActive(from + 1) + '"></i> ' +
                            from  + (to ? '&ndash;' + to : '+'));
                    }
                    div.innerHTML = labels.join('<br>');
                    return div;
                };
                legend.addTo(covid_map);
}


// cumTested
// cumConfirmed
// cumRecovered
// cumDeceased


else if (mapType === 'cumTested'){
    legend.remove(covid_map);
         // Cumm. Tested  Cases 	0-10000; 10001-25000; 25001-50000; 50000-100000; 100001+

        //  function getColorCumTested(d) {
        //     return  d > 10000 ? '#66ccff' :
        //             d > 5000 ? '#ccecff' :
        //             d > 2500 ? '#ffff00' :
        //             d > 1000 ? '#ccff66'  :
        //                         '#99cc00' ;
        //     }   
            function getColorCumTested(d) {
                return  d > 10000 ? '#E8000A' :
                        d > 5000 ? '#FF2F17' :
                        d > 2500 ? '#FF6B3B' :
                        d > 1000 ?  '#FFA177' :
                                    '#FFD1B6' ;
                }   
    

            function style(feature) {
                return {
                    weight: 0.7,
                    opacity: 1,
                    color: '#FF7390',
                    // dashArray: '5',
                    fillOpacity: 0.7,
                    fillColor: getColorCumTested(feature.properties.cumTested)
                };
            }

            if (geojson !== undefined) {
                geojson.remove(covid_map)
            }
            // console.log(this.state.districts_shape);
            geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
            covid_map.fitBounds(geojson.getBounds());
            covid_map.setMaxBounds(geojson.getBounds());
            geojson.eachLayer(function(layer) {
                if(layer.feature.properties.name) {
                  layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.cumTested + "</span>", {
                    className: "my-labels",
                    opacity: 0.7,
                    permanent: true,
                    sticky:true,
                    interactive:true,
                    direction: "center"
                  }).openTooltip();
                 }
              });

        legend.onAdd = function (covid_map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0,1000,2500,5000,10000],
                labels = ['<strong style="color:red">Cumulative<br/> Tested Cases</strong>'],
                from, to;
                labels.push(
                    '<i class="color-pallete" style="background:' + getColorCumTested(0) + '"></i> ' +
                    0 + (1000 ? '&ndash;' + 1000 : '+'));
            for (var i = 1; i < grades.length; i++) {
                from = grades[i] + 1;
                to = grades[i + 1];
                labels.push(
                    '<i class="color-pallete" style="background:' + getColorCumTested(from + 1) + '"></i> ' +
                    from  + (to ? '&ndash;' + to : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(covid_map);
}
 else if (mapType === 'cumConfirmed'){
            legend.remove(covid_map);
                 // 0-100;101-200; 201-300; 301-500; 500+

                //  function getColorCumConfirmed(d) {
                //     return  d > 500 ? '#66ccff' :
                //             d > 300 ? '#ccecff' :
                //             d > 200 ? '#ffff00' :
                //             d > 100 ?  '#ccff66':
                //                         '#99cc00';
                //     }   

                function getColorCumConfirmed(d) {
                    return  d > 500 ? '#E8000A' :
                            d > 300 ? '#FF2F17' :
                            d > 200 ? '#FF6B3B' :
                            d > 100 ? '#FFA177' :
                                     '#FFD1B6' ;
                    }  

                    function style(feature) {
                        return {
                            weight: 0.7,
                            opacity: 1,
                            color: '#FF7390',
                            // dashArray: '5',
                            fillOpacity: 0.7,
                            fillColor: getColorCumConfirmed(feature.properties.cumConfirmed)
                        };
                    }
     
                    if (geojson !== undefined) {
                        geojson.remove(covid_map)
                    }
                    // console.log(this.state.districts_shape);
                    geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
                    covid_map.fitBounds(geojson.getBounds());
                    covid_map.setMaxBounds(geojson.getBounds());
                    geojson.eachLayer(function(layer) {
                        if(layer.feature.properties.name) {
                          layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.cumConfirmed + "</span>", {
                            className: "my-labels",
                            opacity: 0.7,
                            permanent: true,
                            sticky:true,
                            interactive:true,
                            direction: "center"
                          }).openTooltip();
                         }
                      });

                legend.onAdd = function (covid_map) {
                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [0,100,200,300,500],
                        labels = ['<strong style="color:red">Cumulative<br/>Confirmed Cases</strong>'],
                        from, to;
                        labels.push(
                            '<i class="color-pallete" style="background:' + getColorCumConfirmed(0) + '"></i> ' +
                            0 + (100 ? '&ndash;' + 100 : '+'));
                    for (var i = 1; i < grades.length; i++) {
                        from = grades[i] + 1;
                        to = grades[i + 1];
                        labels.push(
                            '<i class="color-pallete" style="background:' + getColorCumConfirmed(from + 1) + '"></i> ' +
                            from  + (to ? '&ndash;' + to : '+'));
                    }
                    div.innerHTML = labels.join('<br>');
                    return div;
                };
                legend.addTo(covid_map);
}
else if (mapType === 'cumRecovered'){
    legend.remove(covid_map);
         // cumRecovered Cases 	 0-100;101-200; 201-300; 301-500; 500+

        //  function getColorCumRecovered(d) {
        //     return  d > 500 ? '#66ccff' :
        //             d > 300 ? '#ccecff' :
        //             d > 200 ? '#ffff00' :
        //             d > 100 ?  '#ccff66':
        //                         '#99cc00';
        //     }  
        
        function getColorCumRecovered(d) {
            return  d > 500 ? '#E8000A' :
                    d > 300 ? '#FF2F17' :
                    d > 200 ? '#FF6B3B' :
                    d > 100 ? '#FFA177' :
                              '#FFD1B6' ;
            } 

            function style(feature) {
                return {
                    weight: 0.7,
                    opacity: 1,
                    color: '#FF7390',
                    // dashArray: '5',
                    fillOpacity: 0.7,
                    fillColor: getColorCumRecovered(feature.properties.cumRecovered)
                };
            }

            if (geojson !== undefined) {
                geojson.remove(covid_map)
            }
            // console.log(this.state.districts_shape);
            geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
            covid_map.fitBounds(geojson.getBounds());
            covid_map.setMaxBounds(geojson.getBounds());
            geojson.eachLayer(function(layer) {
                if(layer.feature.properties.name) {
                  layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.cumRecovered + "</span>", {
                    className: "my-labels",
                    opacity: 0.7,
                    permanent: true,
                    sticky:true,
                    interactive:true,
                    direction: "center"
                  }).openTooltip();
                 }
              });

        legend.onAdd = function (covid_map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0,100,200,300,500],
                labels = ['<strong style="color:red"> Cumulative <br/>Recovered Cases</strong>'],
                from, to;
                labels.push(
                    '<i class="color-pallete" style="background:' + getColorCumRecovered(0) + '"></i> ' +
                    0 + (100 ? '&ndash;' + 100 : '+'));
            for (var i = 1; i < grades.length; i++) {
                from = grades[i] + 1;
                to = grades[i + 1];
                labels.push(
                    '<i class="color-pallete" style="background:' + getColorCumRecovered(from + 1) + '"></i> ' +
                    from  + (to ? '&ndash;' + to : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(covid_map);
}
else if (mapType === 'cumDeceased'){
        legend.remove(covid_map);
         // 0-5; 6-10; 11-30; 31-50; 51 +
        //  function getColorCumDeceased(d) {
        //     return  d > 50 ?  '#66ccff' :
        //             d > 30 ? '#ccecff' :
        //             d > 10 ? '#ffff00' :
        //             d > 5 ?   '#ccff66':
        //                       '#99cc00';
        //     }  
        
        function getColorCumDeceased(d) {
            return  d > 50 ? '#E8000A' :
                    d > 30 ? '#FF2F17' :
                    d > 10 ? '#FF6B3B' :
                    d > 5 ?  '#FFA177' :
                             '#FFD1B6' ;
            }   
            function style(feature) {
                return {
                    weight: 0.7,
                    opacity: 1,
                    color: '#FF7390',
                    // dashArray: '5',
                    fillOpacity: 0.7,
                    fillColor: getColorCumDeceased(feature.properties.cumDeceased)
                };
            }
            if (geojson !== undefined) {
                geojson.remove(covid_map)
            }
            // console.log(this.state.districts_shape);
            geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
            covid_map.fitBounds(geojson.getBounds());
            covid_map.setMaxBounds(geojson.getBounds());
            geojson.eachLayer(function(layer) {
                if(layer.feature.properties.name) {
                  layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.cumDeceased + "</span>", {
                    className: "my-labels",
                    opacity: 0.7,
                    permanent: true,
                    sticky:true,
                    interactive:true,
                    direction: "center"
                  }).openTooltip();
                 }
              });
        legend.onAdd = function (covid_map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0,5,10,30,50],
                labels = ['<strong style="color:red">Cumulative<br/> Deceased Cases</strong>'],
                from, to;
                labels.push(
                    '<i class="color-pallete" style="background:' + getColorCumDeceased(0) + '"></i> ' +
                    0 + (5 ? '&ndash;' + 5 : '+'));
            for (var i = 1; i < grades.length; i++) {
                from = grades[i] + 1;
                to = grades[i + 1];
                labels.push(
                    '<i class="color-pallete" style="background:' + getColorCumDeceased(from + 1) + '"></i> ' +
                    from  + (to ? '&ndash;' + to : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(covid_map);
}

else if (mapType === 'icu_beds'){
    legend.remove(covid_map);
     // 0-5; 6-10; 11-30; 31-50; 51 +
    //  function getColorIcuBeds(d) {
    //     return  d > 10 ? '#66ccff':
    //             d > 8 ?  '#ccecff' :
    //             d > 5 ?  '#ffff00' :
    //             d > 2 ?  '#ccff66':
    //                      '#99cc00' ;
    //     }   

    function getColorIcuBeds(d) {
        return  d > 10 ? '#E8000A' :
                d > 8 ? '#FF2F17' :
                d > 5 ? '#FF6B3B' :
                d > 2 ?  '#FFA177' :
                         '#FFD1B6' ;
        }  

        function style(feature) {
            return {
                weight: 0.7,
                opacity: 1,
                color: '#FF7390',
                // dashArray: '5',
                fillOpacity: 0.7,
                fillColor: getColorIcuBeds(feature.properties.icu_beds)
            };
        }
        if (geojson !== undefined) {
            geojson.remove(covid_map)
        }
        // console.log(this.state.districts_shape);
        geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
        covid_map.fitBounds(geojson.getBounds());
        covid_map.setMaxBounds(geojson.getBounds());
        geojson.eachLayer(function(layer) {
            if(layer.feature.properties.name) {
              layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.icubeds + "</span>", {
                className: "my-labels",
                opacity: 0.7,
                permanent: true,
                sticky:true,
                interactive:true,
                direction: "center"
              }).openTooltip();
             }
          });
    legend.onAdd = function (covid_map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0,2,5,8,10],
            labels = ['<strong style="color:red">ICU Beds</strong>'],
            from, to;
            labels.push(
                '<i class="color-pallete" style="background:' + getColorIcuBeds(0) + '"></i> ' +
                0 + (2 ? '&ndash;' + 2 : '+'));
        for (var i = 1; i < grades.length; i++) {
            from = grades[i] + 1;
            to = grades[i + 1];
            labels.push(
                '<i class="color-pallete" style="background:' + getColorIcuBeds(from + 1) + '"></i> ' +
                from  + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(covid_map);
}

else if (mapType === 'o2_beds'){
    legend.remove(covid_map);
     // 0-5; 6-10; 11-30; 31-50; 51 +
    //  function getColorO2Beds(d) {
    //     return  d > 20 ? '#66ccff' :
    //             d > 15 ? '#ccecff' :
    //             d > 10 ? '#ffff00' :
    //             d > 5 ?   '#ccff66':
    //                      '#99cc00';
    //     } 
    
    function getColorO2Beds(d) {
        return  d > 20 ? '#E8000A' :
                d > 15 ? '#FF2F17' :
                d > 10 ? '#FF6B3B' :
                d > 5 ?  '#FFA177' :
                         '#FFD1B6' ;
        }  

        function style(feature) {
            return {
                weight: 0.7,
                opacity: 1,
                color: '#FF7390',
                // dashArray: '5',
                fillOpacity: 0.7,
                fillColor: getColorO2Beds(feature.properties.o2beds)
            };
        }
        if (geojson !== undefined) {
            geojson.remove(covid_map)
        }
        // console.log(this.state.districts_shape);
        geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
        covid_map.fitBounds(geojson.getBounds());
        covid_map.setMaxBounds(geojson.getBounds());
        geojson.eachLayer(function(layer) {
            if(layer.feature.properties.name) {
              layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.o2beds + "</span>", {
                className: "my-labels",
                opacity: 0.7,
                permanent: true,
                sticky:true,
                interactive:true,
                direction: "center"
              }).openTooltip();
             }
          });
    legend.onAdd = function (covid_map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0,5,10,15,20],
            labels = ['<strong style="color:red">O<sub>2</sub> Beds</strong>'],
            from, to;
            labels.push(
                '<i class="color-pallete" style="background:' + getColorO2Beds(0) + '"></i> ' +
                0 + (5 ? '&ndash;' + 5 : '+'));
        for (var i = 1; i < grades.length; i++) {
            from = grades[i] + 1;
            to = grades[i + 1];
            labels.push(
                '<i class="color-pallete" style="background:' + getColorO2Beds(from + 1) + '"></i> ' +
                from  + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(covid_map);
}

else if (mapType === 'non_o2_beds'){
    legend.remove(covid_map);
     // 0-5; 6-10; 11-30; 31-50; 51 +
    //  function getColorNonO2Beds(d) {
    //     return  d > 10 ? '#66ccff' :
    //             d > 8 ? '#ccecff' :
    //             d > 5 ? '#ffff00' :
    //             d > 2 ?   '#ccff66':
    //                      '#99cc00';
    //     }  
    
    function getColorNonO2Beds(d) {
        return  d > 10 ? '#E8000A' :
                d > 8 ? '#FF2F17' :
                d > 5 ? '#FF6B3B' :
                d > 2 ?  '#FFA177' :
                         '#FFD1B6' ;
        }  

        function style(feature) {
            return {
                weight: 0.7,
                opacity: 1,
                color: '#FF7390',
                // dashArray: '5',
                fillOpacity: 0.7,
                fillColor: getColorNonO2Beds(feature.properties.nono2beds)
            };
        }
        if (geojson !== undefined) {
            geojson.remove(covid_map)
        }
        // console.log(this.state.districts_shape);
        geojson =  L.geoJSON(this.state.districts_shape,{style:style,onEachFeature:onEachFeature}).addTo(covid_map);
        covid_map.fitBounds(geojson.getBounds());
        covid_map.setMaxBounds(geojson.getBounds());
        geojson.eachLayer(function(layer) {
            if(layer.feature.properties.name) {
              layer.bindTooltip("<span style='font-size: " + 10 + "px;font-weight: 600;'>" + layer.feature.properties.nono2beds + "</span>", {
                className: "my-labels",
                opacity: 0.7,
                permanent: true,
                sticky:true,
                interactive:true,
                direction: "center"
              }).openTooltip();
             }
          });
    legend.onAdd = function (covid_map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0,2,5,8,10],
            labels = ['<strong style="color:red">Non-O<sub>2</sub> Beds</strong>'],
            from, to;
            labels.push(
                '<i class="color-pallete" style="background:' + getColorNonO2Beds(0) + '"></i> ' +
                0 + (2 ? '&ndash;' + 2 : '+'));
        for (var i = 1; i < grades.length; i++) {
            from = grades[i] + 1;
            to = grades[i + 1];
            labels.push(
                '<i class="color-pallete" style="background:' + getColorNonO2Beds(from + 1) + '"></i> ' +
                from  + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(covid_map);
}


    }
    render() {
        return (
            <div className="dashboard-map-wrapper">
                {/* <div className="dashboard-map-status">
                    <div className="dashboard-map-box-confirmed">
                        <p>Confirmed</p>
                        <p className="map-title">56</p>
                    </div>
                    <div className="dashboard-map-box-active">
                        <p>Active</p>
                        <p className="map-title">56</p>
                    </div>
                    <div className="dashboard-map-box-recovered">
                        <p>Recovered</p>
                        <p className="map-title">56</p>
                    </div>
                    <div className="dashboard-map-box-deceased">
                        <p>Deceased</p>
                        <p className="map-title">56</p>
                    </div>
                </div> */}
                <div className="covid_map" id="covid_map"></div>
            </div>
        )
    }
}
export default Home;