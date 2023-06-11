const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLI) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLI.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
                "messages": [{role: "user", content: userMessage }]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
       messageElement.textContent = data.choices[0] .message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
      messageElement.textContent = "Ops! Algo de errado aconteceu. Por favor tente novamente.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
} 

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.getElementsByClassName.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLI = createChatLi("...", "incoming")
        chatbox.appendChild(incomingChatLI);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLI);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.getElementsByClassName.height = `${inputInitHeight}px`;
    chatInput.getElementsByClassName.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));