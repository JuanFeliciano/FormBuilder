export interface FormGroupModel {
  title: string;
  forms: Form[];
}

export interface Form {
  title: string;
  questions: Question[];
}

export interface Question {
  content: string;
  answers: Answer[];
}

export interface Answer {
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
