export interface Employee {
  user: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;
  date_of_birth: Date;
  date_of_hire: Date;
  employment_status: string;
  phone_number: string;
  position: string;
  salary: number;
  state: string;
  zip_code: string;
  certifications: string[];
  department: string;
  job_title: string;
  manager: string;
  skills: string[];
  isComplete: boolean;
}
