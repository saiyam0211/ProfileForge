import type { GenResult } from './generate'
import type { ProfileConfig } from '../types'
import { SNAKE_VARIANTS, PACMAN_VARIANTS } from './widgets'

export interface WorkflowFile {
  path: string // where it goes in the repo
  title: string
  yaml: string
}

// Snake + Pacman both render an SVG and push it to the `output` branch via
// crazy-max/ghaction-github-pages — combined into one workflow.
function snakePacman(needSnake: boolean, needPacman: boolean, c: ProfileConfig): WorkflowFile {
  const steps: string[] = []
  if (needSnake) {
    const sv = SNAKE_VARIANTS[c.options.snakeVariant] ?? SNAKE_VARIANTS.github
    const outs = sv.outputs.map((o) => `            dist/${o}`).join('\n')
    steps.push(`      - name: Generate snake animation
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
${outs}`)
  }
  if (needPacman) {
    const pv = PACMAN_VARIANTS[c.options.pacmanVariant] ?? PACMAN_VARIANTS.pacman
    steps.push(`      - name: Generate pac-man graph
        uses: abozanona/pacman-contribution-graph@main
        with:
          github_user_name: \${{ github.repository_owner }}
          games: '${pv.game}'`)
  }
  const yaml = `name: Generate Contribution Animations

on:
  schedule:
    - cron: "0 */12 * * *"   # twice a day
  workflow_dispatch:          # run manually from the Actions tab
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
${steps.join('\n\n')}

      - name: Push to the output branch
        uses: crazy-max/ghaction-github-pages@v4.0.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
  return { path: '.github/workflows/animations.yml', title: 'Snake / Pac-Man animation', yaml }
}

function contrib3d(): WorkflowFile {
  const yaml = `name: 3D Contribution Graph

on:
  schedule:
    - cron: "0 18 * * *"   # once a day
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate 3D contribution SVGs
        uses: yoshi389111/github-profile-3d-contrib@0.7.1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          USERNAME: \${{ github.repository_owner }}

      - name: Commit & push
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
          git add -A profile-3d-contrib
          git commit -m "chore: update 3d contribution graph" || echo "no changes"
          git push
`
  return { path: '.github/workflows/profile-3d.yml', title: '3D contribution graph', yaml }
}

function blog(feed: string): WorkflowFile {
  const yaml = `name: Latest Blog Posts

on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Pull latest posts into README
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          feed_list: "${feed || 'https://dev.to/feed/your-username'}"
          max_post_count: 5
`
  return { path: '.github/workflows/blog-posts.yml', title: 'Latest blog posts', yaml }
}

export function buildWorkflows(g: GenResult, c: ProfileConfig): WorkflowFile[] {
  const files: WorkflowFile[] = []
  if (g.needsSnake || g.needsPacman) files.push(snakePacman(g.needsSnake, g.needsPacman, c))
  if (g.needs3d) files.push(contrib3d())
  if (g.needsBlog) files.push(blog(c.options.blogFeed))
  return files
}
