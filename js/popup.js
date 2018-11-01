console.log('script popup carregado');
document.addEventListener('click', function (e) {
	var target = e.target;
	alert(getXpath(target));
	
});

function getXpath(element){
	
	var xpath = '';
	for ( ; element && element.nodeType == 1; element = element.parentNode )
	{
        var id = $(element.parentNode).children(element.tagName).index(element) + 1;
        id > 1 ? (id = '[' + id + ']') : (id = '');
        xpath = '/' + element.tagName.toLowerCase() + id + xpath;
    }
    return xpath;
};
