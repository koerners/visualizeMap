let data = [];

function preload() {
    crawlerData = loadTable('test.csv');
}

function setup() {
    processData();
    noLoop();

}


function draw() {
    clear();
    for (let country of data) {
        var latlng = L.latLng(country.lat, country.lon);
        L.marker(latlng).addTo(mymap);
    }
}


function request(city) {

    $(document).ready(function () {
        const Url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + city;
        $.ajax({
            url: Url,
            type: "GET",
            success: function (result) {
                lat = result[0].lat;
                lon = result[0].lon;

                data.push({
                    lat,
                    lon
                });
                redraw();

            },
            error: function (error) {
                console.log("Error");
            }
        })
    })
}


function processData() {
    request('munich');

    for (let row of crawlerData.rows) {
        let city = row.arr[0];
        //request(city);

    }

}

