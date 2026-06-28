// Curated tech catalog. `si` = skillicons.dev slug (icon grid).
// `logo`/`color` = Simple Icons slug + brand hex for shields.io badges.
export interface Skill {
  id: string
  label: string
  cat: string
  si: string // skillicons.dev / iconify skill-icons slug ('' if unsupported)
  logo: string // simpleicons slug for shields badge
  color: string // brand hex (no '#')
  logos?: string // iconify `logos:` id (colourful) for skills not in skill-icons
}

export const SKILL_CATS = [
  'Languages',
  'Frontend',
  'Backend',
  'Mobile',
  'Database',
  'DevOps & Cloud',
  'AI / Data',
  'Tools',
] as const

export const SKILLS: Skill[] = [
  // Languages
  { id: 'js', label: 'JavaScript', cat: 'Languages', si: 'js', logo: 'javascript', color: 'F7DF1E' },
  { id: 'ts', label: 'TypeScript', cat: 'Languages', si: 'ts', logo: 'typescript', color: '3178C6' },
  { id: 'python', label: 'Python', cat: 'Languages', si: 'python', logo: 'python', color: '3776AB' },
  { id: 'java', label: 'Java', cat: 'Languages', si: 'java', logo: 'openjdk', color: 'ED8B00' },
  { id: 'cpp', label: 'C++', cat: 'Languages', si: 'cpp', logo: 'cplusplus', color: '00599C' },
  { id: 'c', label: 'C', cat: 'Languages', si: 'c', logo: 'c', color: 'A8B9CC' },
  { id: 'cs', label: 'C#', cat: 'Languages', si: 'cs', logo: 'csharp', color: '512BD4' },
  { id: 'go', label: 'Go', cat: 'Languages', si: 'go', logo: 'go', color: '00ADD8' },
  { id: 'rust', label: 'Rust', cat: 'Languages', si: 'rust', logo: 'rust', color: '000000' },
  { id: 'php', label: 'PHP', cat: 'Languages', si: 'php', logo: 'php', color: '777BB4' },
  { id: 'ruby', label: 'Ruby', cat: 'Languages', si: 'ruby', logo: 'ruby', color: 'CC342D' },
  { id: 'kotlin', label: 'Kotlin', cat: 'Languages', si: 'kotlin', logo: 'kotlin', color: '7F52FF' },
  { id: 'swift', label: 'Swift', cat: 'Languages', si: 'swift', logo: 'swift', color: 'F05138' },
  { id: 'dart', label: 'Dart', cat: 'Languages', si: 'dart', logo: 'dart', color: '0175C2' },
  { id: 'scala', label: 'Scala', cat: 'Languages', si: 'scala', logo: 'scala', color: 'DC322F' },
  { id: 'elixir', label: 'Elixir', cat: 'Languages', si: 'elixir', logo: 'elixir', color: '4B275F' },
  { id: 'lua', label: 'Lua', cat: 'Languages', si: 'lua', logo: 'lua', color: '2C2D72' },
  { id: 'r', label: 'R', cat: 'Languages', si: 'r', logo: 'r', color: '276DC3' },
  { id: 'bash', label: 'Bash', cat: 'Languages', si: 'bash', logo: 'gnubash', color: '4EAA25' },

  // Frontend
  { id: 'html', label: 'HTML5', cat: 'Frontend', si: 'html', logo: 'html5', color: 'E34F26' },
  { id: 'css', label: 'CSS3', cat: 'Frontend', si: 'css', logo: 'css3', color: '1572B6' },
  { id: 'react', label: 'React', cat: 'Frontend', si: 'react', logo: 'react', color: '61DAFB' },
  { id: 'nextjs', label: 'Next.js', cat: 'Frontend', si: 'nextjs', logo: 'nextdotjs', color: '000000' },
  { id: 'vue', label: 'Vue', cat: 'Frontend', si: 'vue', logo: 'vuedotjs', color: '4FC08D' },
  { id: 'nuxt', label: 'Nuxt', cat: 'Frontend', si: 'nuxtjs', logo: 'nuxtdotjs', color: '00DC82' },
  { id: 'angular', label: 'Angular', cat: 'Frontend', si: 'angular', logo: 'angular', color: 'DD0031' },
  { id: 'svelte', label: 'Svelte', cat: 'Frontend', si: 'svelte', logo: 'svelte', color: 'FF3E00' },
  { id: 'astro', label: 'Astro', cat: 'Frontend', si: 'astro', logo: 'astro', color: 'BC52EE' },
  { id: 'tailwind', label: 'Tailwind', cat: 'Frontend', si: 'tailwind', logo: 'tailwindcss', color: '06B6D4' },
  { id: 'sass', label: 'Sass', cat: 'Frontend', si: 'sass', logo: 'sass', color: 'CC6699' },
  { id: 'redux', label: 'Redux', cat: 'Frontend', si: 'redux', logo: 'redux', color: '764ABC' },
  { id: 'vite', label: 'Vite', cat: 'Frontend', si: 'vite', logo: 'vite', color: '646CFF' },
  { id: 'threejs', label: 'Three.js', cat: 'Frontend', si: 'threejs', logo: 'threedotjs', color: '000000' },

  // Backend
  { id: 'nodejs', label: 'Node.js', cat: 'Backend', si: 'nodejs', logo: 'nodedotjs', color: '5FA04E' },
  { id: 'express', label: 'Express', cat: 'Backend', si: 'express', logo: 'express', color: '000000' },
  { id: 'nestjs', label: 'NestJS', cat: 'Backend', si: 'nestjs', logo: 'nestjs', color: 'E0234E' },
  { id: 'deno', label: 'Deno', cat: 'Backend', si: 'deno', logo: 'deno', color: '70FFAF' },
  { id: 'bun', label: 'Bun', cat: 'Backend', si: 'bun', logo: 'bun', color: 'FBF0DF' },
  { id: 'django', label: 'Django', cat: 'Backend', si: 'django', logo: 'django', color: '092E20' },
  { id: 'flask', label: 'Flask', cat: 'Backend', si: 'flask', logo: 'flask', color: '000000' },
  { id: 'fastapi', label: 'FastAPI', cat: 'Backend', si: 'fastapi', logo: 'fastapi', color: '009688' },
  { id: 'spring', label: 'Spring', cat: 'Backend', si: 'spring', logo: 'spring', color: '6DB33F' },
  { id: 'laravel', label: 'Laravel', cat: 'Backend', si: 'laravel', logo: 'laravel', color: 'FF2D20' },
  { id: 'rails', label: 'Rails', cat: 'Backend', si: 'rails', logo: 'rubyonrails', color: 'D30001' },
  { id: 'graphql', label: 'GraphQL', cat: 'Backend', si: 'graphql', logo: 'graphql', color: 'E10098' },

  // Mobile
  { id: 'flutter', label: 'Flutter', cat: 'Mobile', si: 'flutter', logo: 'flutter', color: '02569B' },
  { id: 'reactnative', label: 'React Native', cat: 'Mobile', si: 'react', logo: 'react', color: '61DAFB' },
  { id: 'android', label: 'Android', cat: 'Mobile', si: 'androidstudio', logo: 'android', color: '34A853' },
  { id: 'ios', label: 'iOS', cat: 'Mobile', si: 'apple', logo: 'apple', color: '000000' },

  // Database
  { id: 'postgres', label: 'PostgreSQL', cat: 'Database', si: 'postgres', logo: 'postgresql', color: '4169E1' },
  { id: 'mysql', label: 'MySQL', cat: 'Database', si: 'mysql', logo: 'mysql', color: '4479A1' },
  { id: 'mongodb', label: 'MongoDB', cat: 'Database', si: 'mongodb', logo: 'mongodb', color: '47A248' },
  { id: 'redis', label: 'Redis', cat: 'Database', si: 'redis', logo: 'redis', color: 'FF4438' },
  { id: 'sqlite', label: 'SQLite', cat: 'Database', si: 'sqlite', logo: 'sqlite', color: '003B57' },
  { id: 'prisma', label: 'Prisma', cat: 'Database', si: 'prisma', logo: 'prisma', color: '2D3748' },
  { id: 'supabase', label: 'Supabase', cat: 'Database', si: 'supabase', logo: 'supabase', color: '3FCF8E' },
  { id: 'firebase', label: 'Firebase', cat: 'Database', si: 'firebase', logo: 'firebase', color: 'DD2C00' },

  // DevOps & Cloud
  { id: 'docker', label: 'Docker', cat: 'DevOps & Cloud', si: 'docker', logo: 'docker', color: '2496ED' },
  { id: 'kubernetes', label: 'Kubernetes', cat: 'DevOps & Cloud', si: 'kubernetes', logo: 'kubernetes', color: '326CE5' },
  { id: 'aws', label: 'AWS', cat: 'DevOps & Cloud', si: 'aws', logo: 'amazonwebservices', color: '232F3E' },
  { id: 'gcp', label: 'GCP', cat: 'DevOps & Cloud', si: 'gcp', logo: 'googlecloud', color: '4285F4' },
  { id: 'azure', label: 'Azure', cat: 'DevOps & Cloud', si: 'azure', logo: 'microsoftazure', color: '0078D4' },
  { id: 'vercel', label: 'Vercel', cat: 'DevOps & Cloud', si: 'vercel', logo: 'vercel', color: '000000' },
  { id: 'netlify', label: 'Netlify', cat: 'DevOps & Cloud', si: 'netlify', logo: 'netlify', color: '00C7B7' },
  { id: 'nginx', label: 'Nginx', cat: 'DevOps & Cloud', si: 'nginx', logo: 'nginx', color: '009639' },
  { id: 'linux', label: 'Linux', cat: 'DevOps & Cloud', si: 'linux', logo: 'linux', color: 'FCC624' },
  { id: 'terraform', label: 'Terraform', cat: 'DevOps & Cloud', si: 'terraform', logo: 'terraform', color: '844FBA' },

  // AI / Data
  { id: 'tensorflow', label: 'TensorFlow', cat: 'AI / Data', si: 'tensorflow', logo: 'tensorflow', color: 'FF6F00' },
  { id: 'pytorch', label: 'PyTorch', cat: 'AI / Data', si: 'pytorch', logo: 'pytorch', color: 'EE4C2C' },
  { id: 'pandas', label: 'Pandas', cat: 'AI / Data', si: '', logo: 'pandas', color: 'E70488', logos: 'pandas-icon' },
  { id: 'numpy', label: 'NumPy', cat: 'AI / Data', si: '', logo: 'numpy', color: '4DABCF', logos: 'numpy' },
  { id: 'opencv', label: 'OpenCV', cat: 'AI / Data', si: 'opencv', logo: 'opencv', color: '5C3EE8' },
  { id: 'openai', label: 'OpenAI', cat: 'AI / Data', si: '', logo: 'openai', color: '74AA9C', logos: 'openai-icon' },

  // Tools
  { id: 'git', label: 'Git', cat: 'Tools', si: 'git', logo: 'git', color: 'F05032' },
  { id: 'github', label: 'GitHub', cat: 'Tools', si: 'github', logo: 'github', color: '181717' },
  { id: 'figma', label: 'Figma', cat: 'Tools', si: 'figma', logo: 'figma', color: 'F24E1E' },
  { id: 'vscode', label: 'VS Code', cat: 'Tools', si: 'vscode', logo: 'visualstudiocode', color: '007ACC' },
  { id: 'postman', label: 'Postman', cat: 'Tools', si: 'postman', logo: 'postman', color: 'FF6C37' },
  { id: 'notion', label: 'Notion', cat: 'Tools', si: 'notion', logo: 'notion', color: '000000' },
]

export function skillById(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id)
}
