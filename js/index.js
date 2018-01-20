/*
* @Author: qiqi
* @Date:   2018-01-19 11:47:36
* @Last Modified by:   qiqi
* @Last Modified time: 2018-01-20 15:37:17
*/
var weather;
var city;
// 请求太原天气情况
 $.ajax({
 	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
 	dataType:"jsonp",
 	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather.city_name);
		// console.log(weather);
 	}
 })

// 请求城市
$.ajax({
  url:"https://www.toutiao.com/stream/widget/local_weather/city/",
  dataType:"jsonp",
  type:"get",
  success:function(obj){
    city=obj.data;
    // console.log(weather.city_name);
    // console.log(city);
  }
})
// 渲染数据
function update(){
	// 渲染城市
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
	// 渲染当前温度
	var cityWendu=document.getElementsByClassName("tatle1")[0];
	cityWendu.innerHTML=weather.current_temperature+"°";
	// 渲染当前天气
	var cityWeather=document.getElementsByClassName("tatle2")[0];
	cityWeather.innerHTML=weather.dat_condition;
	// 渲染今天最高温度
	var dayHighWendu=document.getElementById("dat_high_temperature");
	dayHighWendu.innerHTML=weather.dat_high_temperature;
	// 渲染今天最低温度
	var dayLowWendu=document.getElementById("dat_low_temperature");
	dayLowWendu.innerHTML=weather.dat_low_temperature;
	// 渲染今天天气
	var dayWeather=document.getElementById("dat_condition");
	dayWeather.innerHTML=weather.day_condition;
	// 渲染明天天气
	var tomorrowWeather=document.getElementById("tomorrow_condition");
	tomorrowWeather.innerHTML=weather.tomorrow_condition;
	// 渲染今天图片
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image: url(img/${weather.dat_weather_icon_id}.png);`;
	// 渲染明天图片
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image: url(img/${weather.tomorrow_weather_icon_id}.png);`;
	// 渲染明天最高温度
	var tomorrowHighWendu=document.getElementById("tomorrow_high_temperature");
	tomorrowHighWendu.innerHTML=weather.tomorrow_high_temperature;
	// 渲染明天最低温度
	var tomorrowLowWendu=document.getElementById("tomorrow_low_temperature");
	tomorrowLowWendu.innerHTML=weather.tomorrow_low_temperature;
  // 实时天气
  for(var i in weather.hourly_forecast){
  // 创建父元素的div
  var now=document.createElement("div");
  // 给父元素div加样式
  now.className="now";
  // 获取now的父元素
  var nowp=document.getElementById("now");
  // 把now插入到父元素中
  nowp.appendChild(now);
  // 现在的时间
  var now_time=document.createElement("h2");
  now_time.className="now_time";
  now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
  now.appendChild(now_time);
  // 现在的图片
  var now_icon=document.createElement("div");
  now_icon.className="now_icon";
  now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`
  now.appendChild(now_icon);
  // 现在的温度
  var now_temperature=document.createElement("h3");
  now_temperature.className="now_temperature";
  now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
  now.appendChild(now_temperature);
  }
  // 给父元素div加样式，近日天气
  for(var g in weather.forecast_list){ 

  
  var recent=document.createElement("div");
  recent.className="recent";
  // 获取recent的父元素
  var recentp=document.getElementById("recent");
  // 把recent插入到父元素中	 
  recentp.appendChild(recent);

  var recent_time=document.createElement("div");
  recent_time.className="recent_time";
  // recent_time.innerHTML=weather.forecast_list[g].date;
  recent.appendChild(recent_time);
  console.log(weather.forecast_list[g].date.substring(5,7));
  console.log(weather.forecast_list[g].date.substring(8));
  var month=document.createElement("span");
  month.className="month";
  month.innerHTML=weather.forecast_list[g].date.substring(5,7)+"/";
  recent_time.appendChild(month);
  var day=document.createElement("span");
  day.className="day";
  day.innerHTML=weather.forecast_list[g].date.substring(8);
  recent_time.appendChild(day);

  // 近日天气
  var recent_weather=document.createElement("h2");
  recent_weather.className="recent_weather";
  recent_weather.innerHTML=weather.forecast_list[g].condition;
  recent.appendChild(recent_weather);
  //近日图片 
  var recent_pic=document.createElement("div");
  recent_pic.className="pic";
  recent_pic.style=`background-image:url(img/${weather.hourly_forecast[g].weather_icon_id}.png);`
  recent.appendChild(recent_pic);
  // 近日最高温度
  var recent_high=document.createElement("h3");
  recent_high.className="recent_high";
  recent_high.innerHTML=weather.forecast_list[g].high_temperature+"°";
  recent.appendChild( recent_high);
  // 近日最低温度   
  var recent_low=document.createElement("h4");
  recent_low.className="recent_low";
  recent_low.innerHTML=weather.forecast_list[g].low_temperature+"°";
  recent.appendChild( recent_low);
  // 近日风向
  var recent_wind=document.createElement("h5");
  recent_wind.className="recent_wind";
  recent_wind.innerHTML=weather.forecast_list[g].wind_direction;
  recent.appendChild(recent_wind);
  //近日风级 
  var recent_level=document.createElement("h6");
  recent_level.className="recent_level";
  recent_level.innerHTML=weather.forecast_list[g].wind_level+"级";
  recent.appendChild( recent_level);
  }
  var header=document.getElementsByClassName("header")[0];
  var city_box=document.getElementsByClassName("city_box")[0];
  // 点击事件
  header.onclick=function(){
    $(".text").val("");
    $(".button").html("取消");
    city_box.style="display:block";  
    // 出现用display:block
  }
  // 渲染城市
  for(var k in city){  
    // 一级城市
    // console.log(k);
    var cityp=document.getElementById("city");
    var r1=document.createElement("h1");
    r1.className="r1";
    r1.innerHTML=k;
    // cityp是父亲，r1是孩子,cityp可以是city,cityp只是为了防止重复
    cityp.appendChild(r1);

    var con=document.createElement("div");
    con.className="con";
    for(var y in city[k]){
     // 二级城市
     // console.log(y);
     var erji=document.createElement("div");
     erji.className="son";
     erji.innerHTML=y;
     con.appendChild(erji);
    }
    cityp.appendChild(con);
  }
}
// 查找各个城市的天气信息
function AJAX(str){
  $.ajax({
    url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
    dataType:"jsonp",
    type:"get",
    success:function(obj){
      weather=obj.data.weather;
      update();
      $(".city_box").css({"display":"none"});
    }
  })
}
// 当页面加载完成执行的代码
window.onload=function(){
	update();
  // 
  $(".son").on("click",function(){
    var cityh=this.innerHTML;
    AJAX(cityh);
  })
  // 当input获取焦点，即focus时，button变确认,html是设置或改变元素的内容
  $(".text").on("focus",function(){
    $(".button").html("确认");
  })
  // 操作按钮
  var button=document.getElementsByClassName("button")[0];
   // console.log(button);
  button.onclick=function(){
    // 获取button中的内容
    var btn=this.innerHTML;
    // console.log(btn);
    if(btn=="取消"){
       var city_box1=document.getElementsByClassName("city_box")[0];
       // console.log(city_box1);
       city_box1.style="display:none";
     // console.log(1);
    }
    else{
      var str1=document.getElementById("text").value;  
      //value获取值
      // console.log(str);
      // 一级城市
      for(var i in city){
          for(var j in city[i]){
            if(str1==j){
                 AJAX(str1);
                return;
            }
          }
      }
      alert("没有该城市的气象信息");  
    }      
  }
}

