# arcgis-react-demo
arcgis-react-demo

# MapImageLayer 
[MapImageLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-MapImageLayer.html) allows you to display and analyze data from sublayers defined in a map service, exporting images instead of features. Map service images are dynamically generated on the server based on a request, which includes an LOD (level of detail), a bounding box, dpi, spatial reference and other options. The exported image is of the entire map extent specified.

Unlike FeatureLayer, MapImageLayer processing is handled by the **server**, not the client. Offloading the processing to the server allows MapImageLayer to render more features with a higher level of performance in some cases.


## MapImageLayer Sample List
- [Intro to MapImageLayer](https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer/index.html)
- [MapImageLayer - Toggle sublayer visibility](https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-sublayers/index.html)
- [MapImageLayer - label sublayer features](https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-dynamic-labels/index.html)


## ImageryLayerView
- [Intro to ImageryLayer](https://developers.arcgis.com/javascript/latest/sample-code/layers-imagerylayer/index.html)
- [Sample - Add an ImageryLayer to a map](https://developers.arcgis.com/javascript/latest/sample-code/layers-imagerylayer/index.html)

    Sample - Work with pixelFilter in an ImageryLayer

    Sample - Set a server side raster function

    Sample - Set a client side raster function

    Sample - Raster attribute table

Sample - Image coordinate system



## Webpack
webpack --config webpack.config.js

## Run  
npm start