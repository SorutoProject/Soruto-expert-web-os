//Soruto expert web os controller
// Ver.1.0

var system = new Object;

// 自分自身が親(iframeで読み込まれていない場合)
if(window == window.parent) {
    alert('このアプリはSoruto expert web os内でのみ動作します');
}

//アプリ画面に強制移動
system.appRestart = function(){
	parent.appRestart();
}

//メニュー画面に強制移動(アプリを中断)
system.appPause = function(){
	parent.appPause();
}

//情報を表示
system.info = function(t,s){
	parent.showAppInfo(t,s);
}

//OSの情報バーなどの色を6桁のhexを指定して変更
system.changeColor = function(c){
	parent.menuColor(c);
}