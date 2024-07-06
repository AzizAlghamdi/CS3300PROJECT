function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") {
        return;
    }
    let userMessage = document.createElement("div");
    userMessage.className = "userMessage";
    userMessage.innerHTML = userInput;
    document.getElementById("chatlogs").appendChild(userMessage);
    document.getElementById("userInput").value = "";
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("div");
        botMessage.className = "botMessage";
        botMessage.innerHTML = data.reply;
        document.getElementById("chatlogs").appendChild(botMessage);

        if (data.page) {
            window.location.href = data.page + '.html';
        }
    })
    .catch(error => console.error("Error:", error));
}
