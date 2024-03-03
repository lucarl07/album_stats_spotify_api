/* FILE DESIGNED FOR COMMON USE OF THE FOLLOWING FUNCTIONS: */

// Method to obtain the Spotify Web API access token:
const clientId = '676cb524e96d48749f7c8bf60f64be2b'; 
const clientSecret = 'ca2a68808edf4648aca8ad611bec7b77';

export async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
  });

  return await response.json();
}

// Validate an e-mail during login or account creation:
export function isEmailValid(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if(email.match(regex)) {
      return true;
  } else {
      return false;
  }
}

// Modify CSS properties based on all inputs returning errors:
export function allInputsInvalid(inv01, inv02, msg) {
  msg.forEach(element => {
      element.style.display = 'initial';
  })

  inv01.style.border = '2px solid #c5221f';
  inv02.style.border = '2px solid #c5221f';
}

// Modify CSS properties based on one input returning an error:
export function oneInputInvalid(val, inv, msg, i) {
  msg.forEach(element => {
      element.style.display = 'initial';
  })
  msg[i].style.display = 'none';

  inv.style.border = '2px solid #c5221f';
  val.style.border = '1px solid #302b2c';
}