export async function signupRequest(data) {
  try {
    console.log(data);

    const response = await fetch(
      `http://155.138.232.79/mba/api/v1/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}

export async function loginRequest(data) {
  try {
    console.log(data);

    const response = await fetch(
      `http://155.138.232.79/mba/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}
