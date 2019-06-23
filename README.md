# leaflet-control-layers-inline.js
A Leaflet plugin that allows to display inline layers control

_For a working example see [demo](https://raruto.github.io/examples/leaflet-control-layers-inline/leaflet-control-layers-inline.html)_

---

## How to use

1. **include CSS & JavaScript**
    ```html
    <head>
    ...
    <style> html, body, #map { height: 100%; width: 100%; padding: 0; margin: 0; } </style>
    <!-- Leaflet (JS/CSS) -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
    <!-- Leaflet-Control-Layers-Inline -->
    <script src="https://unpkg.com/leaflet-control-layers-inline@latest/leaflet-control-layers-inline.js"></script>
    <script src="https://unpkg.com/leaflet-control-layers-inline@latest/leaflet-control-layers-inline.css"></script>
    ...
    </head>
    ```
2. **choose a div container used for the slippy map**
    ```html
    <body>
    ...
	  <div id="map"></div>
    ...
    </body>
    ```
3. **create your first simple “leaflet-control-layers-inline” slippy map**
    ```html
    <script>

      var opts = {
        map: {
          center: [41.4583, 12.7059],
          zoom: 5,
        },
        otmLayer: {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          options: {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          },
        },
        osmLayer: {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          options: {
            maxZoom: 19,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        },
        satelliteLayer: {
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.esri.com/">Esri</a>',
          },
        },
      };

      var map = L.map('map', opts.map);

      var baseLayers = {};

      baseLayers["ESRI World Imagery"] = L.tileLayer(opts.satelliteLayer.url, opts.satelliteLayer.options);
      baseLayers["OpenTopoMap"] = L.tileLayer(opts.otmLayer.url, opts.otmLayer.options);
      baseLayers["OpenStreetMap"] = L.tileLayer(opts.osmLayer.url, opts.osmLayer.options);

      var control = L.control.layers(baseLayers, null, {
        inline: true, // enable inline mode
        position: 'topleft'
      }).addTo(map);

      map.addLayer(baseLayers["OpenTopoMap"]);

    </script>
    ```

---

**Compatibile with:** leaflet@1.3.4

---

**Contributors:** [Raruto](https://github.com/Raruto/leaflet-control-layers-inline)
