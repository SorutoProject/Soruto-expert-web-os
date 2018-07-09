var appPausing;
var newlaunchapp;
var nowlaunchapp = false;
var appColor = false;
var infoTime = false;
window.onload = function(){
  document.getElementById("applist").innerHTML = applist;
  document.getElementById("pname").innerHTML = pname;
  timeUpdate();
  window.setInterval("timeUpdate()",500);
  var userAgent = window.navigator.userAgent.toLowerCase();

	if(userAgent.indexOf('msie') != -1 ||userAgent.indexOf('trident') != -1) {
    	document.getElementById("applist").innerHTML = "Soruto expert Web OSはInternet Explorerをサポートしていません。";
		document.getElementById("applist").style.color = "#000";
	   return false;
	}
}
function timeUpdate(){
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var min = time.getMinutes();
	var dayOfWeek = time.getDay() ;
	var dayOfWeekStr = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ][dayOfWeek] ;
	document.getElementById("timebar").innerHTML = year + "年" + month + "月" + date + "日(" + dayOfWeekStr + ")&nbsp;&nbsp;" + hour + "時" + min + "分"　+ "&nbsp;&nbsp;";
}
//アプリ起動
function appRun(aid){
  if(aid == nowlaunchapp){
	  appRestart();
  }
  else if(appPausing === true && nowlaunchapp !== undefined){
	  newlaunchapp = aid;
	  smodal.confirm({
		  title:"<b>確認</b>",
		  message:"\"" + nowlaunchapp + "\" → \"" + newlaunchapp + "\"<br>中断中のアプリを終了して新しく起動しますか？",
		  okFunction:'closeAndRunApp();',
		  okButtonValue:"はい",
		  cancelButtonValue:"いいえ",
		  backClose:true,
		  width:"400px",
		  height:"200px"
	  });
  }else{
  var url = "apps/" + aid + "/index.html";
  var newappbody = '<iframe src="' + url + '" class="appframe">';
  var appbody = document.getElementById("appbody");
  appbody.innerHTML = newappbody;
  appbody.style.display = "block";
  appbody.className = "appopening";
  nowlaunchapp = aid;
  document.getElementById("menu").style.display = "block";
  document.getElementById("pname").textContent = aid;
  }
}
//アプリ中断
function appPause(){
  if(nowlaunchapp === false){
	  smodal.alert({
		  title:"<b>情報</b>",
		  message:"現在、アプリは中断されていないため、<br>ホームボタンは使用できません",
		  backClose:true
	  })
  }else{
  var appbody = document.getElementById("appbody");
  appbody.className = "appclosing";
  document.getElementById("pauseButton").onclick = new Function("appRestart();");
  appPausing = true;
  document.getElementById("timebar").style.background = document.getElementById("menu").style.background = 'rgba(0,0,0,0.5)';
  document.getElementById("pname").textContent = pname;
  document.getElementById("pauseButton").style.border = "#fff 2px solid";
  }  
}
//アプリ再開
function appRestart(){
  if(nowlaunchapp === undefined){
	  
  }else{
  var appbody = document.getElementById("appbody");
  appbody.className = "appopening";
  document.getElementById("pname").textContent = nowlaunchapp;
  document.getElementById("pauseButton").onclick = new Function("appPause();");
  appPausing = false;
  if(appColor !== false){
		menuColor(appColor);
	}
  }
}
function closeAndRunApp(){
  appPausing = false;
  var newRunAppId = newlaunchapp;
  appColor = false;
  appRun(newRunAppId);
}
function menuColor(c){
	var fontColor = blackOrWhite(c);
	if(fontColor == "white"){
		document.getElementById("timebar").style.color = document.getElementById("menu").style.color = document.getElementById("pname").style.color = "rgba(255,255,255,1)";
		document.getElementById("pauseButton").style.border = "#fff 2px solid";
	}else if(fontColor == "black"){
		document.getElementById("timebar").style.color = document.getElementById("menu").style.color = document.getElementById("pname").style.color = "rgba(0,0,0,1)";
		document.getElementById("pauseButton").style.border = "#3c3c3c 2px solid";
	}
	document.getElementById("timebar").style.background = document.getElementById("menu").style.background = c;
	appColor = c;
}
//背景色に適した色の判断
function blackOrWhite ( hexcolor ) {
	var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
	var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
	var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

	return ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;
}
function showInfo(s){
	document.getElementById("info").innerHTML = s;
	document.getElementById("info").style.display = "block";
	window.setTimeout(function(){
	document.getElementById("info").style.display = "none";
	},4000);
}
function showAppInfo(name,s){
	document.getElementById("info").innerHTML = "<b>" + name + '</b><br><span style="font-size:10pt;">' + s + "</span>";
	document.getElementById("info").onclick = new Function("appRestart()");
	document.getElementById("info").style.display = "block";
	if(infoTime !== false){
		clearTimeout(infoTime);
	}
	infoTime = window.setTimeout(function(){
	document.getElementById("info").style.display = "none";
	},4000);
}