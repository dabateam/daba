// import { API_URL } from "./constants";
// import type { JSONValue, SidebarKey } from "./types";

// let PROJECT_ID = "";
// let PROJECT_SECRET = "";

// const getFullURL = () => {
//   return `${API_URL}/${PROJECT_ID}/${PROJECT_SECRET}`;
// };

// export const getKey = (key: string): Promise<JSONValue> =>
//   fetch(`${getFullURL()}/key/${key}`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => (res.data as JSONValue) ?? null);

// export const removeKey = (key: string) =>
//   fetch(`${getFullURL()}/key/${key}`, {
//     method: "DELETE",
//   });

// export const setKey = (key: string, value: JSONValue) => {
//   return fetch(`${getFullURL()}/key/${key}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       data: value,
//     }),
//   })
//     .then((res) => res.json())
//     .then((res) => res.data as JSONValue);
// };

// export const getKeys = (): Promise<SidebarKey[]> =>
//   fetch(`${getFullURL()}/keys`).then((res) => {
//     return res.json();
//   });

// // Files

// export const getFiles = (): Promise<string[]> =>
//   fetch(`${getFullURL()}/files`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => {
//       return res.files || [];
//     });

// export const deleteFile = (id: string): Promise<any> =>
//   fetch(`${getFullURL()}/file/` + id, {
//     method: "DELETE",
//   }).then((res) => {
//     return res.json();
//   });

// export const uploadFile = (data: any): Promise<any> =>
//   fetch(`${getFullURL()}/upload`, {
//     method: "POST",
//     body: data,
//   }).then((res) => {
//     return res.json();
//   });

// // Project

// export const createProject = (): Promise<{ id: string; secret: string }> =>
//   fetch(`${API_URL}/project`, {
//     method: "POST",
//   }).then((res) => {
//     return res.json();
//   });

// export const claimProject = (id: string, email: string) =>
//   fetch(`${API_URL}/claim`, {
//     method: "POST",
//     body: JSON.stringify({
//       id,
//       email,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => {
//     return res.json();
//   });

// export const getProjectInfo = (
//   id: string
// ): Promise<{
//   size_kb: number;
//   date_created: string;
//   owner: string;
//   files_size: number;
// }> => {
//   return fetch(`${API_URL}/project_info/` + id).then((res) => {
//     return res.json();
//   });
// };

// export const getFilesSize = (
//   id: string
// ): Promise<{ size_kb: number; date_created: string; owner: string }> => {
//   return fetch(`${API_URL}/files_size/` + id).then((res) => {
//     return res.json();
//   });
// };

// export const setup = ({
//   projectId,
//   secret,
// }: {
//   projectId: string;
//   secret: string;
// }) => {
//   PROJECT_SECRET = secret;
//   PROJECT_ID = projectId;
// };
