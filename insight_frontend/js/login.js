const apiUrl = 'http://127.0.0.1:8000/api/login/';

async function loginFunction() {
  const EmailInput = document.getElementById("EmailInput").value;
  const passInput = document.getElementById("passInput").value;

  const postData = {
          "username": EmailInput,
          "password":passInput,
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

    if(response.status == 200){
      
      localStorage.setItem("InsightIQLoggedIn",[true,EmailInput]);
      localStorage.setItem("token",data.token);
      successComplete();
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // alert("There was a problem with the fetch operation:")
  }
}

function successComplete(){
  window.location.assign("index.html");
  alert("Your accound is Login Sucessfully.");
}
