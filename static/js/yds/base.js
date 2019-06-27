(function(doc, win) {
	var docEle = doc.documentElement,
		dpr = Math.min(win.devicePixelRatio, 3), //视网膜宽度
		scale = 1 / dpr,
		resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var metaEle = doc.createElement('meta');
	metaEle.name = 'viewport';
	metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
	docEle.firstElementChild.appendChild(metaEle);

	var recalCulate = function() {
		var width = docEle.clientWidth;
		docEle.style.fontSize = 100 * (width / 1200) + 'px';
	};

	recalCulate();

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvent, recalCulate, false); //PC端
})(document, window);