"use client";

export default function GlobalError({ error, reset }: any) {
  return (
    <html>
      <body style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1 style={{ color: "red" }}>Bir hata oluştu ❌</h1>
        <p>{error?.message}</p>
        <button
          onClick={() => reset()}
          style={{
            padding: "10px 20px",
            marginTop: 20,
            background: "blue",
            color: "white",
            borderRadius: 8,
          }}
        >
          Yeniden Dene
        </button>
      </body>
    </html>
  );
}
