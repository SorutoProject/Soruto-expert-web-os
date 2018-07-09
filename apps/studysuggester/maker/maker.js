window.onload = function(){
	var title = document.getElementById("title");
	title.focus();
}
window.onbeforeunload=function(e){return 'このページから出ると、すべてのタブの編集内容が失われますが、続行しますか?';}
function add(){
	var qvl = document.getElementById("q").value.split(",").join("、");
	var avl = document.getElementById("a").value.split(",").join("、");
	if(qvl==""){
		alert("問題が入力されていません。");
		document.getElementById("q").focus();
	}
	else if(avl==""){
		alert("答えが入力されていません。");
		document.getElementById("a").focus();
	}else{
		var qlist = document.getElementById("qlist");
		var qlistvl = qlist.value;
		if(qlistvl == ""){
			alert("問題を追加する前に、タイトルを入力してください");
	 }else{
		qlist.value = qlistvl + "\n" + qvl + "," + avl;
		document.getElementById("q").value = "";
		document.getElementById("a").value = "";
		document.getElementById("q").focus();
	}
	}	
}
function titleChange(){
	var qlist = document.getElementById("qlist");
	var titlevl = document.getElementById("title").value;
	if(titlevl == ""){
		alert("タイトルが入力されていません。");
		document.getElementById("title").focus();
	}else{
	var list = qlist.value.split("\n");
	list[0] = titlevl;
	qlist.value = list.join("\n");
	document.getElementById("q").focus();
	}
}
function fileDown(){
var content  = document.getElementById("qlist").value;
var name     = document.getElementById("filename").value;
var mimeType = "text/*";
if(name==""){
	alert("ファイル名を入力してください。")
	document.getElementById("filename").focus();
}else{
// BOMは文字化け対策
var bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
var blob = new Blob([bom, content], {type : mimeType});

var a = document.createElement('a');
a.download = name;
a.target   = '_blank';
a.id = "downloadlink";

if (window.navigator.msSaveBlob) {
  // for IE
  window.navigator.msSaveBlob(blob, name)
}
else if (window.URL && window.URL.createObjectURL) {
  // for Firefox
  a.href = window.URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
else if (window.webkitURL && window.webkitURL.createObject) {
  // for Chrome
  a.href = window.webkitURL.createObjectURL(blob);
  a.click();
}
else {
  // for Safari
  window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
}
}
}
function enter(event,num){
if(event.keyCode === 13){
	if(num==0){
		titleChange();
	}
	else if(num==1){
		document.getElementById("a").focus();
	}
	else if(num==2){
		add();
	}
	else if(num==3){
		fileDown();
	}
}
}