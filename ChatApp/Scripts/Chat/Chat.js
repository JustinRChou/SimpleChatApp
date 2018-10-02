const $name = $("input[name=name]");
const $message = $("input[name=message]");
const $chatbox = $("ul[name=chatbox]");
const chatHub = $.connection.chatHub;
$.connection.hub.start().done(() => { getAllMessage(); }); 
chatHub.client.broadcastMessage = function (name, message) {
    var newMessage = name + ' says: ' + message;
    $chatbox.append("<li>" + newMessage + "</li>");
};
chatHub.client.getAllMessage = function (result) { 
    const arr = JSON.parse(result);
    $chatbox.empty();
    arr.forEach((n, i) => {
        var newMessage = n.Item1 + ' says: ' + n.Item2;
        $chatbox.append("<li>" + newMessage + "</li>");
    });
};
newMessage = function () {
    chatHub.server.sendMessage($name.val(), $message.val());
};
getAllMessage = function () {
    chatHub.server.getAllMessage();
};
$(document).ready(() => {
    $name.val("Guest");
});

