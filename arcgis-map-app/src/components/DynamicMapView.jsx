import React from 'react';
import { loadModules } from 'esri-loader';
import './DynamicMapView.css';
export class DynamicMapView extends React.Component {
    constructor(props) {
      super(props);
      this.mapRef = React.createRef();
    }
  
    componentDidMount() {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules([
            "esri/Map",
            "esri/views/SceneView",
            "esri/layers/MapImageLayer",
            "esri/widgets/Legend"
        ], { css: true })
            .then(([Map, SceneView, MapImageLayer, Legend]) => {
                // helper function to create a symbol
                function createSymbol(color) {
                    return {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: color,
                        outline: {
                            width: 0.5,
                            color: [255, 255, 255, 0.4]
                        },
                        style: "solid"
                    };
                }

                /*****************************************************************
                 * Create renderers for each block groups sublayer
                 *****************************************************************/

                var populationRenderer = {
                    type: "class-breaks", // autocasts as new ClassBreaksRenderer()
                    field: "POP07_SQMI",
                    defaultSymbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        style: "backward-diagonal",
                        outline: {
                            width: 0.5,
                            color: "gray"
                        }
                    },
                    classBreakInfos: [
                        {
                            minValue: 0,
                            maxValue: 5100,
                            label: "<5,100",
                            symbol: createSymbol("#e6eecf")
                        },
                        {
                            minValue: 5100,
                            maxValue: 16200,
                            label: "5,100 - 16,200",
                            symbol: createSymbol("#9bc4c1")
                        },
                        {
                            minValue: 16200,
                            maxValue: 42200,
                            label: "16,200 - 42,200",
                            symbol: createSymbol("#69a8b7")
                        },
                        {
                            minValue: 42000,
                            maxValue: 1000000,
                            label: ">42,200",
                            symbol: createSymbol("#3d6a89")
                        }
                    ]
                };

                var renterUnitsRenderer = {
                    type: "class-breaks", // autocasts as new ClassBreaksRenderer()
                    field: "RENTER_OCC",
                    normalizationField: "HSE_UNITS",
                    normalizationType: "field",
                    defaultSymbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        style: "backward-diagonal",
                        outline: {
                            width: 0.5,
                            color: "gray"
                        }
                    },
                    classBreakInfos: [
                        {
                            minValue: 0,
                            maxValue: 0.25,
                            label: "< 25%",
                            symbol: createSymbol("#f8e3c2")
                        },
                        {
                            minValue: 0.25,
                            maxValue: 0.5,
                            label: "25% - 50%",
                            symbol: createSymbol("#e5998c")
                        },
                        {
                            minValue: 0.5,
                            maxValue: 0.75,
                            label: "50% - 75%",
                            symbol: createSymbol("#d86868")
                        },
                        {
                            minValue: 0.75,
                            maxValue: 1.0,
                            label: "> 75%",
                            symbol: createSymbol("#9b3557")
                        }
                    ]
                };

                var ageRenderer = {
                    type: "class-breaks", // autocasts as new ClassBreaksRenderer()
                    field: "MED_AGE",
                    defaultSymbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        style: "backward-diagonal",
                        outline: {
                            width: 0.5,
                            color: "gray"
                        }
                    },
                    classBreakInfos: [
                        {
                            minValue: 0,
                            maxValue: 30,
                            label: "< 30",
                            symbol: createSymbol("#f6e5cf")
                        },
                        {
                            minValue: 30,
                            maxValue: 36,
                            label: "30 - 36",
                            symbol: createSymbol("#dd9fbf")
                        },
                        {
                            minValue: 36,
                            maxValue: 42,
                            label: "36 - 42",
                            symbol: createSymbol("#cc71b4")
                        },
                        {
                            minValue: 42,
                            maxValue: 100,
                            label: "> 42",
                            symbol: createSymbol("#8c3c88")
                        }
                    ]
                };

                /*****************************************************************
                 * Create a MapImageLayer instance with three sublayers pointing
                 * to a single map service layer. Each layer uses the same data
                 * but dynamically renders the data differently for each layer.
                 *****************************************************************/

                var layer = new MapImageLayer({
                    url:
                        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
                    title: "Census Demographics",
                    sublayers: [
                        {
                            id: 0,
                            title: "Population/square mile",
                            renderer: populationRenderer,
                            visible: false,
                            labelingInfo: [
                                {
                                    labelExpression: "[POP2007]",
                                    labelPlacement: "always-horizontal",
                                    symbol: {
                                        type: "text", // autocasts as new TextSymbol()
                                        color: "white",
                                        haloColor: "#3d6a89",
                                        haloSize: 1,
                                        font: {
                                            size: 10
                                        }
                                    },
                                    minScale: 37000
                                }
                            ],
                            // points to the block groups layer
                            source: {
                                mapLayerId: 1
                            }
                        },
                        {
                            id: 1,
                            title: "% Renter Occupied Housing Units",
                            renderer: renterUnitsRenderer,
                            definitionExpression: "POP07_SQMI >= 5100",
                            visible: true,
                            labelingInfo: [
                                {
                                    labelExpression: "[RENTER_OCC]",
                                    labelPlacement: "always-horizontal",
                                    symbol: {
                                        type: "text", // autocasts as new TextSymbol()
                                        color: "white",
                                        haloColor: "#9b3557",
                                        haloSize: 1,
                                        font: {
                                            size: 10
                                        }
                                    },
                                    minScale: 37000
                                }
                            ],
                            // points to the block groups layer
                            source: {
                                mapLayerId: 1
                            }
                        },
                        {
                            id: 2,
                            title: "Median Age",
                            renderer: ageRenderer,
                            definitionExpression: "POP07_SQMI >= 5100",
                            visible: false,
                            labelingInfo: [
                                {
                                    labelExpression: "[MED_AGE]",
                                    labelPlacement: "always-horizontal",
                                    symbol: {
                                        type: "text", // autocasts as new TextSymbol()
                                        color: "white",
                                        haloColor: "#8c3c88",
                                        haloSize: 1,
                                        font: {
                                            size: 10
                                        }
                                    },
                                    minScale: 37000
                                }
                            ],
                            // points to the block groups layer
                            source: {
                                mapLayerId: 1
                            }
                        }
                    ]
                });

                /*****************************************************************
                 * Add the layer to a map
                 *****************************************************************/

                var map = new Map({
                    basemap: "gray-vector",
                    layers: [layer]

                });

                var view = new SceneView({
                    container: this.mapRef.current,
                    map: map,
                    zoom: 13,
                    center: [-122.436, 37.764]
                });
        
                
                // map.add(layer);
                var legend = new Legend({
                    view: view
                  });
          
                  view.ui.add(legend, "bottom-left");
                  view.ui.add("info-div", "top-right");
          
                  view.when(function () {
                    // set sublayer visibility depending on the selected layer
                    document
                      .getElementById("layer-select")
                      .addEventListener("change", function (event) {
                        var newValue = parseInt(event.target.value);
                        layer.sublayers.forEach(function (sublayer) {
                          sublayer.visible = newValue === sublayer.id;
                        });
                      });
                  });

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