export const baseURL = import.meta.env.VITE_BACKEND_URL;

export async function fetchAIResponse({ userId, message }) {
  try {
    console.log(userId, message);

    const response = await fetch(`${baseURL}/chats/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, message }),
    });

    const finalResponse = await response.json();
    return finalResponse.data;
  } catch (error) {
    console.log(error);
    if (error.status === "500")
      return "The LLM reached its token limit. Please try again after sometime.";
  }
}
