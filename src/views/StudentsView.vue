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
                v-model="student.studentId"
                label="Student number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only numeric characters (0-9) are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.firstname"
                label="First name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.lastname"
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
                v-model="selectedFaculty"
                :items="faculties"
                item-title="name"
                item-value="id"
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

  <ul>
    <li v-for="student in students" :key="student.id">
      {{ student.firstname }} {{ student.lastname }} {{ student.studentId }}
    </li>
  </ul>
</template>


<script setup>
import {onMounted, ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";
import axios from "axios";


const student = ref({
  studentId: '',
  firstname: '',
  lastname: '',
  nationalNumber: '',
  faculty: '',
  address: ''
})
const selectedFaculty = ref(null)
const faculties = ref()
const getFaculties = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties');
    faculties.value = response.data;
    console.log("gettt" , faculties.value)
  } catch (error) {
    console.error('Error fetching faculties:', error);
  }
};
onMounted(() => {
  getFaculties()
})
// const responseMessage = ref('')
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
const students = ref([])
const getStudents = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/students');
    students.value = response.data; // Assign fetched students to reactive students array
    console.log("why?", students.value)
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

const add = async () => {
  try {
    const response = await axios.post('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/students', student)
    console.log('Student created:', response.data);
    await getStudents();
  } catch (error) {
    console.error('Error creating student:', error);
  }
}

onMounted(() => {
  getStudents()
})

</script>


<style scoped lang="scss">

</style>
