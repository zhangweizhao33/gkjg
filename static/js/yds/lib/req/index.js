function indexFn() {
  require(['jquery', 'echarts'], function($, echarts) {
    console.log(echarts)
      $(function() {
          buildData();
      });

      function buildData() {
          //定义数据结构
          var datas = {
              'colors': ['#006699', '#4cabce', '#e5323e'],
              'xAxis': ['品牌一', '品牌二', '品牌三', '品牌四', '品牌五', '品牌六', '品牌七', '品牌八'],
              'legend':['好','中','差'],
              'list': [{
                  'title': '1.您最熟悉的品牌',
                  'series': [[9, 30, 45, 40, 20, 38, 50, 40]],
                  'elid': 'first'
              },
                  {
                      'title': '2.正在使用的传感品牌',
                      'series': [[9, 30, 45, 40, 20, 38, 50, 5]],
                      'elid': 'second'
                  },
                  {
                      'title': '信息统计',
                      'series': [[9, 30, 45, 40, 20, 38, 50, 10],[58, 8, 20, 53, 22, 52, 30, 60]],
                      'elid': 'three'
                  },
                  {
                      'title': '4.您对正在使用的品牌质量的满意程度',
                      'series': [[9, 30, 45, 40, 20, 38, 50, 60],[60, 50, 48, 30, 45, 5, 55, 20],[58, 8, 20, 53, 22, 52, 30, 40]],
                      'elid': 'four'
                  },
                  {
                      'title': '5.您觉得品牌的期货如何',
                      'series': [[9, 30, 45, 40, 20, 38, 50, 10],[60, 50, 48, 30, 45, 5, 55, 40],[58, 8, 20, 53, 22, 52, 30, 10]],
                      'elid': 'five'
                  },
                  {
                      'title': '6.您觉得售前与售后服务如何',
                      'series': [[9, 30, 45, 40, 20, 38, 50, 30],[60, 50, 48, 30, 45, 5, 55, 40],[58, 8, 20, 53, 22, 52, 30, 60]],
                      'elid': 'six'
                  },
                  {
                      'title': '7.年度最受欢迎的品牌',
                      'series': [[9, 30, 45, 40, 20, 38, 50, 10]],
                      'elid': 'seven'
                  }
              ]
          };
          for (var i = 0; i < datas['list'].length; i++) {
              canvasEcharts(datas, i);
          }
      }

      function canvasEcharts(json, index) {
          var obj = json['list'][index];
          var myChats = echarts.init(document.getElementById(obj['elid']));
          var option = {
              title: {
                  text: obj['title'],
                  // subtext: index==0?'数据来自投票结果而时时变化':''  //只有第一个要副标题
                  //主标题文本超链接
                  //link: 'http://www.xxxxxxxxxx',
//                subtext: '数据来自投票结果而时时变化'
              },
              color: ['#006699', '#4cabce', '#e5323e'],
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              toolbox: {
                  //显示策略，可选为：true（显示） | false（隐藏），默认值为true
                  show: true,
                  //垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                  y: 'center',
                  feature: {
                      //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
                      saveAsImage: { show: true }
                  }
              },
              legend: {
                  left: "70%",
                  data: ['好', '中', '差']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true,
              },
              xAxis: [{
                  min: 0,
                  //坐标轴类型，横轴默认为类目型'category'
                  type: 'category',
                  data: json['xAxis']
              }],
              yAxis: [{
                  min: 0,
                  max: 60,
                  //坐标轴类型，纵轴默认为数值型'value'
                  type: 'value'
              }],
              series: (function(){
                  var arr=[];
                  for (var i = 0; i < obj['series'].length; i++) {
                      var thisobj={
                          name: json['legend'][i],
                          type: 'bar',
                          barWidth: '15%',
                      };
                      thisobj.data=obj['series'][i];
                      arr.push(thisobj)
                  }
                  return arr
              })()
          };
          //为echarts对象加载数据
          myChats.setOption(option, true);
      }

  });
}

require(['config'], indexFn);