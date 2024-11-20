import { defineStore } from "pinia";
import axios from "axios";


const baseUrl = "https://67380dc24eb22e24fca6caea.mockapi.io";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ["Pending", "Doing", "Done"],
  }),

  actions: {
    // load all todos
    async loadTodos() {
      try {
        const response = await axios.get(`${baseUrl}/Todos`);
        this.list = response.data;
        console.log("load todos complete");
      } catch (error) {
        console.log("error", error);
      }
    },
    // load single todo
    async loadTodo(id) {
      try {
        const response = await axios.get(`${baseUrl}/Todos/${id}`);
        this.selectedTodo = response.data;
        console.log("load todo by id complete");
      } catch (error) {
        console.log("error", error);
      }
    },
    // add todo
    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: "Pending",
      };
      try {
        const response = await axios.post(`${baseUrl}/Todos`, bodyData);
        this.list.push(response.data);
        await this.loadTodos(); // โหลดข้อมูลใหม่
        console.log("add todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },
    // edit todo
    async editTodo (todoData, id) {
      try {
        const response = await axios.put(`${baseUrl}/Todos/${id}`,todoData);
        console.log(`edit todo complete ${response.data}`);
      } catch (error) {
        console.log("error", error);
      }
    },
    // remove todo
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${baseUrl}/Todos/${id}`);
        console.log("remove todo complete");
      }
      catch (error) {
        console.log("error", error);
      }
    }
  },
});
