 $.get("/load_interesting_area/", function(ret){
        ibuild_draws=ret['interesting_area'];

        for(var i in ibuild_draws){

        ibuild_draws[i]["geometry"]=JSON.parse(ibuild_draws[i]["geometry"]);

           var features=(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i]);
            style=new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color: '#319FD3',
                   width: 1,
                }),
                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
                    color: 'rgba(54, 21, 169, 0.2)'
                }),
            });
            features[0].setStyle(style);
            var vectorSource = new ol.source.Vector({
                features: features//(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i])
              });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            ibuild_draws[i]=vectorLayer;
        }
     for(var i in ibuild_draws){
     map.addLayer(ibuild_draws[i]);

     }
    });