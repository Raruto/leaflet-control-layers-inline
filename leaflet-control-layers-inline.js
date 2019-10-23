/**
 * leaflet-control-layers-inline
 *
 * @author    Raruto
 * @license   GPL-3.0+
 * @link https://github.com/Raruto/leaflet-control-layers-inline
 * @desc Leaflet plugin that allows to display inline layers control
 */
(function() {

  var layersProto = L.Control.Layers.prototype;
  var initializeLayersProto = layersProto.initialize;
  var onAddLayersProto = layersProto.onAdd;

  layersProto.options.inline = false;

  L.Control.Layers.include({

    initialize: function(baseLayers, overlays, options) {
      if (options.inline) {
        options.collapsed = false;
      }
      initializeLayersProto.call(this, baseLayers, overlays, options);
    },

    onAdd: function(map) {
      onAddLayersProto.call(this, map);
      if (this.options.inline) {
        this.options.collapsed = false;
        L.DomUtil.addClass(this._container, "leaflet-control-layers-inline");
      }
      if (this.options.className) {
        L.DomUtil.addClass(this._container, this.options.className);
      }
      return this._container;
    },

  });

})();
