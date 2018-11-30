
let data = [];

function preload() {
    crawlerData = loadTable('test.csv');
}
function setup() {

    processData();
}


function draw() {
    clear();
    for (let country of data) {
        L.marker([country.lat, country.lon]).addTo(mymap);
    }
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





function processData() {
    console.log("Process");

    //request('munich');



    for (let row of crawlerData.rows) {
        let city = row.arr[0];

    }


    lat = 45.77;
    lon = 4.85;

    data.push({
        lat,
        lon
    });



}

