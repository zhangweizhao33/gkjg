$(function(){
var ibuild_state=false;
var sibuild_state=false;
var demolition_state=false;
var sdemolition_state=false;
var all_draws;

    $.get("/seperate_load_draw/", function(ret){
        ibuild_draws=ret['ibuild'];
        sibuild_draws=ret['sibuild'];
        demolition_draws=ret['demolition'];
        sdemolition_draws=ret['sdemolition'];
        interesting_area=ret['interesting_area'];
        ibuild_draws=JSON.parse(ibuild_draws);
        sibuild_draws=JSON.parse(sibuild_draws);
        demolition_draws=JSON.parse(demolition_draws);
        sdemolition_draws=JSON.parse(sdemolition_draws);

        if(interesting_area.length!=0){ for(var i in interesting_area){
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
        var point=interesting_area[0]["properties"]["center"];
        map.getView().animate({center:(point)});}

        for(var i in ibuild_draws){

             ibuild_draws[i]["context"]=JSON.parse(ibuild_draws[i]["context"]);
             ibuild_draws[i]["context"]["geometry"]=JSON.parse(ibuild_draws[i]["context"]["geometry"]);
             ibuild_draws[i]["center"]=JSON.parse(ibuild_draws[i]["center"]);
             var features=(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i]["context"]);

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
                features: features
              });
            var ibuild_vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:0.5
            });
         ibuild_draws[i]["layer"]=ibuild_vectorLayer;
         //
         //var htmltext="<div id='wholebox"+ibuild_draws[i]["id"]+"' onclick='control_ibox(\" "+ibuild_draws[i]["id"]+" \")'>"
         var htmltext="<div id='wholebox"+ibuild_draws[i]["id"]+"'>"
              +"<img class='giftu' src='/static/img/weizhi-zi.gif' alt='' >"
              +"<div   id='ibox"+ibuild_draws[i]["id"]+"'>"
              +" <p class='xinxishang'><b >"+ibuild_draws[i]["name"] +"</b>"
              +"<img class='cha' src='/static/img/duoxuan/cha1.png' alt=''></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>类型:</b><b>"+ibuild_draws[i]["graphiclabel"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>面积:</b><b>"+ibuild_draws[i]["square"]+"</b><b>平方米</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>时间:<b><b>"+ibuild_draws[i]["foundtime"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"</div>"
              +"</div>";

         $("#information_box").append(htmltext);
         $("#ibox"+ibuild_draws[i]["id"]).css({"display":"none","font-size":".15rem","background":"white","width":"2rem","position":"relative","z-index":"100"});
         $("#wholebox"+ibuild_draws[i]["id"]).on("click",ibuild_draws[i]["id"],function(data){
              if($("#ibox"+data.data).css("display")=="none"){

              $("#ibox"+data.data).css("display","block");
              }else{
              $("#ibox"+data.data).css("display","none");
              }


         })

            var popup_info = document.getElementById('wholebox'+ibuild_draws[i]["id"]);
            var popup = new ol.Overlay({
              element:popup_info,
              autoPan: true,
              autoPanAnimation: {
                duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度.
              }
            });

            var lon=ibuild_draws[i]["center"]["coordinates"][0];
            var lan=ibuild_draws[i]["center"]["coordinates"][1];
            popup.setPosition([lon,lan]);
            ibuild_draws[i]["overlay"]=popup;


        }
        for(var i in sibuild_draws){
                   sibuild_draws[i]["context"]=JSON.parse(sibuild_draws[i]["context"]);
                    sibuild_draws[i]["context"]["geometry"]=JSON.parse(sibuild_draws[i]["context"]["geometry"]);
             sibuild_draws[i]["center"]=JSON.parse(sibuild_draws[i]["center"]);
             var features=(new ol.format.GeoJSON()).readFeatures(sibuild_draws[i]["context"]);
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
            var vectorSource = new ol.source.Vector({
                features: features
              });

            var sibuild_vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:0.5
            });
         sibuild_draws[i]["layer"]=sibuild_vectorLayer;

         var htmltext="<div id='wholebox"+sibuild_draws[i]["id"]+"'>"
              +"<img class='giftu' src='/static/img/weizhi-cheng.gif' alt='' >"
              +"<div   id='ibox"+sibuild_draws[i]["id"]+"'>"
              +" <p class='xinxishang'><b >"+sibuild_draws[i]["name"] +"</b>"
              +"<img class='cha' src='/static/img/duoxuan/cha1.png' alt=''></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>类型:</b><b>"+sibuild_draws[i]["graphiclabel"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>面积:</b><b>"+sibuild_draws[i]["square"]+"</b><b>平方米</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>时间:<b><b>"+sibuild_draws[i]["foundtime"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"</div>"
              +"</div>";

         $("#information_box").append(htmltext);
         $("#ibox"+sibuild_draws[i]["id"]).css({"display":"none","font-size":".15rem","background":"white","width":"2rem","position":"relative","z-index":"100"});
         $("#wholebox"+sibuild_draws[i]["id"]).on("click",sibuild_draws[i]["id"],function(data){
              if($("#ibox"+data.data).css("display")=="none"){

              $("#ibox"+data.data).css("display","block");
              }else{
              $("#ibox"+data.data).css("display","none");
              }


         })

            var popup_info = document.getElementById('wholebox'+sibuild_draws[i]["id"]);
            var popup = new ol.Overlay({
              element:popup_info,
              autoPan: true,
              autoPanAnimation: {
                duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度.
              }
            });
            var lon=sibuild_draws[i]["center"]["coordinates"][0];
            var lan=sibuild_draws[i]["center"]["coordinates"][1];
            popup.setPosition([lon,lan]);

            sibuild_draws[i]["overlay"]=popup;


        }

        for(var i in demolition_draws){
           demolition_draws[i]["context"]=JSON.parse(demolition_draws[i]["context"]);
           demolition_draws[i]["context"]["geometry"]=JSON.parse(demolition_draws[i]["context"]["geometry"]);
           demolition_draws[i]["center"]=JSON.parse(demolition_draws[i]["center"]);
           var features=(new ol.format.GeoJSON()).readFeatures(demolition_draws[i]["context"]);
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
                features: features
              });

            var demolition_vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:0.5
            });
         demolition_draws[i]["layer"]=demolition_vectorLayer
         //
         //var htmltext="<div id='wholebox"+demolition_draws[i]["id"]+"' onclick='control_ibox(\" "+demolition_draws[i]["id"]+" \")'>"
         var htmltext="<div id='wholebox"+demolition_draws[i]["id"]+"'>"
              +"<img class='giftu' src='/static/img/weizhi-hong.gif' alt='' >"
              +"<div   id='ibox"+demolition_draws[i]["id"]+"'>"
              +" <p class='xinxishang'><b >"+demolition_draws[i]["name"] +"</b>"
              +"<img class='cha' src='/static/img/duoxuan/cha1.png' alt=''></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>类型:</b><b>"+demolition_draws[i]["graphiclabel"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>面积:</b><b>"+demolition_draws[i]["square"]+"</b><b>平方米</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>时间:<b><b>"+demolition_draws[i]["foundtime"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"</div>"
              +"</div>";

         $("#information_box").append(htmltext);
         $("#ibox"+demolition_draws[i]["id"]).css({"display":"none","font-size":".15rem","background":"white","width":"2rem","position":"relative","z-index":"100"});
         $("#wholebox"+demolition_draws[i]["id"]).on("click",demolition_draws[i]["id"],function(data){
              if($("#ibox"+data.data).css("display")=="none"){

              $("#ibox"+data.data).css("display","block");
              }else{
              $("#ibox"+data.data).css("display","none");
              }


         })

            var popup_info = document.getElementById('wholebox'+demolition_draws[i]["id"]);
            var popup = new ol.Overlay({
              element:popup_info,
              autoPan: true,
              autoPanAnimation: {
                duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度.
              }
            });
            var lon=demolition_draws[i]["center"]["coordinates"][0];
            var lan=demolition_draws[i]["center"]["coordinates"][1];
            popup.setPosition([lon,lan]);
            demolition_draws[i]["overlay"]=popup;


        }

        for(var i in sdemolition_draws){
             sdemolition_draws[i]["context"]=JSON.parse(sdemolition_draws[i]["context"]);
             sdemolition_draws[i]["context"]["geometry"]=JSON.parse(sdemolition_draws[i]["context"]["geometry"]);
             sdemolition_draws[i]["center"]=JSON.parse(sdemolition_draws[i]["center"]);
             var features=(new ol.format.GeoJSON()).readFeatures(sdemolition_draws[i]["context"]);
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
            var vectorSource = new ol.source.Vector({
                features: features
              });

            var sdemolition_vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                opacity:0.5
            });
         sdemolition_draws[i]["layer"]=sdemolition_vectorLayer
         //
         //var htmltext="<div id='wholebox"+sdemolition_draws[i]["id"]+"' onclick='control_ibox(\" "+sdemolition_draws[i]["id"]+" \")'>"
         var htmltext="<div id='wholebox"+sdemolition_draws[i]["id"]+"'>"
              +"<img class='giftu' src='/static/img/weizhi-qing.gif' alt='' >"
              +"<div   id='ibox"+sdemolition_draws[i]["id"]+"'>"
              +" <p class='xinxishang'><b >"+sdemolition_draws[i]["name"] +"</b>"
              +"<img class='cha' src='/static/img/duoxuan/cha1.png' alt=''></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>类型:</b><b>"+sdemolition_draws[i]["graphiclabel"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>面积:</b><b>"+sdemolition_draws[i]["square"]+"</b><b>平方米</b></p>"
              +"<br>"
              +"<br>"
              +"<p style='float:left;text-align:center;margin-left:15px;color:#666'><b>时间:<b><b>"+sdemolition_draws[i]["foundtime"]+"</b></p>"
              +"<br>"
              +"<br>"
              +"</div>"
              +"</div>";

         $("#information_box").append(htmltext);
         $("#ibox"+sdemolition_draws[i]["id"]).css({"display":"none","font-size":".15rem","background":"white","width":"2rem","position":"relative","z-index":"100"});
         $("#wholebox"+sdemolition_draws[i]["id"]).on("click",sdemolition_draws[i]["id"],function(data){
              if($("#ibox"+data.data).css("display")=="none"){

              $("#ibox"+data.data).css("display","block");
              }else{
              $("#ibox"+data.data).css("display","none");
              }


         })

            var popup_info = document.getElementById('wholebox'+sdemolition_draws[i]["id"]);
            var popup = new ol.Overlay({
              element:popup_info,
              autoPan: true,
              autoPanAnimation: {
                duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度.
              }
            });
             var lon=sdemolition_draws[i]["center"]["coordinates"][0];
            var lan=sdemolition_draws[i]["center"]["coordinates"][1];
            popup.setPosition([lon,lan]);
            sdemolition_draws[i]["overlay"]=popup;


        }
    });






