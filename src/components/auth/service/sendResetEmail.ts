import type { SendResetEmailPayload } from "../../../types/users";

export const fechingSendResetEmail = async (payload: SendResetEmailPayload) => {
    
  const response = await fetch(
    "http://localhost:8080/api/users/send-reset-email",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al enviar el email");
  }

  return data;
};
