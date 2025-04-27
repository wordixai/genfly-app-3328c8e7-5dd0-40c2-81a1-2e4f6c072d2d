export interface QuestionnaireOption {
  value: string;
  label: string;
}

export interface QuestionValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  required?: boolean;
}

export interface QuestionBase {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: QuestionValidation;
}

export interface TextQuestion extends QuestionBase {
  type: 'text' | 'email' | 'textarea';
}

export interface NumberQuestion extends QuestionBase {
  type: 'number';
}

export interface SelectQuestion extends QuestionBase {
  type: 'select';
  options: QuestionnaireOption[];
}

export interface RadioQuestion extends QuestionBase {
  type: 'radio';
  options: QuestionnaireOption[];
}

export interface CheckboxQuestion extends QuestionBase {
  type: 'checkbox';
  options: QuestionnaireOption[];
}

export interface BooleanQuestion extends QuestionBase {
  type: 'boolean';
}

export interface RatingQuestion extends QuestionBase {
  type: 'rating';
  min: number;
  max: number;
  icons: 'star' | 'heart' | 'thumbs';
}

export interface SliderQuestion extends QuestionBase {
  type: 'slider';
  min: number;
  max: number;
  step: number;
}

export type Question = 
  | TextQuestion 
  | NumberQuestion 
  | SelectQuestion 
  | RadioQuestion 
  | CheckboxQuestion 
  | BooleanQuestion 
  | RatingQuestion
  | SliderQuestion;

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuestionnaireSubmitButton {
  text: string;
  successMessage: string;
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  sections: QuestionnaireSection[];
  submitButton: QuestionnaireSubmitButton;
}