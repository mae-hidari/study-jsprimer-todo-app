import { element } from "./view/html-util.js";

export class App {
  mount() {
    const fromElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    let todoItemCount = 0;
    fromElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const todoItemElement = element`<li>${inputElement.value}</li>`;
      containerElement.appendChild(todoItemElement);
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数： ${todoItemCount}`;
      inputElement.value = "";
    });
  }
}
