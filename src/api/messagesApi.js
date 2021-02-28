import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/messages/";

export function getMessages() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getMessageById(messageId) {
  return fetch(baseUrl + "?id=" + messageId)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((messages) => {
        if (messages.length !== 1)
          throw new Error("List not found: " + messageId);
        return messages[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveMessage(massage) {
  return fetch(baseUrl + (massage.id || ""), {
    method: massage.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(massage),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMessage(messageId) {
  return fetch(baseUrl + messageId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
