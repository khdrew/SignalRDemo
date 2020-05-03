
(function () {

    $.connection.hub.start()
        .done(function () {
            console.log('START');
            $.connection.testHub.server.startUpMethod(Date.now());
        })
        .fail(function () {
            alert('ERROR');
        });

    $.connection.testHub.client.AnnounceStartUp = function (message) {
        console.log(message);
        $("#welcome-messages").append(message + ' has connected. <br />');
    }

    function clearList() {
        console.log('hihi');
        document.getElementById("welcome-messages").innerHTML = '';
    }


    document.getElementById("clear-list-btn").onclick = clearList;
    
})()







