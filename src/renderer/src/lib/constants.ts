// import Frontend from ".images/Frontend.svelte";
// import Backend from ".images/Backend.svelte";
// import Fullstack from ".images/Fullstack.svelte";
// import Database from ".images/Database.svelte";
// import Library from ".images/Library.svelte";
// import Mobile from ".images/Mobile.svelte";
// import Desktop from ".images/Desktop.svelte";
// import Files from ".images/Files.svelte";
// import Person from ".images/Person.svelte";
// import Sms from ".images/Sms.svelte";
// import Events from ".images/Events.svelte";
// import Jobs from ".images/Jobs.svelte";
import type { Technology } from "./types"

export const NEW_PROJECT_APPS_WIDTH = 180

// export const APP_TYPES: AppType[] = [
//   {
//     label: "Frontend, web",
//     id: "frontend",
//     icon: Frontend,
//     defaultName: "Frontend",
//   },
//   {
//     label: "Backend, API",
//     id: "backend",
//     icon: Backend,
//     defaultName: "Backend",
//   },
//   {
//     label: "Fullstack, SSR",
//     id: "fullstack",
//     icon: Fullstack,
//     defaultName: "",
//   },
//   {
//     label: "Database",
//     id: "db",
//     icon: Database,
//     defaultName: "Database",
//   },
//   {
//     label: "Library",
//     id: "library",
//     disabled: true,
//     icon: Library,
//     defaultName: "",
//   },
//   {
//     label: "Mobile",
//     id: "mobile",
//     disabled: true,
//     icon: Mobile,
//     defaultName: "",
//   },
//   {
//     label: "Desktop",
//     id: "desktop",
//     disabled: true,
//     icon: Desktop,
//     defaultName: "",
//   },

//   {
//     label: "File storage",
//     id: "files",
//     disabled: true,
//     icon: Files,
//     defaultName: "",
//   },
//   {
//     label: "Auth",
//     id: "auth",
//     disabled: true,
//     icon: Person,
//     defaultName: "",
//   },
//   {
//     label: "SMS",
//     id: "sms",
//     disabled: true,
//     icon: Sms,
//     defaultName: "",
//   },
//   {
//     label: "Events, push",
//     id: "events",
//     disabled: true,
//     icon: Events,
//     defaultName: "",
//   },
//   {
//     label: "Jobs, CRON",
//     id: "cron",
//     disabled: true,
//     icon: Jobs,
//     defaultName: "",
//   },
// ];

export const TECHNOLOGIES: Technology[] = [
  {
    label: "React",
    id: "react",
    image: "images/react.png",
    category: "frontend",
  },
  {
    label: "Vue",
    id: "vue",
    image: "images/vue.png",
    category: "frontend",
  },
  {
    label: "Svelte",
    id: "svelte",
    image: "images/svelte.png",
    category: "frontend",
  },

  {
    label: "Node",
    id: "node",
    image: "images/node.png",
    category: "backend",
  },

  {
    label: "Python",
    id: "python",
    image: "images/python.png",
    category: "backend",
  },
  {
    label: "Go",
    id: "go",
    image: "images/go.png",
    category: "backend",
  },

  {
    label: "Postgres",
    id: "postgres",
    image: "images/postgres.png",
    category: "database",
  },
  {
    label: "Mongo",
    id: "mongo",
    image: "images/mongodb.png",
    category: "database",
  },
  {
    label: "MySQL",
    id: "mysql",
    image: "images/mysql.png",
    category: "database",
  },

  {
    label: "Redis",
    id: "redis",
    image: "images/redis.png",
    category: "database",
  },
]
