import { useState } from "react";
import questionnaireData from "../data/questionnaire.json";
import { Questionnaire } from "../types/questionnaire";

const Index = () => {
  const [questionnaire] = useState<Questionnaire>(questionnaireData as Questionnaire);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">{questionnaire.title}</h1>
        <p className="text-gray-600 text-center mb-6">{questionnaire.description}</p>
        
        <div className="space-y-8">
          {questionnaire.sections.map((section) => (
            <div key={section.id} className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-600 mb-4">{section.description}</p>
              
              <div className="space-y-4">
                {section.questions.map((question) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <span className="text-gray-800 font-medium">{question.label}</span>
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Type: {question.type}
                      {question.type === 'select' || question.type === 'radio' || question.type === 'checkbox' ? 
                        ` (${(question as any).options.length} options)` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            {questionnaire.submitButton.text}
          </button>
          <p className="mt-2 text-sm text-gray-500">
            This is a preview of the questionnaire JSON structure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;