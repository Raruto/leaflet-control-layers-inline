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
          zoomControl: false
        },
        osmLayer: {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          options: {
            maxZoom: 19,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        },
        terrainLayer: {
          url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
          options: {
            maxZoom: 18,
            subdomains: 'abcd',
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        },
        satelliteLayer: {
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.esri.com/">Esri</a>'
          }
        },
        otmLayer: {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          options: {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          }
        }
      };

      var map = L.map('map', opts.map);

      var baseLayers = {};

      baseLayers["OSM"] = L.tileLayer(opts.osmLayer.url, opts.osmLayer.options);
      baseLayers["Terrain"] = L.tileLayer(opts.terrainLayer.url, opts.terrainLayer.options);
      baseLayers["Satellite"] = L.tileLayer(opts.satelliteLayer.url, opts.satelliteLayer.options);
      baseLayers["Topo"] = L.tileLayer(opts.otmLayer.url, opts.otmLayer.options);

      var zoom = L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      var control = L.control.layers(baseLayers, null, {
        inline: true, // enable inline mode
        position: 'topleft'
      }).addTo(map);

      map.addLayer(baseLayers["Topo"]);

    </script>
    ```

---

**Compatibile with:** leaflet@1.3.4

---

**Contributors:** [Raruto](https://github.com/Raruto/leaflet-control-layers-inline)
