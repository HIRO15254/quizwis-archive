import { CreateQuizListInput } from 'gql';

export interface QuizListFormType extends CreateQuizListInput {
  useGoal: boolean;
}
