// const rbtn = document.createElement("button");
// rbtn.classList.add('removeButton');
// rbtn.onclick(removeInput(this));
// rbtn.type = "button";
// rbtn.innerText = '-';

function addSkillInput() {
    const skillsSection = document.getElementById('skillsSection');
    const lastInputGroup = skillsSection.lastElementChild; // Get the last added input group
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('inputGroup');
    inputGroup.innerHTML = `
      <input type="text" class="skillInput" name="skills" placeholder="Enter your skills (e.g., Python)">
      <button type="button" class="addButton" onclick="addSkillInput()">+</button>
      <button type="button" class="removeButton" onclick="removeInput(this)">-</button>
    `;
    skillsSection.appendChild(inputGroup);
    lastInputGroup.querySelector('.addButton').style.display = 'none'; // Hide the "+" button for the previous input group
  }
  
  function addInterestInput() {
    const interestsSection = document.getElementById('interestsSection');
    const lastInputGroup = interestsSection.lastElementChild; // Get the last added input group
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('inputGroup');
    inputGroup.innerHTML = `
      <input type="text" class="interestInput" name="interests" placeholder="Enter your interests (e.g., Data Science)">
      <button type="button" class="addButton" onclick="addInterestInput()">+</button>
      <button type="button" class="removeButton" onclick="removeInput(this)">-</button>
    `;
    interestsSection.appendChild(inputGroup);
    lastInputGroup.querySelector('.addButton').style.display = 'none'; // Hide the "+" button for the previous input group
  }
  
  
  function removeInput(button) {
    const inputGroup = button.parentNode;
    const section = inputGroup.parentNode;
    section.removeChild(inputGroup);
    const lastInputGroup = section.lastElementChild;
    if (lastInputGroup) {
      lastInputGroup.querySelector('.addButton').style.display = 'inline-block'; // Show the "+" button for the previous input group
    }
  }
  
  function predict() {
    const skillsInputs = document.querySelectorAll('.skillInput');
    const interestsInputs = document.querySelectorAll('.interestInput');
  
    const skills = Array.from(skillsInputs).map(input => input.value.trim()).filter(value => value !== '');
    const interests = Array.from(interestsInputs).map(input => input.value.trim()).filter(value => value !== '');
  
    // Perform prediction based on skills and interests
    let prediction = "Based on your skills and interests, suitable jobs or studies could include: ";
    // Example prediction logic:
    // You can customize this part to match actual prediction logic
    if (skills.includes("Python") && interests.includes("Data Science")) {
      prediction += "Data Scientist, Machine Learning Engineer, or Data Analyst.";
    } else if (skills.includes("Java") && interests.includes("Web Development")) {
      prediction += "Web Developer, Software Engineer, or Full Stack Developer.";
    } else {
      prediction += "No specific recommendation based on provided skills and interests.";
    }
  
    document.getElementById('predictionResult').textContent = prediction;
  }
  