$("#btn1").click(function(){

if(ibuild_state){
ibuild_state=false;
for(var i in ibuild_draws){
map.removeLayer(ibuild_draws[i]["layer"]);
map.removeOverlay(ibuild_draws[i]["overlay"]);
}
}else{
ibuild_state=true;
for(var i in ibuild_draws){
map.addLayer(ibuild_draws[i]["layer"]);
map.addOverlay(ibuild_draws[i]["overlay"]);
}
}
})

$("#btn2").click(function(){

if(sibuild_state){
sibuild_state=false;
for(var i in sibuild_draws){
map.removeLayer(sibuild_draws[i]["layer"]);
map.removeOverlay(sibuild_draws[i]["overlay"]);
}
}else{
sibuild_state=true;
for(var i in sibuild_draws){

map.addLayer(sibuild_draws[i]["layer"]);
map.addOverlay(sibuild_draws[i]["overlay"]);
}
}
})

$("#btn3").click(function(){
if(demolition_state){
demolition_state=false;
for(var i in demolition_draws){
map.removeLayer(demolition_draws[i]["layer"]);
map.removeOverlay(demolition_draws[i]["overlay"]);
}
}else{

demolition_state=true;
for(var i in demolition_draws){
map.addLayer(demolition_draws[i]["layer"]);
map.addOverlay(demolition_draws[i]["overlay"]);
}
}
})

$("#btn4").click(function(){
if(sdemolition_state){
sdemolition_state=false;
for(var i in sdemolition_draws){
map.removeLayer(sdemolition_draws[i]["layer"]);
map.removeOverlay(sdemolition_draws[i]["overlay"]);
}
}else{
sdemolition_state=true;
for(var i in sdemolition_draws){
map.addLayer(sdemolition_draws[i]["layer"]);
map.addOverlay(sdemolition_draws[i]["overlay"]);
}
}
})
});