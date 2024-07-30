import type { Technology, Template } from "./types"

export const TEMPLATES: Template[] = [
  {
    name: "mern-stack",
    path: "mern-docker",
    image: "mern-logo.png",
    description: "MongoDB, Express, React and Node",
    apps: [
      {
        name: "web",
        technology: {
          name: "React",
          defaultIcon: "react.png",
        },
      },
      {
        name: "api",
        technology: {
          name: "Node",
          defaultIcon: "node.png",
        },
      },
      {
        name: "db",
        technology: {
          name: "MongoDB",
          defaultIcon: "mongodb.png",
        },
      },
    ],
  },
]

export const TECHNOLOGIES: Technology[] = [
  {
    defaultLabel: "web",
    defaultIcon: "react.png",
    name: "React",
  },
  {
    defaultLabel: "db",
    defaultIcon: "postgres.png",
    name: "Postgres",
  },
  {
    defaultLabel: "api",
    defaultIcon: "node.png",
    name: "Node",
  },
]
