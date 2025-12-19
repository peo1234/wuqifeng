
export enum TangPhase {
  EARLY = 'EARLY',   // 贞观
  HIGH = 'HIGH',    // 开元
  MID = 'MID',      // 元和
  LATE = 'LATE'      // 大顺
}

export enum IdentityType {
  MERCHANT = 'MERCHANT', // 胡商
  MUSICIAN = 'MUSICIAN', // 乐人
  GUARD = 'GUARD',       // 小吏
  SCHOLAR = 'SCHOLAR'    // 书生
}

export interface PhaseConfig {
  id: TangPhase;
  name: string;
  yearRange: string;
  colorBg: string;
  colorAccent: string;
  historicalContext: string;
  prices: string;
  diBao: string;
  newsTitle: string;
}

export interface IdentityConfig {
  id: IdentityType;
  title: string;
  persona: string;
  greeting: string;
  systemPrompt: string;
  accentColor: string;
  marketGuide: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
