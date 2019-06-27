$(document).ready(function(){

   ibuild_state=true;
   sibuild_state=true;
    var w1 = document.getElementsByClassName('w1')[0];
    var btn1=document.getElementById("btn1");
    btn1.style.background="#0090ff";
    w1.style.color="white";
    var w2 = document.getElementsByClassName('w2')[0];
    var btn2=document.getElementById("btn2");
    btn2.style.background="#0090ff";
    w2.style.color="white";

    $.get("/load_ibuild_draw/", function(ret){
        ibuild_draws=ret['ibuild_draws'];
        sibuild_draws=ret['sibuild_draws'];
        interesting_area=ret["interesting_area"];
        for(var i in ibuild_draws){

        ibuild_draws[i]["geometry"]=JSON.parse(ibuild_draws[i]["geometry"]);

           var features=(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i]);
            style=new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color:'#00FFFF',
                   width: 1,
                }),
                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
                    color: '#A6C2DE'
                }),
            });
            features[0].setStyle(style);
            var vectorSource = new ol.source.Vector({
                features: features//(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i])
              });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                 opacity:0.5
            });

            ibuild_draws[i]=vectorLayer;
        }

        for(var i in sibuild_draws){
        sibuild_draws[i]["geometry"]=JSON.parse(sibuild_draws[i]["geometry"]);
        var features=(new ol.format.GeoJSON()).readFeatures(sibuild_draws[i]);
            style=new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color:  '#FFFFFF',
                   width: 1,
                }),
                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
                    color: '#FFED59'
                }),
            });
            features[0].setStyle(style);
            //alert(all_draws[i]);
            var vectorSource = new ol.source.Vector({
                features: features
              });
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                 opacity:0.5
            });

            sibuild_draws[i]=vectorLayer;
        }

              for(var i in interesting_area){
            //alert(all_draws[i]);
             interesting_area[i]["geometry"]=JSON.parse(interesting_area[i]["geometry"]);
              var features=(new ol.format.GeoJSON()).readFeatures(interesting_area[i]);
               style=new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color: '#FF0000',
                     width: 3,
                     lineDash:[10,10,10,10,10,10],
                }),
//                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
//                    color: 'rgba(234, 111, 169, 0.2)'
//                }),
            });
            features[0].setStyle(style);
            var vectorSource = new ol.source.Vector({
                features: features
              });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:1
            });

           map.addLayer(vectorLayer);

        }
         for(var i in ibuild_draws){
    map.addLayer(ibuild_draws[i]);
    }
      for(var i in sibuild_draws){
    map.addLayer(sibuild_draws[i]);
    }
//         var point=interesting_area[0]["properties"]["center"];
//        map.getView().animate({center:(point)});
    });
    $("#btn1").click(function(){
    if(ibuild_state){
    ibuild_state=false;
    for(var i in ibuild_draws){
    map.removeLayer(ibuild_draws[i]);
    }
    }else{
    ibuild_state=true;
    for(var i in ibuild_draws){
    map.addLayer(ibuild_draws[i]);
    }
    }
     var w1 = document.getElementsByClassName('w1')[0];
    var btn1=document.getElementById("btn1");
    btn1.style.background=ibuild_state?"#0090ff":"#f4f5f9";
    w1.style.color=ibuild_state? "white":"#717274";
    })
     $("#btn2").click(function(){
    if(sibuild_state){
    sibuild_state=false;
    for(var i in sibuild_draws){
    map.removeLayer(sibuild_draws[i]);
    }
    }else{
    sibuild_state=true;
    for(var i in sibuild_draws){
    map.addLayer(sibuild_draws[i]);
    }
    }
    var w2 = document.getElementsByClassName('w2')[0];
    var btn2=document.getElementById("btn2");
    btn2.style.background=sibuild_state?"#0090ff":"#f4f5f9";
    w2.style.color=sibuild_state? "white":"#717274";
    })
    
});