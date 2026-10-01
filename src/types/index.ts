export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface MCQQuestion {
  id: string;
  topicId: string;
  topicName: string;
  question: string;
  questionHindi?: string;
  options: string[];
  optionsHindi?: string[];
  correctIndex: number;
  explanation: string;
  explanationHindi?: string;
  difficulty: Difficulty;
  pyqReference?: string; // e.g. "BPSC TRE 2.0 (2023)"
}

export interface SyllabusSubtopic {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  isImportant?: boolean;
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  titleHindi: string;
  expectedQuestions: number; // e.g. 8-10 questions in 80 marks CS section
  category: 'Class XI-XII' | 'Core CS' | 'Systems' | 'Software & Web' | 'Emerging';
  subtopics: SyllabusSubtopic[];
  weightagePercent: number;
}

export interface ChapterNote {
  id: string;
  sessionNumber: number;
  title: string;
  titleHindi: string;
  category: string;
  totalPages: number;
  fileSize: string;
  price: number; // always ₹1 default
  isFree?: boolean;
  coverBadge: string;
  shortSummary: string;
  shortSummaryHindi?: string;
  
  // Section content
  shortNotes: string[];
  detailedNotes: {
    heading: string;
    headingHindi?: string;
    content: string;
    points?: string[];
    codeSnippet?: string;
    diagramDescription?: string;
    formula?: string;
  }[];
  definitions: { term: string; termHindi?: string; definition: string; definitionHindi?: string }[];
  formulas: { title: string; formula: string; explanation: string }[];
  examples: { title: string; description: string; codeOrFormula?: string }[];
  examPoints: string[]; // High-frequency exam points for BPSC TRE
  mcqs: MCQQuestion[];
  previewPages: string[];
}

export interface PDFProduct {
  id: string;
  sessionNumber: number;
  title: string;
  titleHindi: string;
  category: string;
  pages: number;
  fileSize: string;
  price: number; // ₹1
  isFree: boolean;
  description: string;
  topicsCovered: string[];
  samplePreview: string[];
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  password?: string;
  email?: string;
  role: 'user' | 'admin';
  purchasedPdfIds: string[];
  hasUnlockedAll?: boolean;
  registeredDate: string;
}

export interface PurchaseRecord {
  id: string;
  paymentId: string;
  orderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  pdfId: string;
  pdfTitle: string;
  amount: number;
  date: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet';
  status: 'SUCCESS' | 'FAILED';
}

export interface TestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
  accuracy: number;
  timeSpentSeconds: number;
  date: string;
}
