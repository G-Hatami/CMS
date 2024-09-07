<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in students" @create-item="addDialog = true"
               @delete-item="deleteStudent" @update-item="updateStudent">
    <template #models-name>Students</template>
    <template #model-name>Student</template>
  </models-list>
  <v-dialog v-model="addDialog" max-width="50%">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-account-school" title="Add New Student">
      <v-card-text>
        <v-form ref="formValid" @submit.prevent="add">
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.studentNumber"
                label="Student number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only numeric characters (0-9) are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.firstName"
                label="First name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.lastName"
                label="Last name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="student.nationalNumber"
                label="National number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only positive numbers are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="student.faculty"
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Faculty"
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="student.address"
                label="Address"
                clearable
                :rules="[v => (v && v.length <= 128) || 'At most 128 char']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" type="submit" @click="add"></v-btn>
        <v-btn text="Cancel" @click="addDialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <p class="text-green">{{ responseMessage }}</p>
</template>


<script setup>
import {ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";
import axios from "axios";


const student = ref({
  studentNumber: '',
  firstName: '',
  lastName: '',
  nationalNumber: '',
  faculty: '',
  address: ''
})
const responseMessage = ref('')
const addDialog = ref(false)
const headers = ref([
  {title: 'Faculty Name', value: 'name', key: 'name'},
  {title: 'Department', value: 'department', key: 'department'},
  {title: 'Status', value: 'status'},
  {title: 'Actions', value: 'actions'}
])
const items = ref([{name: 'A', department: 'Computer Science', status: 'Active'},
  {name: 'Jane Doe', department: 'IT', status: 'Inactive'},])

const updateStudent = (item) => {
  console.log("hiededefew", item)
}
const deleteStudent = (item) => {
  console.log("dsfvfdgfhghghg", item)
}
const add = async () => {
  try {
    const response = await axios.get('https://9856f1c6-1a02-4cf1-9b33-a1fa81f758ee.mock.pstmn.io', {
      studentNumber: student.value.studentNumber,
      firstName: student.value.firstName,
      lastName: student.value.lastName,
      nationalNumber: student.value.nationalNumber,
      faculty: student.value.faculty,
      address: student.value.address
    })
    if (response.status === 200) {
      responseMessage.value = 'Student added successfully!';
      console.log("welll")
    }
  } catch (error) {
    console.error('Error adding student:', error);
    responseMessage.value = 'Error occurred while adding student';
  } finally {
    // Close the dialog after submission
    addDialog.value = false;
  }
}

</script>


<style scoped lang="scss">

</style>
