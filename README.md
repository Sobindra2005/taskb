
# Kanban Board 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Features 

#### 1.draggable Task
#### 2. smooth animations for card movement
#### 3.keyboard accessibility for for sorting
#### 4.TypeScript with strict mode enabled
#### 5.Include unit and integration tests
#### 6.drag-and-drop functionality using dnd-kit
#### 7.Saved progress
#### 8.undo redo 
#### 9. filtering cards with card name 
#### 10. create and delete task 


##  Technology choices and rationale
##### Next.js: We chose it for server-side rendering (SSR) and automatic optimizations, helping with performance and SEO. It also makes routing and development super easy.
##### React DnD Kit: Got to know that React beautiful dnd is deprecated. also, this was a no-brainer for drag-and-drop features—it's fast, flexible, and integrates smoothly with React.
##### React Icons: For icons, React Icons gives us a huge selection with minimal impact on performance, plus it’s simple to use.
##### Lucide React: We love Lucide’s high-quality SVG icons, which are easy to customize and look great across all screens.
##### TypeScript: TypeScript helps us catch bugs early, offers better code completion, and makes it easier to scale the project.
##### Tailwind CSS: Tailwind's utility-first approach makes styling quick and easy.


## Known Limitations and Trade-offs
#### 1.facing some issue when trying to drag task from one card to another. It dropping but the whole task are transfered to the targeted card.
#### 2.Average UI 
#### 3.isn't Mobile responsive 
#### 4.Performance issue on Large Data Sets
#### 5.Limited Features

## Future Improvements

#### 1. Device responsive
#### 2. Better User Interface
#### 3. caching and memoizing
#### 4. infinite scrolling
#### 5. Lazy Loading
#### 6. Theming Options
#### 7. Better Performance
#### 8. Customizable Settings


## Time Spent 
#### approx. 12 hours
