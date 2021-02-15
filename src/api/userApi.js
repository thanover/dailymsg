import { handleResponse, handleError } from "./apiUtils.js";
const baseUrl = "http://localhost:3001/users/";

export function getUsers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveUser(user) {
  return fetch(baseUrl + (user.id || ""), {
    method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUser(userId) {
  return fetch(baseUrl + userId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function getUserById(userId) {
  return fetch(baseUrl + "?id=" + userId)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((users) => {
        if (users.length !== 1) throw new Error("User not found: " + userId);
        return users[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}
