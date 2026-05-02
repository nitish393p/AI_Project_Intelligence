export interface SecurityFinding {
  id: string;
  type: 'email' | 'phone' | 'api_key' | 'sql_injection';
  severity: 'high' | 'medium' | 'low';
  file: string;
  line: number;
  column: number;
  content: string;
  suggestedFix: string;
  context: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  category: 'security' | 'feature' | 'refactor';
}

export interface ProjectData {
  name: string;
  type: string;
  modules: string[];
  dataFlow: string;
  securityScore: number;
  findings: SecurityFinding[];
  memoryItems: TimelineItem[];
}
