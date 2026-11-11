/**
 * leaflet-control-layers-inline
 *
 * @author    Raruto
 * @license   GPL-3.0+
 * @link https://github.com/Raruto/leaflet-control-layers-inline
 * @desc Leaflet plugin that allows to display inline layers control
 */
(function() {

  const LayersControl = L.LayersControl || L.Control.Layers;
  const layersProto = LayersControl.prototype;
  const initializeLayersProto = layersProto.initialize;
  const onAddLayersProto = layersProto.onAdd;

  LayersControl.mergeOptions({ inline: false });

  if (initializeLayersProto) LayersControl.include({
    initialize(baseLayers, overlays, options) {
      options = options || {};
      if (options.inline) {
        options.collapsed = false;
      }
      initializeLayersProto.call(this, baseLayers, overlays, options);
    },
  });

  LayersControl.include({
    onAdd(map) {
      if (this.options.inline) this.options.collapsed = false;
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