import { defineStore } from "pinia"

export const useTreeStore = defineStore({
  id: "tree",
  state: () => ({
    tree: [
      {
        name: "Dir 1",
        id: "1",
        children: [
          {
            name: "Dir 1-1",
            id: "2",
            children: [{ name: "File 1-1-1", id: "3", children: [] }],
          },
        ],
      },
      {
        name: "Dir 2",
        id: "4",
        children: [
          {
            name: "Dir 2-1",
            id: "5",
            children: [
              {
                name: "Dir 2-1-1",
                id: "8",
                children: [
                  {
                    name: "Dir 2-1-1-1",
                    id: "9",
                    children: [
                      { name: "File 2-1-1-1", id: "10", children: [] },
                    ],
                  },
                ],
              },
            ],
          },
          { name: "File 2-2", id: "6", children: [] },
        ],
      },
      { name: "File 2", id: "7", children: [] },
    ],
  }),
  actions: {
    removeNode(id) {
      function recursiveRemove(node) {
        // Проверяем, есть ли у узла дочерние элементы
        if (node.children) {
          // Удаляем дочерние элементы по id
          node.children = node.children.filter((child) => child.id !== id);
          // Рекурсивно вызываем функцию для каждого оставшегося дочернего элемента
          node.children.forEach((child) => recursiveRemove(child));
        }
      }
      // Удаляем корневые узлы по id
      this.tree = this.tree.filter((item) => item.id !== id);
      // Рекурсивно вызываем функцию для каждого узла дерева
      this.tree.forEach((node) => recursiveRemove(node));
    },

    editNode(id, newName) {
      function recursiveEdit(node) {
        if (node.id === id) {
          // Заменяем имя узла на новое
          node.name = newName;
        } else if (node.children) {
          // Проверяем есть ли у узла дочерние элементы
          node.children = node.children.map((child) => {
            if (child.id === id) {
              // Обновляем имя дочерего элемента
              return { ...child, name: newName };
            } else {
              // Рекурсивно вызываем функцию для каждого дочернего элемента
              return recursiveEdit(child);
            }
          });
        }
        return node;
      }
      // Рекурсивно вызываем функцию для каждого узла в дереве
      this.tree = this.tree.map((node) => recursiveEdit(node));
    },
  },
})
