/**
 * leaflet-control-layers-inline
 *
 * @author    Raruto
 * @license   GPL-3.0+
 * @link https://github.com/Raruto/leaflet-control-layers-inline
 * @desc Leaflet plugin that allows to display inline layers control
 */
(function() {

  const layersProto = L.Control.Layers.prototype;
  const initializeLayersProto = layersProto.initialize;
  const onAddLayersProto = layersProto.onAdd;

  layersProto.options.inline = false;

  L.Control.Layers.include({

    initialize(baseLayers, overlays, options) {
      options = options || {};
      if (options.inline) {
        options.collapsed = false;
      }
      initializeLayersProto.call(this, baseLayers, overlays, options);
    },

    onAdd(map) {
      onAddLayersProto.call(this, map);
      if (this.options.inline) {
        this.options.collapsed = false;
        this._container.classList.add("leaflet-control-layers-inline");
      }
      if (this.options.className) {
        this._container.classList.add(...this.options.className.split(/\s+/).filter(Boolean));
      }
      return this._container;
    },

  });

})();