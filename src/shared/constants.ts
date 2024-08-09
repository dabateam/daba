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
    repo: "https://github.com/dabateam/apps",
    pathInRepo: "apps/react",
    name: "React",
    volumes: ["./{{appName}}:/app", "/app/node_modules"],
    ports: "5173:5173",
  },
  {
    defaultLabel: "db",
    defaultIcon: "postgres.png",
    name: "Postgres",
    image: "postgres:16-bookworm",
    envVars: [
      {
        key: "POSTGRES_PASSWORD",
        value: "some_randomly_generated_password",
        description: "Password of the root super user",
        required: true,
      },
      {
        key: "POSTGRES_USER",
        value: "postgres",
        description:
          "Root user's username - used in conjunction with POSTGRES_PASSWORD",
        required: true,
      },
    ],
    namedVolumes: ["postgres_data:/var/lib/postgresql/data"],
  },
  {
    defaultLabel: "api",
    defaultIcon: "node.png",
    repo: "https://github.com/dabateam/apps",
    pathInRepo: "apps/node-express",
    name: "Node",
    volumes: ["./{{appName}}:/app", "/app/node_modules"],
    ports: "3000:3000",
  },
]
