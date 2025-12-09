export async function askAssistant(message: string, storeId: string) {
  try {
    const res = await fetch(
      "https://SENIN-BACKEND-URLUN.onrender.com/assistant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          store_id: storeId,
          message
        })
      }
    );

    if (!res.ok) {
      return "Asistan şu anda yanıt veremiyor, lütfen daha sonra tekrar dene.";
    }

    const data = await res.json();
    return data.message || "Yanıt alınamadı.";
  } catch (error) {
    console.error("assistant error", error);
    return "Bağlantı sorunu oluştu.";
  }
}
