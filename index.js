var scroll = (target) => {
    var scrollPart = target;
    var top = scrollPart.getBoundingClientRect().top;
    var pageY = window.pageYOffset;
    var endPosition = top + pageY;

    var startTime = +new Date();
    var duration = 500; //ms

    function run() {
        var time = +new Date() - startTime;

        window.scrollTo(0, pageY + top * (time / duration));
        run.timer = requestAnimationFrame(run);

        if (time >= duration) {
            window.scrollTo(0, endPosition);
            cancelAnimationFrame(run.timer);
        }
    } 

    requestAnimationFrame(run);
}

document.querySelector('.return-top').addEventListener('click', function() {
    scroll(document.body);
});

window.addEventListener('scroll', function(e) {
    var element = document.querySelector('.return-top');
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= document.body.clientHeight) {
        element.style.opacity = 1;
        element.style.pointerEvents = 'all';
    } else {
        element.style.opacity = 0;
        element.style.pointerEvents = 'none';
    }
});

var progress = document.querySelector('.loading-progress');
var pjax = new Pjax({
    elements: "a",
    selectors: ["title", ".content-container"],
    cacheBust: false
});
document.addEventListener('pjax:send', function() {
    progress.style.display = 'block';
});
document.addEventListener('pjax:success', function() {
    setTimeout(function() {
        progress.style.display = 'none';
    }, 500);
    // rerender hightlight.js
    hljs.initHighlightingOnLoad();
    var blockcodes = document.querySelectorAll('pre code');
    for (var i in blockcodes) {
        if (blockcodes[i] instanceof HTMLElement) {
            hljs.highlightBlock(blockcodes[i]);
        }
    }

    // rerender MathJax
    window.MathJax.Hub.PreProcess();
    window.MathJax.Hub.Process();
});