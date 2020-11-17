import React from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/views/SceneView',
            "esri/layers/MapImageLayer",
            "esri/identity/ServerInfo"
        ], { css: true })
            .then(([ArcGISMap, MapView, SceneView, MapImageLayer, ServerInfo]) => {

                /*****************************************************************
                 * Create a renderer for the dynamic data layer (table).
                 *****************************************************************/

                var renderer = {
                    type: "simple", // autocasts as new SimpleRenderer()
                    symbol: {
                        type: "simple-line", // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255, 0.5],
                        width: 0.75,
                        style: "long-dash-dot-dot"
                    }
                };

                /*****************************************************************
                 * Create a MapImageLayer instance pointing to a Map Service
                 * containing data about US Cities, Counties, States and Highways.
                 * Define sublayers with visibility for each layer in Map Service.
                 *****************************************************************/
                var layer = new MapImageLayer({
                    url:
                        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
                    sublayers: [
                        {
                            id: 2,
                            visible: true
                        },
                        {
                            id: 4,
                            visible: false,
                            title: "Railroads",
                            renderer: renderer,
                            source: {
                                // indicates the source of the sublayer is a dynamic data layer
                                type: "data-layer",
                                // this object defines the data source of the layer
                                // in this case it's a feature class table from a file geodatabase
                                dataSource: {
                                    type: "table",
                                    // workspace name
                                    workspaceId: "MyDatabaseWorkspaceIDSSR2",
                                    // table name
                                    dataSourceName: "ss6.gdb.Railroads"
                                }
                            }
                        },
                        {
                            id: 1,
                            visible: true
                        },
                        {
                            id: 0,
                            visible: true
                        }
                    ]
                });

                /*****************************************************************
                 * Add the layer to a map
                 *****************************************************************/
                var map = new ArcGISMap({
                    basemap: "dark-gray-vector",
                    layers: [layer]
                });

                this.view = new SceneView({
                    container: this.mapRef.current,
                    map: map,
                    zoom: 3,
                    center: [-99, 39]
                });

               

                /*****************************************************************
                 * Wait for Layer to load and update the page to refelect which
                 * layers are visible in the Map Service.
                 *****************************************************************/
                layer.when(function () {
                    layer.sublayers.map(function (sublayer) {
                      var id = sublayer.id;
                      var visible = sublayer.visible;
                      var node = document.querySelector(
                        ".sublayers-item[data-id='" + id + "']"
                      );
                      if (visible) {
                        node.classList.add("visible-layer");
                      }
                    });
                  });

                /*****************************************************************
                 * Listen for when buttons on the page have been clicked to turn
                 * layers on and off in the Map Service.
                 *****************************************************************/
                var sublayersElement = document.querySelector(".sublayers");
                
                sublayersElement.addEventListener("click", function (event) {
                    var id = event.target.getAttribute("data-id");
                    if (id) {
                      var sublayer = layer.findSublayerById(parseInt(id));
                      var node = document.querySelector(
                        ".sublayers-item[data-id='" + id + "']"
                      );
                      sublayer.visible = !sublayer.visible;
                      node.classList.toggle("visible-layer");
                    }
                  });

                   // Add the layer to a map
                map.add(layer);

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