
$('input[name="btnK"]').before('<input id="chExtension" value="Botao da extensao" aria-label="Pesquisa Google" name="buton" type="submit" >') 

$('#chExtension').click(function(){
	$('#lst-ib').val("minha primeira extensao");
})