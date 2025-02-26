// Add event listener for the "Enter" key press
document.getElementById('topic_input').addEventListener('keypress', function (event) {
  // Check if the key pressed is Enter
  if (event.key === 'Enter') {
    sendTopic(); // Call sendTopic function when Enter is pressed
    imageGenerator();
  }
});

async function sendTopic() {
    const topic = document.getElementById("topic_input").value; // Get the input value
    const art_box = document.getElementById("artice_box"); // Get the article box element

    const urlTopic = topic.replace(/ /g, '-'); // Replace spaces with hyphens
    const apiUrl = `http://127.0.0.1:8000/api/predictions/article/?topic=${urlTopic}`; // Construct the API URL

    try {
        // Await the fetch call to ensure the response is handled correctly
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }

        const data = await response.json(); // Parse the response data as JSON
        art_box.innerHTML = data.article; // Display the article in the article box

        // console.log(data); 
    } catch (error) {
        console.log('Error:', error); // Log any errors that occur
    } 
}


async function imageGenerator(){
    const url = "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic";
    const topic = document.getElementById("topic_input").value;

    const payload = { inputs: `a realistic ai image on ${topic}` };
    
    const headers = {
      "x-rapidapi-key": "1186d9e5e7mshaa821613d88b852p16ad7ejsnbc290fe4315c",
      "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
      "Content-Type": "application/json"
    };
    
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Process the response data
        document.body.style.backgroundImage = `url('${data.url}')`;
      })
      .catch(error => {
        console.error('Error:', error); // Handle errors
      });
}