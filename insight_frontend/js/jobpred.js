
let step = 1;
let skills = '';
let interest = '';


function bot_message() {
    let userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    // Display user's message
    const chatbox = document.getElementById('chatbox');
    let userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerText = userInput;
    chatbox.appendChild(userMessageDiv);
    document.getElementById('userInput').value = '';

    // Simulate bot typing
    let typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message message typing';
    typingDiv.innerText = 'Bot is typing...';
    
    chatbox.appendChild(typingDiv);
    setTimeout(() => {
        chatbox.removeChild(typingDiv);
        botResponse(userInput);
    }, 1000); // Simulate delay for bot response
}


document.getElementById('sendBtn').addEventListener('click',bot_message);

// Add event listener for the "Enter" key press
document.getElementById('userInput').addEventListener('keypress', function (event) {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter') {
        bot_message();
    }
});



async function botResponse(userInput) {
    const chatbox = document.getElementById('chatbox');
    let botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot-message';
    if (step === 1) {
        skills = userInput; // Store skills input
        botMessageDiv.innerText = 'Got it! Now, what are your interests?';

        chatbox.appendChild(botMessageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
        step++;
    } else if (step === 2) {
        interest = userInput;

        // Wait for the prediction result
        const prediction = await sendQuery(skills, interest);

        // console.log(prediction)

        // Check if prediction is valid
        let subText = `Thanks for the info! Based on what you told me, ${prediction ? prediction : 'I could not retrieve a prediction.'}`;

        const lines = subText.split('\n');

        lines.forEach((line, index) => {
            let subDiv = document.createElement('div');
            subDiv.className = 'message bot-message';

            if(line.trim() !== ''){

                const formattedString = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                subDiv.innerHTML = formattedString;
                chatbox.appendChild(subDiv);
                chatbox.scrollTop = chatbox.scrollHeight;
            }

        });

        step++;
    } else {
        botMessageDiv.innerText = 'Our conversation is complete! Let me know if you want to chat again.';
    }
    
}


async function sendQuery(skills, interest){

    const apiUrl = `http://127.0.0.1:8000/api/predictions/job_prediction/?skills=${skills}&interests=${interest}`

    try {
        // Await the fetch call to ensure the response is handled correctly
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                // 'Authorization': `Token 2a118de30e1bfe780b874cfe991a78d7a90f7d3c`, //${localStorage.token}
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }

        const data = await response.json();
        // console.log(data);

         return data.job_discription;
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)

        console.log(error)
    } 
}




function displaySections(data) {
    const sectionsContainer = document.getElementById('sections');
    data.forEach(section => {
        const div = document.createElement('div');
        div.className = 'section';
        
        // Replace **text** with <strong>text</strong>
        const formattedSection = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        div.innerHTML = formattedSection; // Set the formatted text as HTML
        sectionsContainer.appendChild(div);
    });
}

