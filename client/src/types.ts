export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  photo: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export type TemplateType = 'modern' | 'classic' | 'minimal';