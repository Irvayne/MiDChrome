console.log('script popup carregado');
var port = chrome.runtime.connect({name: "canal"});
document.addEventListener('click', function (e) {
	var target = e.target;
	//alert(getXpath(target));
	port.postMessage({info: getXpath(target)});

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
