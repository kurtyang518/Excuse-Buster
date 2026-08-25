export interface ChatMessage {
  id: string
  role: 'buddy' | 'user'
  text: string
  ts: number
}

export interface Commitment {
  id: string
  task: string
  when?: string
  createdAt: number
  done: boolean
}

export interface Stats {
  excusesBusted: number
  commitmentsKept: number
  streak: number
}
