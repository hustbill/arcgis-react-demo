import React from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        loadModules([
          "esri/Map",
          "esri/request",
          "esri/Color",
          "esri/views/SceneView",
          "esri/widgets/LayerList",
          "esri/layers/BaseTileLayer"
          ], {css: true})
          .then(([
            Map,
            esriRequest,
            Color,
            SceneView,
            LayerList,
            BaseTileLayer
          ]) => { 
            /*****************************************************************
             * Create one TileLayer instance pointing to a cached map service
             * depicting World Imagery
             *****************************************************************/
            // var worldImageryLayer = new TileLayer({
            //   url: 
            //     "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
            //   // This property can be used to uniquely identify the layer
            //   id: "0",
            //   opacity: 0.5,
            //   visible: true
            // });

            // Custom TileLayer
            // To create a custom tile layer, you must call the createSubclass() 
            // method on the BaseTileLayer class. We'll name the custom layer TintLayer.
            // Reference: https://developers.arcgis.com/javascript/latest/sample-code/layers-custom-tilelayer/index.html

            var TintLayer = BaseTileLayer.createSubclass({
              properties: {
                urlTemplate: null,
                tint: {
                  value: null,
                  type: Color
                }
              },
              // generate the tile url for a given level, row and column
              getTileUrl: function (level, row, col) {
                return this.urlTemplate
                  .replace("{z}", level)
                  .replace("{x}", row)
                  .replace("{y}", col);
              },

              // This method fetches tiles for the specified level and size.
              // Override this method to process the data returned from the server.
              fetchTile: function (level, row, col, options) {
                // call getTileUrl() method to construct the URL to tiles
                // for a given level, row and col provided by the LayerView
                var url = this.getTileUrl(level, row, col);

                // request for tiles based on the generated url
                // the signal option ensures that obsolete requests are aborted
                return esriRequest(url, {
                  responseType: "image",
                  signal: options && options.signal
                }).then(
                  function (response) {
                    // when esri request resolves successfully
                    // get the image from the response
                    var image = response.data;
                    var width = this.tileInfo.size[0];
                    var height = this.tileInfo.size[0];

                    // create a canvas with 2D rendering context
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = width;
                    canvas.height = height;

                    // Apply the tint color provided by
                    // by the application to the canvas
                    if (this.tint) {
                      // Get a CSS color string in rgba form
                      // representing the tint Color instance.
                      context.fillStyle = this.tint.toCss();
                      context.fillRect(0, 0, width, height);

                      // // Applies "difference" blending operation between canvas
                      // // and steman tiles. Difference blending operation subtracts
                      // // the bottom layer (canvas) from the top layer (tiles) or the
                      // // other way round to always get a positive value.
                      context.globalCompositeOperation = "difference";
                    }

                    // Draw the blended image onto the canvas.
                    context.drawImage(image, 0, 0, width, height);

                    return canvas;
                  }.bind(this)
                );
              }
            });

            // Create a new instance of the TintLayer and set its properties
            // http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/9/234/311
            var saTileLayer = new TintLayer({
              urlTemplate:
                "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}",
           
              title: "Tile Layer"
            });
    
            /*****************************************************************
             * Layers may be added to the map in the map's constructor
             *****************************************************************/
            const map = new Map({
              layers: [saTileLayer]
            });

            // The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
            // saTileLayer.maxScale = 1000;
            // // The layer's visibility is not restricted to a maximum scale.
            saTileLayer.maxScale = 0;

            // the layer will be refreshed every 6 seconds.
            saTileLayer.refreshInterval = 0.1;
    
            // create a new scene view and add the map
            var view = new SceneView({
              container: this.mapRef.current,
              map: map,
              center: [0, 30],
              zoom: 3
            });

             // create a layer list widget
            var layerList = new LayerList({
              view: view
            });

            view.ui.add(layerList, "top-right");

            this.view = view;
        });
        
    }

    componentWillUnmount() {
        if (this.view) {
            // destroy the map view
            this.view.destroy();
        }
    }

    render() {
        return (
            <div className="webmap" ref={this.mapRef} />
        );
    }
}