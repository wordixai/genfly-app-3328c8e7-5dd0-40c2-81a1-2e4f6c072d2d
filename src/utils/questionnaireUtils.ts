import { Questionnaire } from "../types/questionnaire";

/**
 * Validates if a questionnaire object has the correct structure
 * @param questionnaire The questionnaire object to validate
 * @returns An object with validation result and any error messages
 */
export function validateQuestionnaire(questionnaire: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required top-level properties
  if (!questionnaire.id) errors.push("Questionnaire is missing 'id' property");
  if (!questionnaire.title) errors.push("Questionnaire is missing 'title' property");
  if (!questionnaire.sections || !Array.isArray(questionnaire.sections)) {
    errors.push("Questionnaire is missing 'sections' array");
  } else {
    // Validate each section
    questionnaire.sections.forEach((section: any, sectionIndex: number) => {
      if (!section.id) errors.push(`Section ${sectionIndex} is missing 'id' property`);
      if (!section.title) errors.push(`Section ${sectionIndex} is missing 'title' property`);
      
      if (!section.questions || !Array.isArray(section.questions)) {
        errors.push(`Section ${sectionIndex} is missing 'questions' array`);
      } else {
        // Validate each question
        section.questions.forEach((question: any, questionIndex: number) => {
          if (!question.id) errors.push(`Question ${questionIndex} in section ${sectionIndex} is missing 'id' property`);
          if (!question.type) errors.push(`Question ${questionIndex} in section ${sectionIndex} is missing 'type' property`);
          if (!question.label) errors.push(`Question ${questionIndex} in section ${sectionIndex} is missing 'label' property`);
          
          // Type-specific validations
          if (['select', 'radio', 'checkbox'].includes(question.type)) {
            if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
              errors.push(`Question ${questionIndex} in section ${sectionIndex} of type '${question.type}' is missing 'options' array`);
            }
          }
          
          if (['rating', 'slider'].includes(question.type)) {
            if (typeof question.min !== 'number') errors.push(`Question ${questionIndex} in section ${sectionIndex} of type '${question.type}' is missing 'min' property`);
            if (typeof question.max !== 'number') errors.push(`Question ${questionIndex} in section ${sectionIndex} of type '${question.type}' is missing 'max' property`);
          }
        });
      }
    });
  }
  
  // Check submit button
  if (!questionnaire.submitButton) {
    errors.push("Questionnaire is missing 'submitButton' property");
  } else if (!questionnaire.submitButton.text) {
    errors.push("Submit button is missing 'text' property");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generates an empty response object based on a questionnaire structure
 * @param questionnaire The questionnaire to generate responses for
 * @returns An object with question IDs as keys and empty/default values
 */
export function generateEmptyResponses(questionnaire: Questionnaire): Record<string, any> {
  const responses: Record<string, any> = {};
  
  questionnaire.sections.forEach(section => {
    section.questions.forEach(question => {
      switch (question.type) {
        case 'checkbox':
          responses[question.id] = [];
          break;
        case 'rating':
        case 'slider':
        case 'number':
          responses[question.id] = null;
          break;
        case 'boolean':
          responses[question.id] = false;
          break;
        default:
          responses[question.id] = '';
      }
    });
  });
  
  return responses;
}

/**
 * Checks if all required questions in a questionnaire have been answered
 * @param questionnaire The questionnaire structure
 * @param responses The user's responses
 * @returns An object with validation result and any missing required fields
 */
export function validateResponses(
  questionnaire: Questionnaire, 
  responses: Record<string, any>
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];
  
  questionnaire.sections.forEach(section => {
    section.questions.forEach(question => {
      if (question.required) {
        const response = responses[question.id];
        
        if (
          response === undefined || 
          response === null || 
          response === '' || 
          (Array.isArray(response) && response.length === 0)
        ) {
          missingFields.push(question.id);
        }
      }
    });
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}