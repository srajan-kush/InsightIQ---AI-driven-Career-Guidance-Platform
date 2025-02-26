const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

sendBtn.addEventListener('click', sendMessage);

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    displayMessage(userMessage, 'user-message');
    userInput.value = '';

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing';
    typingIndicator.textContent = 'Bot is typing...';
    chatbox.appendChild(typingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        // Construct the URL with query parameters
        const API_URL = `http://127.0.0.1:8000/api/predictions/chat_bot/?prompt=${encodeURIComponent(userMessage)}`;
        
        // Make GET request
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Remove typing indicator
        chatbox.removeChild(typingIndicator);

        // Display bot response
        if (data.response) {
            displayMessage(data.response, 'bot-message');
        } else {
            throw new Error('Invalid response format.');
        }
    } catch (error) {
        console.error('Error:', error);
        chatbox.removeChild(typingIndicator);
        displayMessage('Sorry, I encountered an error. Please try again.', 'bot-message');
    }

    // Auto-scroll
    chatbox.scrollTop = chatbox.scrollHeight;
}

function displayMessage(message, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.textContent = message;
    chatbox.appendChild(msgDiv);
}