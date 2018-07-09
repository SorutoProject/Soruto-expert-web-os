//Study Suggester Top Menu
//グローバル変数の設定
var questions = null;
var mode = null;
var min = 1 ;
var max = null;
if(!localStorage.quesno!=undefined){
	var quesnum  = parseInt(localStorage.quesno);
}else{
	var quesnum = 20;
}
var answered = 0;//解いた問題の数
var num = null;
var queslist = null;
var anstext = null;
//メインメニュー設定
var main = null;
var bl = '<a href="javascript:void(0)" onclick="change(\'top\')" class="bp">← 戻る</a><br>'
window.onload = function(){
	main = document.getElementById("main");
	main.innerHTML = '<a href="javascript:void(0);" onclick="change(\'jp\')" class="sl">国語</a><a href="javascript:void(0);" onclick="change(\'ma\')" class="sl">数学</a><a href="javascript:void(0);" onclick="change(\'sc\')" class="sl">社会</a>';
	tippy('.title', {
  delay: 100,
  arrow: true,
  duration: 200,
  placement: 'left'
});
	parent.menuColor("#166b20");//Soruto OS カラー設定
}
function change(n){
	if(n=="jp"){
		var sc = "現在、項目はありません。";
	}
	else if(n=="ma"){
		var sc = "現在、項目はありません。";
	}
	else if(n=="sc"){
		var sc = '<a href="javascript:void(0)" onclick="showQdiv(\'rekishi-nenpyo-sample\')" class="sl">歴史サンプル問題</a><a href="javascript:void(0)" onclick="showQdiv(\'syakai-edo-sengo\')" class="sl">江戸・戦後</a>';
	}
	else if(n=="top"){
		main.innerHTML = '<a href="javascript:void(0);" onclick="change(\'jp\')" class="sl">国語</a><a href="javascript:void(0);" onclick="change(\'ma\')" class="sl">数学</a><a href="javascript:void(0);" onclick="change(\'sc\')" class="sl">社会</a>';
		return false;
		
	}
	else{
		var sc = "指定されたメニューIDはありません。"
	}
main.innerHTML = bl + sc;
}
function Set(){
	smodal.alert({
		"title":"<b>設定</b>",
		"message":'通常出題する問題数<br><input type="number" id="NofQNo">問',
		"backClose":true,
		"height":"180px",
		"okFunction":"saveSet();",
		"okButtonValue":"保存"
	})
	if(localStorage.quesno != undefined){
		document.getElementById("NofQNo").value=localStorage.quesno;
	}
}
function saveSet(){
	localStorage.quesno = document.getElementById("NofQNo").value;
	quesnum = localStorage.quesno;
}
function showQdiv(q){
	smodal.alert({
		"title":"<b>問題</b>",
		"message":'<div id="empty"></div><div id="titlebar"><span id="title">読み込み中...</span></div><div id="terminal"><div id="question"></div><input type="text" id="answer" onkeydown="key_on(event)"><br><input type="button" onclick="ans();" value="解答" id="ansb"></div>',
		"okButtonValue":"やめる",
		"width":"calc(100% - 60px)",
		"height":"calc(100% - 50px)"
		});
	answered = 0;
	Load(q);
	
	
}
function Load(q){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "txtdb/" + q + ".txt", true);
  xhr.onreadystatechange = function(){
    // 本番用
    if (xhr.readyState === 4 && xhr.status === 200){
		questions = xhr.responseText;
		max = questions.split("\n").length - 1;
		queslist = questions.split("\n");
		var title = queslist[0].split(",")[0];
		document.getElementById("title").innerHTML = title//タイトルの表示
	    mode = queslist[0].split(",")[1];
		document.title = title + " - Study Suggester";
		next();
    }
    // ローカルファイル用
    if (xhr.readyState === 4 && xhr.status === 0){
      questions = xhr.responseText;
	  max = questions.split("\n").length - 1;
	  queslist = questions.split("\n");
	  var title = queslist[0].split(",")[0];
	  document.getElementById("title").innerHTML = title//タイトルの表示
	  mode = queslist[0].split(",")[1];
	  document.title = title + " - Study Suggester";
	  next();
    }
	if(xhr.readyState === 4 && xhr.status === 404){
	document.getElementById("question").innerHTML = '問題定義ファイルが見つかりません。<br>トップメニューからやり直してください。。<br><a href="../">トップメニューへ</a>';
	document.getElementById("title").innerHTML = "Error!";
	document.getElementById("answer").style.display = "none";
	document.getElementById("ansb").style.display = "none";
	}
  };
  xhr.send(null);
};
function next(){
if(answered >= quesnum){
document.getElementById("question").innerHTML = 'これで問題は終わりです。<br>お疲れ様でした。<br>※出題問題数はトップメニューの設定ボタンから変更できます。<br><a href="javascript:void(0);" onclick="reload();">もう一度この問題を解く</a>';
document.getElementById("answer").style.display = "none";
document.getElementById("ansb").style.display = "none";
document.getElementById("smodal-ok-button").value = "トップへ";
}else{
answered = answered + 1;
num = Math.floor( Math.random() * (max + 1 - min) ) + min ;;//問題No.の作成
document.getElementById("answer").value = "";
document.getElementById("answer").focus();
var ques = queslist[num].split(",");
document.getElementById("question").innerHTML = ques[0];
anstext = decodeURI(encodeURI(ques[1]).split("%0D").join(""));//改行コード%0Dを削除
}
}
function ans(){
var ans = document.getElementById("answer").value;
if(ans == anstext){
next();
}
else if(ans==""){
so.modal.al("入力されていません","解答が入力されていません。");
}else{
so.modal.al("不正解","不正解です。<br>もう一度解いてみましょう。");
}
}
function bans(n){
var ans = document.getElementById("b" + n).value;
if(ans == anstext){
	next();
}else{
	so.modal.al("不正解","不正解です。<br>もう一度解いてみましょう。");
}	
}
function key_on(event){
if(event.keyCode == 13){
ans();
}else if(event.keyCode == 243){
 smodal.close();
}
}
function reload(){
	answered = 0;
	next();
document.getElementById("smodal-ok-button").value = "やめる";
document.getElementById("answer").style.display = "inline";
document.getElementById("ansb").style.display = "inline";
}
