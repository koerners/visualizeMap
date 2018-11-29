

let trainMap;
let canvas;
let dataSource;
let cities;




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

function setup() {
  canvas = createCanvas(800, 600);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);

  //dataSource = select('#dataSource'); // get the DOM element from the HTML
  //dataSource.changed(processData); // assign callback

  currentColor = color(255, 0, 200, 100); // default color 
  processData();
}

function draw() {
  clear();
  for (let country of data) {
    const pix = trainMap.latLngToPixel(country.lat, country.lon);
    fill(currentColor);
    const zoom = trainMap.zoom();
    const scl = pow(2, zoom); // * sin(frameCount * 0.1);
    ellipse(pix.x, pix.y, country.diameter * scl);
  }
}

function processData() {
    console.log("process Data");
    data = []; // always clear the array when picking a new type

    currentColor = color(64, 250, 200, 100);


  let maxValue = 0;
  let minValue = Infinity;

  for (let row of crawlerData.rows) {
    let city = row.arr[0];
      getCoords('NYC')
          .then((coords) => {
              console.log(coords);
          });

  }




  for (let row of youtubeData.rows) {
    let country = row.get('country_id').toLowerCase();
    let latlon = countries[country];
    if (latlon) {
      let lat = latlon[0];
      let lon = latlon[1];
      let count = Number(row.get(type));
      data.push({
        lat,
        lon,
        count
      });
      if (count > maxValue) {
        maxValue = count;
      }
      if (count < minValue) {
        minValue = count;
      }
    }
  }

  let minD = sqrt(minValue);
  let maxD = sqrt(maxValue);

  for (let country of data) {
    country.diameter = map(sqrt(country.count), minD, maxD, 1, 20);
  }



}


ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Creating a content layout.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'A custom placemark icon',
            balloonContent: 'This is a pretty placemark'
        }, {
            /**
             * Options.
             * You must specify this type of layout.
             */
            iconLayout: 'default#image',
            // Custom image for the placemark icon.
            iconImageHref: 'images/myIcon.gif',
            // The size of the placemark.
            iconImageSize: [30, 42],
            /**
             * The offset of the upper left corner of the icon relative
             * to its "tail" (the anchor point).
             */
            iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'A custom placemark icon with contents',
            balloonContent: 'This one — for Christmas',
            iconContent: '12'
        }, {
            /**
             * Options.
             * You must specify this type of layout.
             */
            iconLayout: 'default#imageWithContent',
            // Custom image for the placemark icon.
            iconImageHref: 'images/ball.png',
            // The size of the placemark.
            iconImageSize: [48, 48],
            /**
             * The offset of the upper left corner of the icon relative
             * to its "tail" (the anchor point).
             */
            iconImageOffset: [-24, -24],
            // Offset of the layer with content relative to the layer with the image.
            iconContentOffset: [15, 15],
            // Content layout.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
});

