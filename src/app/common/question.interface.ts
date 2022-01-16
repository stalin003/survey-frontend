export interface QuestionInterface {
  id: number;
  answered: boolean;
  questionContent: string;
  options: OptionInterface[];
}

export interface OptionInterface {
  id: number;
  optionContent: string;
}

export interface AnswerQuestionInterface {
  questionId: number;
  optionId: number;
}

export interface QuestionResponseInterface {
  questionId: number;
  peopleAttempted: number;
}

export interface UpdateQuestionInterface {
  id: number;
  questionContent: string;
}

export interface CreateOptionInterface {
  optionContent: string;
  questions: tmpInterface;
}

export interface tmpInterface {
  id: number;
}

export interface CreateQuestionInterface {
  questionContent: string;
  options: TmpOptionInterface[];
}

export interface TmpOptionInterface {
  optionContent: string;
}
