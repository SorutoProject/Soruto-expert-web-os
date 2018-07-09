var smodal = new Object;
var bgevent  = null;//Background Event Var.
var maxindex = 0;
var maxindexElem;

//buttons Setting
var singleOkButtonValue = "OK"
var singleCancelButtonValue = "Cancel";
//modal
smodal.alert = function(options){
	var t = options.title;
	var str = options.message;
	var bclick = options.backClose;
	var f = options.okFunction;
	var width = options.width;
	var height = options.height;
	var okButton = options.okButtonValue;
	smodal.sysclose();
	var modal = document.createElement("div");
	modal.innerHTML = t + '<hr>' + str + '<br><input type="button" class="smodal-modal-button" id="smodal-ok-button">';
	var bg = document.createElement("div");
	smodal.close();
	if(width){
			modal.style.width = width;
	}
	if(height){
			modal.style.height = height;
	}
	modal.id= "smodal-modal";
	bg.id = "smodal-modal-bg";
	if(bclick === true){
	bg.addEventListener('click', smodal.close, false);
	}
	document.body.appendChild(modal);
	document.body.appendChild(bg);
	modal.className="smodal-modal-opening";
	var okb = document.getElementById("smodal-ok-button");
	okb.focus();
	if(okButton){
		okb.value = okButton;
	}else{
		okb.value = singleOkButtonValue;
    }
	if(f){
	okb.onclick = new Function("smodal.closeRun('" + f + "')");
	 if(bclick === true){
	document.getElementById("smodal-modal-bg").onclick = new Function("smodal.closeRun('" + f + "')");
	}
	}else{
	okb.onclick = new Function("smodal.close()");
	}
}
smodal.confirm = function(options){
	var t = options.title;
	var str = options.message;
	var bclick = options.backClose;
	var yf = options.okFunction;
	var nf = options.cancelFunction;
	var width = options.width;
	var height = options.height;
	var okButton = options.okButtonValue;
	var cancelButton = options.cancelButtonValue;
	smodal.sysclose();
	var modal = document.createElement("div");
	modal.innerHTML = t + '<hr>' + str + '<br><input type="button" class="smodal-modal-button" id="smodal-ok-button"> <input type="button" class="smodal-modal-button" id="smodal-cancel-button">';
	var bg = document.createElement("div");
	smodal.close();
	if(width){
			modal.style.width = width;
	}
	if(height){
			modal.style.height = height;
	}
	modal.id= "smodal-modal";
	bg.id = "smodal-modal-bg";
	if(bclick === true){
	bg.addEventListener('click', smodal.close, false);
	}
	document.body.appendChild(modal);
	document.body.appendChild(bg);
	modal.className="smodal-modal-opening";
	var okb = document.getElementById("smodal-ok-button");
	okb.focus();
	if(okButton){
	okb.value = okButton;
	}else{
	okb.value = singleOkButtonValue;
	}
	if(yf){
	okb.onclick = new Function("smodal.closeRun('" + yf + "')");
	}else{
	okb.onclick = new Function("smodal.close()");
	}
	var cancelb = document.getElementById("smodal-cancel-button");
	if(cancelButton){
		cancelb.value = cancelButton;
	}else{
		cancelb.value = singleCancelButtonValue;
	}
	if(nf){
	cancelb.onclick = new Function("smodal.closeRun('" + nf + "')");	
	}else{
	cancelb.onclick = new Function("smodal.close()");
	}
}
smodal.inIframe = function(options){
    var t = options.title;
	var str = options.message;
	var bclick = options.backClose;
	var url = options.url;
	var width = options.width;
	var height = options.height;
	smodal.sysclose();
	var modal = document.createElement("div");
	modal.innerHTML = t + '<br>' + str + '<br><iframe src="' + url + '" class="smodal-iframe">';
	var bg = document.createElement("div");
	smodal.close();
	if(width){
			modal.style.width = width;
	}
	if(height){
			modal.style.height = height;
	}
	modal.id= "smodal-modal";
	bg.id = "smodal-modal-bg";
	bg.addEventListener('click', smodal.close, false);
	document.body.appendChild(modal);
	document.body.appendChild(bg);
	modal.className="smodal-modal-opening";
}
smodal.close = function(){
	var modal = document.getElementById("smodal-modal");
	var bg = document.getElementById("smodal-modal-bg");
	if(modal){
	modal.className="smodal-modal-closing";
	}if(bg){
	document.body.removeChild(bg); 
	}
}
smodal.sysclose = function(){
	var modal = document.getElementById("smodal-modal");
	var bg = document.getElementById("smodal-modal-bg");
	if(modal){
	document.body.removeChild(modal);
	}if(bg){
	document.body.removeChild(bg); 
	}	
}
smodal.closeRun = function(f){
	smodal.close();
	eval(f);
}
