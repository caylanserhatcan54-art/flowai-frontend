export async function askAssistant(message: string, storeId: string) {
  const response = await fetch("https://SENIN-BACKEND-URL.com/assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      store_id: storeId,
      message
    })
  });

  const data = await response.json();
  return data.message;
}
