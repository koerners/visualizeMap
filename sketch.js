let youtubeData;
let countries;

const mappa = new Mappa('Leaflet');
let trainMap;
let canvas;
let dataSource;

let minValue;
let maxValue;

let data = [];

let currentColor;

const options = {
    lat: 0,
    lng: 0,
    zoom: 1.5,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
    crawlerData = loadTable('test.csv');
}

function request(city) {

    $(document).ready(function () {
        const Url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + city;
        $.ajax({
            url: Url,
            type: "GET",
            success: function (result) {
                console.log(result[0])
            },
            error: function (error) {
                console.log("Error");
            }
        })
    })
}

function setup() {
    canvas = createCanvas(800, 600);

    trainMap = mappa.tileMap(options);
    trainMap.overlay(canvas);

    currentColor = color(64, 250, 200, 100); // default color
    processData();
}

function draw() {
    clear();
    for (let country of data) {
        const pix = trainMap.latLngToPixel(country.lat, country.lon);
        fill(currentColor);
        const zoom = trainMap.zoom();
        L.marker([pix.x, pix.y]).addTo(trainMap);

        // ellipse(pix.x, pix.y, 2000000);

    }
}

function processData() {
    console.log("Process");


    lat = 45.77;
    lon = 4.85;
    count = 100000000;

    data.push({
        lat,
        lon,
        count
    });


    //request('munich');


    for (let row of crawlerData.rows) {
        let city = row.arr[0];

    }


}

