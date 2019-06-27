$(function(){
    var demolition;
    var ibuild;

    selection1=document.getElementById("compare1");
    selection2=document.getElementById("compare2");
    var maps_list;
    $.ajax({
            type:'get',
            url:'/_map_inquiry/',
            data: {
            },
            success:function(d_maps){
                maps_list=JSON.parse(d_maps['maps']);
                maps_list=maps_list['maps'];

               // maps_list=map_list["maps"];
                for(var m in maps_list){
                    area=maps_list[m]['area'];

                    time=maps_list[m]['capture_time'];
                    id=maps_list[m]['id'];

                    selection1.add(new Option(area+time,id))
                }
            }
         });


    selection1.onchange=function(){
        var index1 = selection1.selectedIndex;
        $("#compare2").empty();
        for(m in maps_list){
            area1=selection1.options[index1].text.replace(/[0-9]/g, '').replace(/[-]/g, '');
            if(maps_list[m]['area']==area1){
                var area=maps_list[m]['area'];
                var time=maps_list[m]['capture_time'];
                var  id=maps_list[m]['id'];
                selection2.add(new Option(area+time,id));
            }
        }
    };

    var iscompare=false;
    var button_compare=$("#button_compare");
    var map1=$("#map");
    var map2=$("#map_2");
    var temp_layer1;
    var temp_layer2;
    button_compare.click(function(){
    if(iscompare){
   map2.css('display','none');
        map.removeLayer(temp_layer1);
        map_2.removeLayer(temp_layer2);
//        map_2.removeLayer(ibuild_vectorLayer);
//        map_2.removeLayer(demolition_vectorLayer);

//map2.css("visibility","hidden");
//map2.hide();


        map1.off('mousemove');
        map2.off('mousemove');
        map2.off("click");
        map1.off("click");
        iscompare=false;
        map.getView().animate({zoom:12,center:ol.proj.fromLonLat([117.2027, 39.1653])});
        $("#compare_span").text('开始对比');
    }else{
         var click_status=false;
        var index1 = selection1.selectedIndex;
        var text1 = selection1.options[index1].text;
        var value1 = selection1.options[index1].value;
        var index2 = selection2.selectedIndex;
        var text2 = selection2.options[index2].text;
        var value2 = selection2.options[index2].value;
        var center=maps_list[index1-1]['center'];
//              $.ajax({
//        type:'post',
//        url:'pattern_change_detection',
//        data:{'img1':value1,'img2':value2},
//        success:function(result){
//          ibuild_area=JSON.parse(result['ibuild_area']);
//          demolition_area=JSON.parse(result['demolition_area']);
//          ibuild_area['geometry']=JSON.parse(ibuild_area['geometry']);
//          demolition_area['geometry']=JSON.parse(demolition_area['geometry']);
//
//           var ibuild_features=(new ol.format.GeoJSON()).readFeatures(ibuild_area);
//            style1=new ol.style.Style({
//                stroke:new ol.style.Stroke({
//                    color:'#00FFFF',
//                   width: 1,
//                }),
//                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
//                    color: '#A6C2DE'
//                }),
//            });
//            ibuild_features[0].setStyle(style1);
//            var ibuild_vectorSource = new ol.source.Vector({
//                features: ibuild_features//(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i])
//              });
//
//            var ibuild_vectorLayer = new ol.layer.Vector({
//                source: ibuild_vectorSource,
//                 opacity:0.5
//            });
//
//
//            var demolition_features=(new ol.format.GeoJSON()).readFeatures(demolition_area);
//            style2=new ol.style.Style({
//                stroke:new ol.style.Stroke({
//                    color:  '#FFFFFF',
//                   width: 1,
//                }),
//                fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
//                    color: '#FFED59'
//                }),
//            });
//            demolition_features[0].setStyle(style2);
//            var demolition_vectorSource = new ol.source.Vector({
//                features: demolition_features//(new ol.format.GeoJSON()).readFeatures(ibuild_draws[i])
//              });
//
//            var demolition_vectorLayer = new ol.layer.Vector({
//                source: demolition_vectorSource,
//                 opacity:0.5
//            });
//          }
//        });

        //for(m in maps_list){
        //            id=maps_list[m].GlobeID;
         //           if(id==value2){
         //               cord_x=(maps_list[m].TopLeftLongitude+maps_list[m].TopRightLongitude)/2.0;
          //              cord_y=(maps_list[m].TopLeftLatitude+maps_list[m].BottomLeftLatitude)/2.0;
          //              var location=ol.proj.fromLonLat([cord_x,cord_y]);
          //              map.getView().animate({center:location,zoom:18});
              //      }
              //  }

        temp_layer1 = new ol.layer.Image({
            source: new ol.source.ImageWMS({
              crossOrigin: 'anonymous',
                url:'http://192.168.0.171:8080/geoserver/wms',
                projection:'EPSG:4326',
                params:{
                LAYERS: 'Map:'+value1.toString()}
            }),
            projection: "EPSG:4326",
           // opacity:0.5,
        });
        temp_layer2 = new ol.layer.Image({
            source: new ol.source.ImageWMS({
              crossOrigin: 'anonymous',
                url:'http://192.168.0.171:8080/geoserver/wms',
                projection:'EPSG:4326',
                params:{
                LAYERS: 'Map:'+value2.toString()}
            }),
            projection: "EPSG:4326",
            //opacity:0.5,
        });
//        map_2.addLayer(ibuild_vectorLayer);
//        map_2.addLayer(demolition_vectorLayer);
        map.addLayer(temp_layer2);
        map_2.addLayer(temp_layer1);

map.getView().animate({zoom:18,center:ol.proj.fromLonLat(center)});
        //map2.show();

        //map2.css("visibility","visible");
        map2.css('display','block')

        map2.on("click",function aa(e){
        e.stopPropagation();
        if(click_status){
        map1.on('mousemove',event_map1);
        map2.on('mousemove',event_map2);
        click_status=false;

        }else{
        click_status=true;
         var  offsetX=e.pageX,offsetY=e.y,width=document.body.clientWidth,height=document.body.clientHeight;
        document.getElementById('map_2').style.clip='rect(0px,'+offsetX+'px,'+height+'px,0px)';
        map1.off('mousemove');
        map2.off('mousemove');

        }}
);

        map1.on("click",function aa(e){
        e.stopPropagation();
        if(click_status){
        map1.on('mousemove',event_map1);
        map2.on('mousemove',event_map2);
        click_status=false;

        }else{
        click_status=true;
         var  offsetX=e.pageX,offsetY=e.y,width=document.body.clientWidth,height=document.body.clientHeight;
        document.getElementById('map_2').style.clip='rect(0px,'+offsetX+'px,'+height+'px,0px)';
        map1.off('mousemove');
        map2.off('mousemove');

        }}
);
        map1.on('mousemove',event_map1);
        map2.on('mousemove',event_map2);
        iscompare=true;
        $("#compare_span").text('取消对比');
        }
    });

function click_map1(e){

        e.stopPropagation();
        if(click_status){}else{
        var  offsetX=e.pageX,offsetY=e.y,width=document.body.clientWidth,height=document.body.clientHeight;

        document.getElementById('map_2').style.clip='rect(0px,'+offsetX+'px,'+height+'px,0px)';
        }

}
function click_map2(e){

        e.stopPropagation();
        if(status){
        map1.on('mousemove');
        map2.on('mousemove');
        status=false;
        }else{
        status=true;
         var  offsetX=e.pageX,offsetY=e.y,width=document.body.clientWidth,height=document.body.clientHeight;
        document.getElementById('map_2').style.clip='rect(0px,'+offsetX+'px,'+height+'px,0px)';
        map1.off('mousemove');
        map2.off('mousemove');
        }




}
    function event_map1(e){

        e.stopPropagation();
        var  offsetX=e.pageX,offsetY=e.y,width=document.body.clientWidth,height=document.body.clientHeight;

        document.getElementById('map_2').style.clip='rect(0px,'+offsetX+'px,'+height+'px,0px)';
    }
    function event_map2(e){

        e.stopPropagation();
        var  offsetX=e.pageX,offsetY=e.y,width=document.body.clientWidth,height=document.body.clientHeight;

        document.getElementById('map_2').style.clip='rect(0px,'+offsetX+'px,'+height+'px,0px)';
    }
});