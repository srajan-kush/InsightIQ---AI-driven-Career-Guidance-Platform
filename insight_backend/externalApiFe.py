import requests

# API endpoint for logout
logout_url = "http://127.0.0.1:8000/logout/"

# Token for authentication
token = "e51d70c3195ff5935b4c9bad252a95b78dab84a5"

# Headers containing the token
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

try:
    # Send a POST request to the logout endpoint
    response = requests.post(logout_url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        print("Logout successful!")
    else:
        print(f"Failed to log out. Status code: {response.status_code}")
        print(f"Response: {response.text}")

except requests.exceptions.RequestException as e:
    print(f"Error during request: {e}")
