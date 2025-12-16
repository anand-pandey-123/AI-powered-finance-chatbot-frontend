import { baseURL } from "../fetchAIResponse";

export async function signupRequest(data) {
  try {
    console.log(data);

    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}

export async function loginRequest(data) {
  try {
    console.log(data);

    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}
