var ativo = false;
var xpaths = [];
$("#finalizar").hide();

$('#iniciar').click(function(){
	ativo = true;
	execute();
	$("#iniciar").hide();
	$("#finalizar").toggle();

})

$('#finalizar').click(function(){
	ativo = false;
	finalizar();
	$("#finalizar").hide();
	$("#iniciar").toggle();

})

chrome.runtime.onConnect.addListener(function(port) {
	port.onDisconnect.addListener(function(msg){
		console.log("nova pagina");
		chrome.tabs.executeScript({file: '/js/script.js', allFrames: false});
	});
  console.assert(port.name == "canal");
  port.onMessage.addListener(function(msg) {
  	if(ativo == true){
  		xpaths.push(msg.info);
  		document.getElementById("demo").innerHTML = xpaths.join(" * ");
  	}
  });
});


function execute(){
		chrome.tabs.executeScript({file: '/js/script.js', allFrames: false});
}

function finalizar(){
		console.log(xpaths);
}
