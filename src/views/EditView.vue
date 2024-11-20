<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTodoStore } from '@/stores/todo';

import Loading from '../components/Loading.vue'


const todoStore = useTodoStore();// เรียกใช้ store
const todoId = ref(-1)
const isUpdated = ref(false);// สถานะการแก้ไข alert
const isLoaded = ref(false);// สถานะการโหลด
const route = useRoute();

onMounted(async () => {
    await todoStore.loadTodo(route.params.id) // โหลดข้อมูล
    isLoaded.value = true
    todoId.value = parseInt(route.params.id) // กําหนด id
})

const editTodo = async (selectedTodo) => {
    isLoaded.value = false
    try {
        const bodyData = {
            name: selectedTodo.name,
            status: selectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value) // แก้ไขข้อมูล
        isUpdated.value = true
        isLoaded.value = true
        setTimeout(() => {
            isUpdated.value = false
        }, 3000); // เปลี่ยนสถานะ alert ให้เป็น false หลังจาก 3 วินาที
    } catch (error) {
        console.log('error', error);
    }
}

</script>

<template>
    <main>
        <div class="toast toast-top toast-end">
            <div v-if="isUpdated" class="alert alert-success">
                <span>Update successfully.</span>
            </div>
        </div>
        <loading v-if="!isLoaded">
        </loading>
        <div class="text-center text-2xl my-4"> Edit Todo id {{ todoId }}</div>
        <div class="w-1/2 mx-auto">
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Edit your name?</span>
                </div>
                <input type="text" placeholder="Type name Todo" class="input input-bordered w-full"
                    v-model="todoStore.selectedTodo.name" />
            </label>
            <div class="label">
                <span class="label-text">Status</span>
            </div>
            <select class="select select-bordered w-full" v-model="todoStore.selectedTodo.status">
                <option>Select status</option>
                <option v-for="status in todoStore.statuses" :key="status" :value="status">
                    {{ status }}
                </option>
            </select>
        </div>
        <!-- แก้ไข -->
        <div class="flex w-1/2 mx-auto">
            <button class="btn btn-secondary w-full mt-4" @click="editTodo(todoStore.selectedTodo)">Edit</button>
        </div>
        <!-- black to home -->
        <RouterLink :to="{ name: 'home' }">
            <div class="flex w-1/2 mx-auto">
                <button class="btn btn-accent w-full mt-4">Black</button>
            </div>
        </RouterLink>
    </main>
</template>


<style></style>