export interface Portfolio {
  username: string
  role: string
  stack: string[]
  ats: number
  repos: number
  stars: number
  contributions: number
}

export const MOCK_PORTFOLIOS: Portfolio[] = [
  { username: 'dishant11max', role: 'Fullstack Engineer',   stack: ['Next.js','React','Supabase','TypeScript'],  ats: 94, repos: 18, stars: 47,  contributions: 847  },
  { username: 'harshsriv',    role: 'Backend Engineer',     stack: ['Go','PostgreSQL','Docker','Redis'],           ats: 89, repos: 24, stars: 103, contributions: 1204 },
  { username: 'divyanshhg',   role: 'Frontend Developer',   stack: ['React','TailwindCSS','Framer','Vite'],       ats: 87, repos: 12, stars: 31,  contributions: 420  },
  { username: 'aniruddh_k',   role: 'ML Engineer',          stack: ['Python','PyTorch','FastAPI','HuggingFace'],  ats: 91, repos: 31, stars: 218, contributions: 2103 },
  { username: 'priyankam',    role: 'Fullstack Engineer',   stack: ['Next.js','Prisma','TypeScript','AWS'],       ats: 88, repos: 15, stars: 29,  contributions: 634  },
  { username: 'kartik_dev',   role: 'DevOps Engineer',      stack: ['Docker','Kubernetes','Terraform','AWS'],     ats: 86, repos: 9,  stars: 14,  contributions: 398  },
  { username: 'sahilbatra',   role: 'Frontend Developer',   stack: ['Vue','Nuxt','Pinia','TailwindCSS'],          ats: 83, repos: 11, stars: 22,  contributions: 511  },
  { username: 'yashkumar01',  role: 'Backend Engineer',     stack: ['Node.js','Express','MongoDB','Redis'],       ats: 85, repos: 20, stars: 56,  contributions: 789  },
  { username: 'nidhichopra',  role: 'iOS Developer',        stack: ['Swift','SwiftUI','Firebase','Xcode'],        ats: 90, repos: 8,  stars: 67,  contributions: 445  },
  { username: 'rohanchakra',  role: 'Data Engineer',        stack: ['Python','Spark','Airflow','BigQuery'],       ats: 88, repos: 14, stars: 38,  contributions: 912  },
  { username: 'aayushijain',  role: 'Fullstack Engineer',   stack: ['React','Node.js','PostgreSQL','Stripe'],     ats: 92, repos: 16, stars: 71,  contributions: 1034 },
  { username: 'vikramsen',    role: 'Systems Engineer',     stack: ['Rust','C++','WASM','Linux'],                 ats: 95, repos: 22, stars: 189, contributions: 3201 },
]
