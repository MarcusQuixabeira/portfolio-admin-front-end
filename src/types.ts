export interface Language {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Header {
  id: string
  name: string
  title: string
  image_url: string
  image_alt: string
  created_at: string
  updated_at: string
  language_id: string
}

export interface TableHeader {
  text: string
  value: string
  className?: string
}

export interface User {
  id: string
  email: string
  username: string
}