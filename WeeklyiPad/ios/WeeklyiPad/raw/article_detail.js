
window.document.addEventListener('message', function (e) {
    const message = e.data
    $('body').append(message);
    $('img').each(function () {
        var url = $(this).attr("src");
        // $(this).attr("src","file://" + url);
        // $(this).css("width","200px").css("height","400px");
    });
    var msg1 = {};
    msg1.type = "setHeight";        msg1.data = {height:window.document.body.clientHeight};
    window.postMessage(JSON.stringify(msg1));
})

