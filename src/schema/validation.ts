import { PortfolioData } from '../types/portfolio';

export interface ValidationError {
  field: string;
  section: string;
  message: string;
}

export interface ValidationWarning {
  field: string;
  section: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export function validatePortfolio(data: PortfolioData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Personal Validation
  if (!data.personal.fullName || data.personal.fullName.trim().length < 2) {
    errors.push({
      field: 'personal.fullName',
      section: 'Personal Information',
      message: 'Full Name is required (minimum 2 characters).'
    });
  }

  if (!data.personal.headline || data.personal.headline.trim().length < 3) {
    errors.push({
      field: 'personal.headline',
      section: 'Personal Information',
      message: 'Professional Headline is required.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.personal.email || !emailRegex.test(data.personal.email)) {
    errors.push({
      field: 'personal.email',
      section: 'Personal Information',
      message: 'A valid email address is required for contact.'
    });
  }

  // Experience Validation
  if (data.experience.length === 0) {
    warnings.push({
      field: 'experience',
      section: 'Experience',
      message: 'No work experience added. Consider showcasing at least one role.'
    });
  } else {
    data.experience.forEach((exp, idx) => {
      if (!exp.role) {
        errors.push({
          field: `experience[${idx}].role`,
          section: 'Experience',
          message: `Role/Job Title missing for item #${idx + 1}.`
        });
      }
      if (!exp.company) {
        errors.push({
          field: `experience[${idx}].company`,
          section: 'Experience',
          message: `Company name missing for item #${idx + 1}.`
        });
      }
    });
  }

  // Projects Validation
  if (data.projects.length === 0) {
    warnings.push({
      field: 'projects',
      section: 'Projects',
      message: 'No projects added yet. Adding 1-3 highlighted projects boosts portfolio impact.'
    });
  } else {
    data.projects.forEach((proj, idx) => {
      if (!proj.title) {
        errors.push({
          field: `projects[${idx}].title`,
          section: 'Projects',
          message: `Title missing for project #${idx + 1}.`
        });
      }
    });
  }

  // Skills Validation
  if (data.skills.length === 0 || data.skills.every(cat => cat.skills.length === 0)) {
    warnings.push({
      field: 'skills',
      section: 'Skills',
      message: 'No technical skills provided. Technical portfolios perform best with listed competencies.'
    });
  }

  // SEO
  if (!data.seo.metaTitle) {
    warnings.push({
      field: 'seo.metaTitle',
      section: 'SEO & Metadata',
      message: 'Meta title is blank. Search engines and preview cards will default to name.'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
