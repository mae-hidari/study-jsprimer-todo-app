import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * todoItemに対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked/><s>${todoItem.title}</s><button class="delete">☓</button></li>`
      : element`<li><input type="checkbox" class="checkbox"/>${todoItem.title}<button class="delete">☓</button></li>`;

    // チェックボックスがトグルしたときのイベントリスナー関数を登録
    const inputCheckBoxElement = todoItemElement.querySelector(".checkbox");
    inputCheckBoxElement.addEventListener("change", () => {
      // 指定したTodoアイテムの完了状態を反映させる
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    // 削除ボタンがクリックされたときにTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id,
      });
    });
    return todoItemElement;
  }
}
