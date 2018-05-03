(function($){
	$.fn.myScroll = function(options){
	//默认配置
	var defaults = {
		speed:40,  //滚动速度,值越大速度越慢
		rowHeight:24 //每行的高度
	};
	var opts = $.extend({}, defaults, options),intId = [];
	function marquee(obj, step){
		obj.find(".tbody").animate({
			marginTop: '-=1'
		},0,function(){
				var s = Math.abs(parseInt($(this).css("margin-top")));
				if(s >= step){
					$(this).find("tr").slice(0, 1).appendTo($(this));
					$(this).css("margin-top", 0);
				}
			});
		}
		
		this.each(function(i){
			clearInterval(intId[i]);
			var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
			intId[i] = setInterval(function(){
				if(_this.find("tbody").height()<=_this.height()){
					clearInterval(intId[i]);
				}else{
					marquee(_this, sh);
				}
			}, speed);
		});
	}

})(jQuery);
//地图
$('#document').ready(function(){
	 getEcharts();
});
// 地图填充背景，不能直接用路径
function getEcharts(){
    require.config({
        paths: {
            echarts: './js'
    }
});
require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
        var myChart2 = ec.init(document.getElementById('map'));
        myChart2.setOption({
			tooltip : {
	            trigger: 'item',
	            /*设置弹出框*/
	            formatter: function (params,ticket,callback){
	                return "";
	            },
				axisPointer:{
				},
				textStyle: {
					color:"#000"/***/
				},
				backgroundColor: 'rgba(0,0,0,0)',/**提示框颜色*/
	       },
			series : [
				{
					type: 'map',
					roam: false,/*是否可拖拽*/
					hoverable: false,
					mapType: 'china',
					itemStyle:{
						normal:{
							borderColor:"#213350",/**线条颜色*/
							borderWidth:1,/**线条宽*/
							areaStyle:{
								color: 'rgba(255,255,255,0.1)',/**地图颜色*/
							}
						},
						emphasis:{
							areaStyle:{
								color: '#FCF9F4',/**鼠标移入地图颜色*/
							}
						}
					},
					data:[],
					geoCoord:arrmap,
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 15 + v/10
						},
						itemStyle:{
							normal:{
								color:"#0e91fc",/**圆圈颜色*/
							},
						},
						effect : {
							show: true,
							shadowBlur : 0
						},
						data : AllName
					}
				},
				{
					type: 'map',
					mapType: 'china',
					data:[],
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 0.1
						},
						effect : {
							show: false,
							shadowBlur : 0
						},
						itemStyle:{
							normal:{
								label:{show:true,
										    position:'top',
										    textStyle: {
												fontSize: 14,/*字体大小**/
		                                        color:"#000",/*字体颜色**/
		                                        borderColor:"#000",
											},
											formatter:function(params){
												//return params.name
											}
										}
								},
								emphasis: {
									label:{show:false}
								}
							},
							data :AllName
						}
					}
				]
        });
       
	});
}
//饼图
var data=[
                {value:30, name:'机械设备 30%'},
                {value:20, name:'建筑器材 20%'},
                {value:17, name:'能源化工 17%'},
                {value:16, name:'五金电子 16%'},
                {value:9, name:'农林牧渔 9%'},
                {value:6, name:'企业服务 6%'},
                {value:2, name:'生活服务 2%'},
                {value:1, name:'其它 1%'}
            ]
//var pie = document.getElementById("pie");
//var PieyChart = echarts.init(pie);
var app = {};
optionpie = null;
optionpie = {
    tooltip : {
        trigger: 'item',
        formatter: function (params,ticket,callback){
	           return params.name
	    },
    },
    legend: {
        x : '80%',
        y : 'top',
        itemGap:30,
        itemHeight:12,
        itemWidth:18,
        textStyle:{
        	color: '#6C86AA',
        	padding: [0, 0,0, 10]
        },
        orient: 'vertical',
        data:['机械设备 30%','建筑器材 20%','能源化工 17%','五金电子 16%','农林牧渔 9%','企业服务 6%','生活服务 2%','其它 1%']
    },
    toolbox: {
        show : false,
    },
    calculable : false,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [55, 250],
            center : ['35%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            data:data
        },
    ],
    color: ['#15b0fd','#407bec','#7160f9','#9b41fe','#b629fc','#ae0abe','#bd2381','#c4265c']
};
;
if (optionpie && typeof optionpie === "object") {
//  PieyChart.setOption(optionpie, true);
}
//window.onresize = PieyChart.resize;

//折线图
var areaChart = document.getElementById("area");
var areamyChart = echarts.init(areaChart);
var areaAata=[20, 40, 30, 60, 50];
var coordinateX=['03-01', '03-08', '03-15', '03-22', '03-30'];
areaoption = null;
areaoption = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        offset:0,
        axisTick:{show: false,},
        nameTextStyle:{
        	padding: [20, 0, 0, 0]
        },
        axisLine:{
            lineStyle:{
                color:'#647c9d',
                 width:0,
            }
        } ,
        data: coordinateX
    },
    yAxis: [
	    {
	    	name:"",
            type : 'value',
            axisTick:{show: false},
            offset:12,
            splitLine:{
            	show: true,
            	lineStyle: {
            		type:"dotted",
			        color: ['#647c9d']
			    }
            },
            axisLine:{
                lineStyle:{
                    color:'#647c9d',
                     width:0,
                }
            } ,
            axisLabel:{formatter:'{value}%'}
       }
       
    ],
    series: [{
            name:'',  
            smooth:true, 
            data:areaAata,
            type: 'line',
            yAxisIndex: 0,
            areaStyle: {
            	color: {
				    type: 'linear',
				    x: 0,
				    y: 0,
				    x2: 0,
				    y2: 1,
				    colorStops: [{
				        offset: 0, color: 'rgba(244,47,163,0.8)' // 0% 处的颜色
				    }, {
				        offset: 1, color: 'rgba(0, 204, 255,0.2)' // 100% 处的颜色
				    }],
				    globalCoord: false // 缺省为 false
				}
            },
    },
    ]
};
if (areaoption && typeof areaoption === "object") {
    areamyChart.setOption(areaoption, true);
}
window.onresize = areaoption.resize;


//$('.tableOne').myScroll({
//	speed:30, //数值越大，速度越慢
//	rowHeight:47 //li的高度
//});
//$('.tableTow').myScroll({
//	speed:30, //数值越大，速度越慢
//	rowHeight:47 //li的高度
//});

/*点击切换折线图数据**/

$("#areaAbt button").click(function(){
	var index=$(this).index()
	if(index==0){
		//近一月
		areaAata=[20, 40, 30, 60, 50];
		coordinateX=['03-01', '03-08', '03-15', '03-22', '03-30'];
	}else if(index==1){
		//近三月
		areaAata=[20, 40, 30];
		coordinateX=['1月', '二月', '三月'];
	}else if(index==2){
		//近六月
		areaAata=[20, 40, 30,80,100,120];
		coordinateX=['十月','十一月','十二月','一月', '二月', '三月'];
	}else if(index==3){
		//近六月
		areaAata=[20,40,30,80,100,120,20,40,30,80,100,120];
		coordinateX=['201704','201705','201706','201707','201708','201709','201710','201711','201712','201801', '201802', '201803'];
	}
	areaoption.xAxis.data=coordinateX;
	areaoption.series[0].data=areaAata;
	areamyChart.setOption(areaoption, true);
	$(this).addClass("areaAbtactive").siblings().removeClass("areaAbtactive")
})
