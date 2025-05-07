export interface Language {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Header {
  text: string
  value: string
  className?: string
}