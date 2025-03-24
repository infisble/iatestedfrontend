import React from 'react';
import { ResumeData, TemplateType } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-6">
      {data.photo && (
        <img
          src={data.photo}
          alt={data.fullName}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />
      )}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900">{data.fullName || 'Your Name'}</h1>
        <p className="text-gray-600">
          {[data.email, data.phone].filter(Boolean).join(' | ')}
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Professional Summary</h2>
      <p className="mt-2 text-gray-700">
        {data.summary || 'Add a professional summary to highlight your key achievements and goals...'}
      </p>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Experience</h2>
      {data.experience.length > 0 ? (
        <div className="mt-4 space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <h3 className="font-medium text-gray-900">{exp.position}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate || 'Present'}
              </p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-600 italic">Add work experience to see it reflected here...</p>
      )}
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Education</h2>
      {data.education.length > 0 ? (
        <div className="mt-4 space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="space-y-1">
              <h3 className="font-medium text-gray-900">{edu.school}</h3>
              <p className="text-gray-600">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-500">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-600 italic">Add education to see it reflected here...</p>
      )}
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Skills</h2>
      {data.skills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-600 italic">Add skills to see them reflected here...</p>
      )}
    </div>
  </div>
);

const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="space-y-6">
    <div className="border-b-2 border-gray-900 pb-4">
      <div className="flex items-center space-x-6">
        {data.photo && (
          <img
            src={data.photo}
            alt={data.fullName}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        )}
        <div>
          <h1 className="text-4xl font-serif text-gray-900">{data.fullName || 'Your Name'}</h1>
          <div className="mt-2 text-gray-600 font-serif">
            {[data.email, data.phone].filter(Boolean).join(' • ')}
          </div>
        </div>
      </div>
    </div>

    {data.summary && (
      <div className="py-4">
        <p className="text-gray-700 font-serif leading-relaxed">{data.summary}</p>
      </div>
    )}

    <div className="space-y-6">
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-serif font-semibold">{exp.position}</h3>
                <span className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-gray-700 font-serif">{exp.company}</p>
              <p className="mt-2 text-gray-600 font-serif">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-serif font-semibold">{edu.school}</h3>
                <span className="text-gray-600">{edu.graduationDate}</span>
              </div>
              <p className="text-gray-700 font-serif">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-gray-700 font-serif">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <div className="flex justify-center mb-4">
        {data.photo && (
          <img
            src={data.photo}
            alt={data.fullName}
            className="w-20 h-20 rounded-full object-cover border border-gray-200"
          />
        )}
      </div>
      <h1 className="text-2xl font-light tracking-wider uppercase text-gray-800">{data.fullName || 'Your Name'}</h1>
      <div className="mt-2 text-sm text-gray-500 tracking-wide">
        {[data.email, data.phone].filter(Boolean).join(' · ')}
      </div>
    </div>

    {data.summary && (
      <div className="py-2">
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    <div className="space-y-4">
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1 mb-3">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-medium">{exp.position}</h3>
                <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
              <p className="text-xs text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1 mb-3">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-medium">{edu.school}</h3>
                <span className="text-xs text-gray-500">{edu.graduationDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-xs text-gray-600">{skill}{index < data.skills.length - 1 ? ' • ' : ''}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, onTemplateChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onTemplateChange('modern')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              template === 'modern'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Modern
          </button>
          <button
            onClick={() => onTemplateChange('classic')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              template === 'classic'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Classic
          </button>
          <button
            onClick={() => onTemplateChange('minimal')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              template === 'minimal'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Minimal
          </button>
        </div>
      </div>

      <div id="resume-preview" className="border rounded-lg p-6 min-h-[800px] bg-white shadow-inner">
        {template === 'modern' ? (
          <ModernTemplate data={data} />
        ) : template === 'classic' ? (
          <ClassicTemplate data={data} />
        ) : (
          <MinimalTemplate data={data} />
        )}
      </div>
    </div>
  );
};

export default ResumePreview;