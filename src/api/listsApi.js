import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/lists/";

export function getLists() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getListById(listId) {
  return fetch(baseUrl + "?id=" + listId)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((lists) => {
        if (lists.length !== 1) throw new Error("List not found: " + listId);
        return lists[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveList(list) {
  return fetch(baseUrl + (list.id || ""), {
    method: list.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(list),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteList(listId) {
  return fetch(baseUrl + listId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
