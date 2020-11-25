import base from '@models/base'

export default interface Education extends base {
  title: string;
  year: number;
}

export interface EducationState {
  educations: Education[],
  fetched: boolean
}

export const EducationURL = 'education'
