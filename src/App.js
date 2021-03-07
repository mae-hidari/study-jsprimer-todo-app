import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const fromElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    this.todoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ui />`;

      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItem = this.todoListModel.getTodoItems();
      todoItem.forEach((item) => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked/><s>${item.title}</s><button class="delete">☓</button></li>`
          : element`<li><input type="checkbox" class="checkbox"/>${item.title}<button class="delete">☓</button></li>`;
        todoListElement.appendChild(todoItemElement);

        // チェックボックスがトグルしたときのイベントリスナー関数を登録
        const inputCheckBoxElement = todoItemElement.querySelector(".checkbox");
        inputCheckBoxElement.addEventListener("change", () => {
          // 指定したTodoアイテムの完了状態を反映させる
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed,
          });
        });
        // 削除ボタンがクリックされたときにTodoListModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          this.todoListModel.deleteTodo({
            id: item.id,
          });
        });

        todoListElement.appendChild(todoItemElement);
      });

      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    fromElement.addEventListener("submit", (e) => {
      e.preventDefault();

      if (inputElement.value === "") {
        return;
      }

      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
}
