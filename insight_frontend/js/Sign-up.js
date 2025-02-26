const apiUrl = 'http://127.0.0.1:8000/api/register/';



async function postDataToApi() {
  const nameInput = document.getElementById("nameInput").value;
  const EmailInput = document.getElementById("EmailInput").value;
  const passInput = document.getElementById("passInput").value;

 

  let nameArray = nameInput.split(" ");

  console.log(nameArray[0]);
  const postData = {
    "username": EmailInput,
    "first_name": nameArray[0],
    "last_name": nameArray[1],
    "email": EmailInput,
    "password": passInput
};
  // console.log(passInput);
  const requestOptions = {
    method: 'POST',             
    headers: {                  
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(postData) 
  };


  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    };

    const response = await fetch(apiUrl, requestOptions);

    const data = await response.json();
    console.log(data);
    if (response.status == 201){
      loginFunction(EmailInput , passInput);
    }else{
      alert(data.email + "and " + data.username);
      alert(data.password);
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}



async function loginFunction(EmailInput , passInput) {
  const postData = {
          "username": EmailInput,
          "password":passInput,
  };
  const requestOptions = {
    method: 'POST',             
    headers: {                  
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(postData) 
  };


  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    };

    const response = await fetch('http://127.0.0.1:8000/api/login/', requestOptions);

    const data = await response.json();
    console.log(data);

    if(response.status == 200){
      
      localStorage.setItem("InsightIQLoggedIn",[true,EmailInput])
      localStorage.setItem("token",data.token);
      // localStorage.setItem("InsightIQImage",data.image);
      // console.log(data.image)

      successComplete();
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // alert("There was a problem with the fetch operation:")
  }
}

function successComplete(){
  window.location.assign("index.html");
  alert("Your accound is created and Login Sucessfully.");
}
