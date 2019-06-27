$(function(){
            var chart = Highcharts.chart('container', {
    chart: {
        spacing : [20, 0 , 20, 0]
    },
    title: {
      //  align:'right',
//        x:20,
//        y:50,
        verticalAlign:'top',
        floating:true,
        text: '',
        useHTML:true,
        style: {
        fontSize: '20px'

  },
text:'总面积：0平方公里'
    },
     subtitle: {
        align:'left',
//        x:20,
       // y:100,
        verticalAlign:'top',
        floating:true,
        text: '',
        useHTML:true,
        style: {
        fontSize: '20px'

  },

    },
    exporting: {
            enabled:false
},
//不显示导出按钮
credits: {
          enabled:false
},
//不显示右下角版权信息
    tooltip: {
        headerFormat:'<p style="font-size:20px">{point.key}</p> <br> ',
        pointFormat: ' <p>{series.name}: <b>{point.percentage:.1f}%</b></p> '
        ,style:{
				fontSize:'20px',
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
            dataLabels: {
                enabled: true,
                format: '{point.y}平方公里 ',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    fontSize:'14px'
                }
            },
            point: {
                events: {
                    mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                        // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                        chart.setTitle(null,{
                            text:e.target.name+'\t'+ e.target.y+'平方公里'+'<br>'+ '\t'+ '区域占地：'+e.target.percentage + ' %',
                        }
                        );
                    }
                    ,
//                     click: function(e) { // 同样的可以在点击事件里处理
//                         chart.setTitle({
//                             text: e.point.name+ '\t'+ e.point.percentage + ' %'
//                         });
//                     }
                }
            },
        }
    },
    legend:{
        itemStyle:{
            fontSize:"15px",
            fontWeight:'400'
        },
        align:'right',
        x:-50,
        y:50,
        verticalAlign:'top',
        floating:true,
        layout: 'vertical'
    },
    series: [{
        type: 'pie',
        innerSize: '80%',
        name: '区域占地',
        style: {
    fontSize: '20px'
  },
        data: [
            {name:'农田',   y: 500, url : 'http://bbs.hcharts.cn'},
            ['其他',       50],
            {
                name: '大棚',
                y: 100,
                sliced: true,
                selected: true,
                url: 'http://www.hcharts.cn'
            },
            ['森林',    100],
            ['道路',     50],
            ['水域',   100],
            ['房屋',   100],
        ]
    }]
}, function(c) { // 图表初始化完毕后的会掉函数
    // 环形图圆心
    var centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
    // 动态设置标题位置
    c.setTitle({
        y:centerY + titleHeight/2
    });
});
function getNow(s) {
    return s < 10 ? '0' + s: s;
}
$("#download_btn").click(function(){
var myDate = new Date();
//获取当前年
var year=myDate.getFullYear();
//获取当前月
var month=myDate.getMonth()+1;
//获取当前日
var date=myDate.getDate();
var h=myDate.getHours();       //获取当前小时数(0-23)
var m=myDate.getMinutes();     //获取当前分钟数(0-59)
var s=myDate.getSeconds();

var now=year+'-'+getNow(month)+"-"+getNow(date);
var select=document.getElementById("imagery")
        var index = selection1.selectedIndex;
        var text=select.options[index].text
chart.exportChart({
    type: 'application/pdf',
    filename: text+now
});


})
    $(".yy-sure").click(function(){
       $("#container").css("display","block")
    })
    //实时监听浏览器大小
    $(window).resize(function(){
    var Height = $(window).height();
    var Width = $(window).width();
    console.log(Width);
    setSize(Width,Height*.8)
})

    function setSize(width,height) {
	    chart.setSize(width,height);
    }
    selection1=document.getElementById("imagery");
    var maps_list;
    $.ajax({
            type:'get',
            url:'/_map_inquiry/',
            data: {
            },
            success:function(d_maps){

                maps_list=JSON.parse(d_maps['maps']);
                maps_list=maps_list['maps'];


                for(var m in maps_list){
                    area=maps_list[m]['area'];

                    time=maps_list[m]['capture_time'];
                    id=maps_list[m]['id'];

                    selection1.add(new Option(area+time,id))
                    selection1.options[0].text="请选择影像"


                }
            }
         });
         $("#confirm_button").click(function(){
var index1 = selection1.selectedIndex;
var area=maps_list[index1-1]['mask_area'];
                chart.series[0].update({
                  data: [
            {name:'农田',   y: area[5], url : 'http://bbs.hcharts.cn'},
            ['其他',       area[0]],
            {
                name: '大棚',
                y: area[6],
                sliced: true,
                selected: true,
                url: 'http://www.hcharts.cn'
            },
            ['森林',    area[7]],
            ['道路',     area[2]],
            ['水域',   area[4]],
            ['房屋',   area[1]],
        ]

                });
                var wholearea=0;
             for(var i in area){
             wholearea+=area[i];


             }
                chart.setTitle({text:"总面积："+wholearea+"平方公里"});


         })
//    $.ajax({
//            type:'get',
//            url:'/map_all/',
//            success:function(result){
//
//                var area=result['area'];
//
//                chart.series[0].update({
//                  data: [
//            {name:'农田',   y: area[0], url : 'http://bbs.hcharts.cn'},
//            ['其他',       area[1]],
//            {
//                name: '大棚',
//                y: area[2],
//                sliced: true,
//                selected: true,
//                url: 'http://www.hcharts.cn'
//            },
//            ['森林',    area[3]],
//            ['道路',     area[4]],
//            ['水域',   area[5]],
//            ['房屋',   area[6]],
//        ]
//
//                });
//
//            },
//            error:function(){
//                alert('查询失败');
//            }
//         });
});