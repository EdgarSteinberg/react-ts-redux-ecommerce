import type { ResetPasswordPayload } from "../../../types/users";

export const fetchingResetPassword = async ( payload: ResetPasswordPayload) => {
    
  const response = await fetch(
    "http://localhost:8080/api/users/new-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al resetear password");
  }

  return data;
};
