
(function () {
    var myName = uuidv4();


    $.connection.hub.start()
        .done(function () {
            $.connection.testHub.server.startUpMethod(myName);
        })
        .fail(function () {
            alert('ERROR');
        });

    $.connection.testHub.client.AnnounceStartUp = function (connected) {
        if (connected === myName) {
            $("#my-name").append('You have connected as <b>' + myName + '</b>');
            return;
        }
        $("#messages").append('<b>' + connected + '</b> has connected. <br />');
    }


    $.connection.testHub.client.ReceiveChat = function (name, chat) {
        if (name === myName) {
            $("#messages").append('<b>You</b> said: ' + chat + '<br />');
            return;
        }
        $("#messages").append('<b>' + name + '</b> said: ' + chat + '<br />');
    }

    document.getElementById("clear-list-btn").onclick = clearList;
    function clearList() {
        document.getElementById("messages").innerHTML = '';
    }


    var inputBox = document.getElementById("chat-form-input")
    var inputBtn = document.getElementById("chat-form-btn");

    inputBtn.onclick = sendChat;
    inputBox.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            inputBtn.click();
        }
    });

    function sendChat() {
        $.connection.testHub.server.sendChat(myName, inputBox.value);
        inputBox.value = '';
    }    


    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})()







