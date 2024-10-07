export interface FormGroupModel {
  id: number;
  title: string;
  forms: Form[];
}

export interface Form {
  id: number;
  idGroup: number;
  title: string;
  questions: Question[];
}

export interface Question {
  id: number;
  idForm: number;
  content: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  idQuestion: number;
  idUser: number;
  grade: number;
  description: string;
}

export interface User {
  username: string;
  password: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  exp: number;
  iss: string;
  aud: string;
}

export interface RefreshRoute {
  accessToken: string;
  refreshToken: string;
  dateToken: Date;
}
