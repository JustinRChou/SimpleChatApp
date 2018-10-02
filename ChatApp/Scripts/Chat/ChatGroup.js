const $name = $("input[name=name]");
const $groupname = $("input[name=groupname]");
const $groupbox = $("ul[name=groupbox]");
const $message = $("input[name=message]");
const $chatbox = $("ul[name=chatbox]");
const chatHub = $.connection.chatGroupHub;
$.connection.hub.start().done(() => { getAllMessage(); getAllGroups(); }); 
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
chatHub.client.getAllGroups = function (result) {
    const arr = JSON.parse(result);
    console.log(arr);
    $groupbox.empty();
    arr.forEach((n, i) => {
        var li = $("<li>" + n + "</li>");
        li.click(() => { alert(n);});
        $groupbox.append(li);
    });
};
newMessage = function () {
    chatHub.server.sendMessage($name.val(), $message.val());
};
newGroup = function () {
    chatHub.server.addGroup($groupname.val());
};
getAllMessage = function () {
    chatHub.server.getAllMessage();
};
getAllGroups = function () {
    chatHub.server.getAllGroups();
}
$(document).ready(() => {
    $name.val("Guest");
});

