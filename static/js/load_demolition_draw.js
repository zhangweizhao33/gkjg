$(document).ready(function(){
   demolition_state=true;
   sdemolition_state=true;
    var w1 = document.getElementsByClassName('w1')[0];
    var btn1=document.getElementById("btn1");
    btn1.style.background="#0090ff";
    w1.style.color="white";
    var w2 = document.getElementsByClassName('w2')[0];
    var btn2=document.getElementById("btn2");
    btn2.style.background="#0090ff";
    w2.style.color="white";
    $.get("/load_demolition_draw/", function(ret){
        demolition_draws=ret['demolition_draws'];
        sdemolition_draws=ret['sdemolition_draws'];
        interesting_area=ret["interesting_area"];
        for(var i in demolition_draws){
            //alert(all_draws[i]);
              demolition_draws[i]["geometry"]=JSON.parse(demolition_draws[i]["geometry"]);
              var features=(new ol.format.GeoJSON()).readFeatures(demolition_draws[i]);
               style=new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color: '#00FFFF',
                   width: 1,
                }),
                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
                    color: '#A6C2DE'
                }),
            });
            features[0].setStyle(style);
            var vectorSource = new ol.source.Vector({
                features: features
              });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:0.5
            });

            demolition_draws[i]=vectorLayer;
        }
        for(var i in sdemolition_draws){
            //alert(all_draws[i]);
             sdemolition_draws[i]["geometry"]=JSON.parse(sdemolition_draws[i]["geometry"]);
              var features=(new ol.format.GeoJSON()).readFeatures(sdemolition_draws[i]);

               style=new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color: '#FFFFFF',
                   width: 1,
                }),
                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
                    color: '#FFED59'
                }),
            });
            features[0].setStyle(style);
            var vectorSource = new ol.source.Vector({
                features: features
              });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:0.5
            });

            sdemolition_draws[i]=vectorLayer;
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
          for(var i in sdemolition_draws){
    map.addLayer(sdemolition_draws[i]);
    }
     for(var i in demolition_draws){
    map.addLayer(demolition_draws[i]);
    }
//         var point=interesting_area[0]["properties"]["center"];
//        map.getView().animate({center:(point)});
    });
    $("#btn1").click(function(){

    if(demolition_state){
    demolition_state=false;
    for(var i in demolition_draws){
    map.removeLayer(demolition_draws[i]);

    }
    }else{
    demolition_state=true;
    for(var i in demolition_draws){
    map.addLayer(demolition_draws[i]);
    }
    }
    var w1 = document.getElementsByClassName('w1')[0];
    var btn1=document.getElementById("btn1");
    btn1.style.background=demolition_state?"#0090ff":"#f4f5f9";
    w1.style.color=demolition_state? "white":"#717274";
    })
     $("#btn2").click(function(){
    if(sdemolition_state){
    sdemolition_state=false;
    for(var i in sdemolition_draws){
    map.removeLayer(sdemolition_draws[i]);

    }
    }else{
    sdemolition_state=true;
    for(var i in sdemolition_draws){
    map.addLayer(sdemolition_draws[i]);
    }
    }
    var w2 = document.getElementsByClassName('w2')[0];
    var btn2=document.getElementById("btn2");
    btn2.style.background=sdemolition_state?"#0090ff":"#f4f5f9";
    w2.style.color=sdemolition_state? "white":"#717274";
    })

});