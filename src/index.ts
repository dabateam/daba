export type JSONType =
  | "object"
  | "string"
  | "array"
  | "number"
  | "boolean"
  | "null";

export type JSONArray = Array<JSONValue>;
export type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | JSONArray
  | null;

export interface JSONObject {
  [x: string]: JSONValue;
}

let API_URL = "https://api.daba.so";

let PROJECT_ID = "";
let PROJECT_SECRET = "";

const getFullURL = () => {
  return `${API_URL}/${PROJECT_ID}/${PROJECT_SECRET}`;
};

export const get = (key: string): Promise<JSONValue> =>
  fetch(`${getFullURL()}/key/${key}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => res.data as JSONValue);

export const remove = (key: string) =>
  fetch(`${getFullURL()}/key/${key}`, {
    method: "DELETE",
  });

export const set = (key: string, value: JSONValue) => {
  return fetch(`${getFullURL()}/key/${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: value,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data as JSONValue);
};

export const upload = (
  data: FormData
): Promise<{
  url: string;
  fileName: string;
}> =>
  fetch(`${getFullURL()}/upload`, {
    method: "POST",
    body: data,
  }).then((res) => {
    return res.json();
  });

export const setup = (
  {
    projectId,
    secret,
  }: {
    projectId: string;
    secret: string;
  },
  options?: {
    baseUrl?: string;
  }
) => {
  if (!projectId) {
    throw new Error("daba setup: please provide your projectId");
  }
  if (!secret) {
    throw new Error("daba setup: please provide your secret key");
  }
  PROJECT_SECRET = secret;
  PROJECT_ID = projectId;

  if (options?.baseUrl) {
    API_URL = options.baseUrl;
  }
};
