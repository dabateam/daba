import type { Template } from "./types"

export const TEMPLATES: Template[] = [
  {
    name: "mern-stack",
    path: "mern-docker",
    image: "mern-logo.png",
    description: "MongoDB, Express, React and Node",
    apps: [
      {
        name: "web",
        tech: "react",
      },
      {
        name: "api",
        tech: "node",
      },
      {
        name: "db",
        tech: "mongodb",
      },
    ],
  },
  {
    name: "react-node-pg",
    path: "mern-docker",
    image: "mern-logo.png",
    description: "react, node and postgres starter!",
    apps: [
      {
        name: "web",
        tech: "react",
      },
      {
        name: "api",
        tech: "node",
      },
      {
        name: "db",
        tech: "postgres",
      },
    ],
  },
  {
    name: "mean-stack",
    path: "mern-docker",
    image: "mern-logo.png",
    description: "For those who enjoy pain.",
    apps: [
      {
        name: "web",
        tech: "angular",
      },
      {
        name: "api",
        tech: "node",
      },
      {
        name: "db",
        tech: "mongodb",
      },
    ],
  },
]
