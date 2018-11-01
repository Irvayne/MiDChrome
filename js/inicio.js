var ativo = false;
$('#iniciar').click(function(){
	ativo = true;
	execute();
	$("#iniciar").html('<span class="glyphicon glyphicon-compressed" aria-hidden="true"></span>	Finalzar Captura');
})




function execute(){
	if(ativo==true){
		chrome.tabs.executeScript({file: '/js/popup.js', allFrames: false});
	}
}
