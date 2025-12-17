export async function fetchAIResponse({ userId, message }) {
  try {
    console.log(userId, message);

    const response = await fetch(
      `http://155.138.232.79/mba/api/v1/chats/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, message }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "The LLM reached its token limit. Please try again after sometime."
      );
    }

    const finalResponse = await response.json();
    // if (Object.keys(finalResponse).length === 0)
    //   return "The LLM reached its token limit. Please try again after sometime.";
    return finalResponse.data;
  } catch (error) {
    console.error(error?.message);
    return error?.message;
  }
}
