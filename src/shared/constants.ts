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
  },
  {
    defaultLabel: "api",
    defaultIcon: "node.png",
    name: "Node",
  },
]
