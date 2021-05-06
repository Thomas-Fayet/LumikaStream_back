var socket = io();

var inputField = document.querySelector(".message_form__input");
var messageForm = document.querySelector(".message_form");
var messageBox = document.querySelector(".messages__history");
var inboxPeople = document.querySelector(".inbox__people");
var fallback = document.querySelector(".fallback");

let userName = "";

var newUserConnected = (user) => {
    userName = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit("new user", userName);
    addToUsersBox(userName);
};

var addToUsersBox = (userName) => {
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    }

    const userBox = `
    <div class="chat_ib ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    inboxPeople.innerHTML += userBox;
};

// new user is created so we generate nickname and emit event
newUserConnected();

socket.on("new user", function (data) {
    data.map((user) => addToUsersBox(user));
});

socket.on("user disconnected", function (userName) {
    document.querySelector(`.${userName}-userlist`).remove();
});

//new message

var addNewMessage = ({ user, message }) => {
    var time = new Date();
    var formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

    var receivedMsg = `
    <div class="received__message">
        <p><span class="user-chat">${user} </span> : ${message}</p>
    </div>`;

    var myMsg = `
    <div class="sent__message">
        <p><span class="user-chat">${user} </span> : ${message}</p>
    </div>`;

    messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

// new user is created so we generate nickname and emit event
newUserConnected();

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputField.value) {
      return;
    }
  
    socket.emit("chat message", {
      message: inputField.value,
      nick: userName,
    });
  
    inputField.value = "";
});

socket.on("new user", function (data) {
    data.map((user) => addToUsersBox(user));
});
  
socket.on("user disconnected", function (userName) {
    document.querySelector(`.${userName}-userlist`).remove();
});
  
socket.on("chat message", function (data) {
    addNewMessage({ user: data.nick, message: data.message });
});