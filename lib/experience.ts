export type BaseExperienceEntry = {
  role: string;
  organization: string;
  location?: string;
  /** Free text, shown as-is. e.g. "2024 — Present" or "Jun 2025 — Aug 2025". */
  period: string;
  description: string;
  /** Bullets. Lead each with a verb and a number where you have one. */
  highlights?: string[];
  stack?: string[];
};

export type WorkExperienceEntry = BaseExperienceEntry & {
  kind: "work";
};

export type EducationExperienceEntry = BaseExperienceEntry & {
  kind: "education";
  cgpa?: string;
};

export type ExperienceEntry = WorkExperienceEntry | EducationExperienceEntry;

export const workExperience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    organization: "Tessa Cloud",
    location: "Bangalore, Karnataka",
    period: "June 2026 — Present",
    kind: "work",
    description:
      "Architected and developed a comprehensive admissions portal and backend APIs using Python, PostgreSQL, and Google Cloud.",
    highlights: [
      "Architected 30+ REST APIs, SQLAlchemy, and PostgreSQL for admissions, academics, timetables, lesson plans, and attendance integrated DigiLocker with Vertex AI Gemini, reducing manual data entry by ~80%.",
      "Built a JWT-authenticated admissions portal with MSG91 OTP, reCAPTCHA v3, HMAC-SHA256 OTP hashing, rate limiting, and single-application enforcement; implemented DLT/TRAI-compliant SMS notifications.",
      "Developed role-based Bootstrap 5 interfaces for administrators, faculty, HODs, principals, and students; containerized with Docker + Supervisor, deployed on Google Cloud Run, and integrated Amazon S3 for secure file storage.",
    ],
    stack: [
      "Python",
      "SQLAlchemy",
      "PostgreSQL",
      "Vertex AI",
      "Docker",
      "Google Cloud",
      "Bootstrap 5",
    ],
  },
  {
    role: "Software Developer",
    organization: "Chanakya University",
    location: "Bangalore, Karnataka",
    period: "Apr 2024 — July 2024",
    kind: "work",
    description:
      "Developed automated proposal approval workflows using Microsoft Power Automate and SharePoint.",
    highlights: [
      "Developed an automated proposal approval workflow using Microsoft Power Automate, SharePoint, SQL, and Microsoft Forms with dynamic routing, role-based approvals, audit trails, and real-time status tracking.",
      "Reduced manual effort by 60% and approval turnaround from 7–10 days to under 48 hours by digitizing the approval lifecycle, improving transparency and enabling scalable workflow automation.",
    ],
    stack: ["Power Automate", "SharePoint", "SQL", "Microsoft Forms"],
  },
];
