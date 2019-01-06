var ativo = false;
var xpaths = [];
$("#finalizar").hide();
$("#tabela").hide();

$('#iniciar').click(function(){
	ativo = true;
	execute();
	$("#iniciar").hide();
	$("#finalizar").toggle();
	$("#input").prop('disabled', true);
})

$('#finalizar').click(function(){
	ativo = false;
	$("#finalizar").hide();
	$("#iniciar").toggle();

	var testTable = document.getElementById('tabela');

	resposta = [];

	for (i = 1; i < testTable.rows.length; i++) {

		var xpath = testTable.rows[i].cells[0].innerHTML;
		console.log(xpath);
	    
	    var tipo = testTable.rows[i].cells[1].getElementsByTagName("select")[0].value;
	    console.log(tipo);

	    resposta.push(xpaths[i-1]);
	    resposta.push(tipo);

	}

	$.ajax({
            url: 'http://localhost:8000/upload/',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log('ok');
            },
            data: JSON.stringify({"id_fluxo": parseInt($("#input").val()),"parametros" : resposta})
        });

})

chrome.runtime.onConnect.addListener(function(port) {
	port.onDisconnect.addListener(function(msg){
		console.log("nova pagina");
		chrome.tabs.executeScript({file: '/js/script.js', allFrames: false});
	});
  console.assert(port.name == "canal");
  port.onMessage.addListener(function(msg) {
  	if(ativo == true){
  		if(xpaths.length == 0){
  			$("#tabela").toggle();
  		}
  		xpaths.push(msg.info);
  		//document.getElementById("demo").innerHTML = xpaths.join(" * ");
  		var tabela = document.getElementById("tabela");
  		var row = tabela.insertRow(-1);
  		var cell1 = row.insertCell(0);
  		var cell2 = row.insertCell(1);
  		var cell3 = row.insertCell(2);

  		cell1.innerHTML = "<h5 style='font-size: 10px;'>" + msg.info + "</h5>";
  		cell2.innerHTML = "<div class='form-group'><select class='form-control'><option>Input</option><option>Output</option><option>Button</option></select></div>";
  		cell3.innerHTML = "<button type='button' class='btn btn-danger' onclick='deleteRow(this)'> <span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
  	}
  });
});




function execute(){
		chrome.tabs.executeScript({file: '/js/script.js', allFrames: false});
}


function finalizar(){
		console.log(xpaths);
}
