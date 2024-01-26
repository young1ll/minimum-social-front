export interface CandidateItem {
  id: string;
  order: number;
  details: string;
  elected: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  userId: string;
  title: string;
  type: "event" | "poll";
  status: "pending" | "open" | "close";
  isMultiChoice: boolean; // 복수 선택 허용
  isSecretVote: boolean; // 비밀 투표 여부
  castingVote: string; // 최종 결정권자
  resultOpen: boolean; // 결과 공개 여부
  view: number;
  candidateItemCount: number; // 선택지 수
  candidates?: CandidateItem[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface EventCardProps {
  eventDate: string;
  eventLocation: string;
  description: string;
}

export interface PollCardProps {
  description: string;
}
