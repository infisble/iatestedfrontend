import React, { useState, useRef, useEffect } from 'react';
import { Wand2, Plus, Loader2, Trash2, Upload } from 'lucide-react';
import { ResumeData, ExperienceItem, EducationItem } from '../types';
import { enhanceText, enhanceExperienceDescription } from '../services/aiService';
import { getSuggestions } from '../services/skillsService';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState<string | null>(null);
  const [enhancingExpId, setEnhancingExpId] = useState<string | null>(null);
  const [enhanceSuccess, setEnhanceSuccess] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillInput(value);
    if (value.trim()) {
      const newSuggestions = getSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill: string) => {
    if (!data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] });
    }
    setSkillInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (suggestions.length > 0) {
        addSkill(suggestions[0]);
      } else {
        addSkill(skillInput.trim());
      }
    }
  };

  const addExperience = () => {
    const newExperience: ExperienceItem = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange({
      ...data,
      experience: [...data.experience, newExperience]
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      graduationDate: ''
    };
    onChange({
      ...data,
      education: [...data.education, newEducation]
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const handleEnhanceSummary = async () => {
    if (!data.summary.trim()) {
      setEnhanceError('Please add a summary before enhancing.');
      setTimeout(() => setEnhanceError(null), 3000);
      return;
    }

    setIsEnhancing(true);
    setEnhanceError(null);
    setEnhanceSuccess(null);

    try {
      const enhancedSummary = await enhanceText(data.summary);
      onChange({ ...data, summary: enhancedSummary });
      setEnhanceSuccess('Summary enhanced successfully!');
      setTimeout(() => setEnhanceSuccess(null), 3000);
    } catch (error) {
      setEnhanceError('Failed to enhance summary. Using offline enhancement instead.');
      setTimeout(() => setEnhanceError(null), 3000);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleEnhanceExperience = async (expId: string) => {
    const experience = data.experience.find(exp => exp.id === expId);
    
    if (!experience || !experience.description.trim()) {
      setEnhanceError('Please add a description before enhancing.');
      setTimeout(() => setEnhanceError(null), 3000);
      return;
    }

    setEnhancingExpId(expId);
    setEnhanceError(null);
    setEnhanceSuccess(null);

    try {
      const enhancedDescription = await enhanceExperienceDescription(experience.description);
      const updatedExperience = data.experience.map(exp => 
        exp.id === expId ? { ...exp, description: enhancedDescription } : exp
      );
      onChange({ ...data, experience: updatedExperience });
      setEnhanceSuccess('Experience description enhanced!');
      setTimeout(() => setEnhanceSuccess(null), 3000);
    } catch (error) {
      setEnhanceError('Failed to enhance description. Using offline enhancement instead.');
      setTimeout(() => setEnhanceError(null), 3000);
    } finally {
      setEnhancingExpId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        <button 
          onClick={handleEnhanceSummary}
          disabled={isEnhancing}
          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
            isEnhancing 
              ? 'bg-blue-100 text-blue-400 cursor-not-allowed' 
              : 'text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isEnhancing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              AI Enhance Summary
            </>
          )}
        </button>
        
      </div>

                <p className="mt-1 text-xs text-gray-500">
                  Recommended: Square image, max 5MB
                </p>
      {enhanceError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {enhanceError}
        </div>
      )}

      {enhanceSuccess && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
          {enhanceSuccess}
        </div>
      )}

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {data.photo && (
                <img
                  src={data.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              )}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center">
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  {data.photo && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...data, photo: '' })}
                      className="ml-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Recommended: Square image, max 5MB
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={data.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <textarea
                name="summary"
                id="summary"
                rows={4}
                value={data.summary}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Brief overview of your professional background and career goals..."
              />
              {data.summary && (
                <p className="mt-1 text-xs text-gray-500">
                  Click "AI Enhance Summary" to improve your summary with professional language.
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
          <div className="mt-4 space-y-4">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="space-y-4 p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Remove experience"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...exp, company: e.target.value };
                    onChange({ ...data, experience: newExp });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...exp, position: e.target.value };
                    onChange({ ...data, experience: newExp });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...exp, startDate: e.target.value };
                      onChange({ ...data, experience: newExp });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...exp, endDate: e.target.value };
                      onChange({ ...data, experience: newExp });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...exp, description: e.target.value };
                      onChange({ ...data, experience: newExp });
                    }}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {exp.description && (
                    <button
                      type="button"
                      onClick={() => handleEnhanceExperience(exp.id)}
                      disabled={enhancingExpId === exp.id}
                      className={`absolute bottom-2 right-2 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md ${
                        enhancingExpId === exp.id
                          ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                          : 'text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none'
                      }`}
                    >
                      {enhancingExpId === exp.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Wand2 className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
          <div className="mt-4 space-y-4">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="space-y-4 p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Remove education"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, school: e.target.value };
                    onChange({ ...data, education: newEdu });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, degree: e.target.value };
                    onChange({ ...data, education: newEdu });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, field: e.target.value };
                    onChange({ ...data, education: newEdu });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <input
                  type="date"
                  value={edu.graduationDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, graduationDate: e.target.value };
                    onChange({ ...data, education: newEdu });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Skills</h3>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={skillInput}
                onChange={handleSkillInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type to add skills..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addSkill(suggestion)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
