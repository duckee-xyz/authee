export interface Session {
  address: string;
  idToken: string;
}

export interface SignInRequest {
  idToken: string;
}

export interface SignInResponse {
  session: Session;
}
