export interface RegisterUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  cart: string;  
  role: string;
}


export interface RegisterPayload {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number; // 👈 backend
  password: string;
  role: string;
}


export interface UsersResponse {
  payload: RegisterPayload[];
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}


export interface SendResetEmailPayload {
  email: string;
}