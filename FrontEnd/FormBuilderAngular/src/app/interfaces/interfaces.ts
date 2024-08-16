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
