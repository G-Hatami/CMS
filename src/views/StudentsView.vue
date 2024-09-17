<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in students" @create-item="addDialog = true"
               @delete-item="deleteDialog = true" @update-item="handleUpdate">
    <template #models-name>Students</template>
    <template #model-name>Student</template>
  </models-list>
  <v-dialog v-model="addDialog" max-width="50%" transition="dialog-bottom-transition">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-account-school" title="Add New Student">
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.studentId"
                label="Student Id*"
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
                counter="48"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="student.lastname"
                label="Last name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
                counter="48"
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
        <v-btn text="Cancel" @click="clearStudent"></v-btn>
      </template>
    </v-card>
  </v-dialog>


  <v-dialog v-model="updateDialog" max-width="50%">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-account-school" title="Update Student">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col md="4" sm="6">
              <v-text-field v-model="selectedStudent.studentId" label="StudentId"/>
            </v-col>
            <v-col md="4" sm="6">
              <v-text-field v-model="selectedStudent.firstname" label="Firstname"/>
            </v-col>
            <v-col md="4" sm="6">
              <v-text-field v-model="selectedStudent.lastname" label="Lastname"/>
            </v-col>
            <v-col md="6" sm="6">
              <v-text-field v-model="selectedStudent.nationalNumber" label="National Number"/>

            </v-col>
            <v-col md="6" sm="6">
              <v-select
                v-model="selectedStudent.faculty"
                :items="faculties"
                item-title="name"
                item-value="id"
                label="Faculty"
                required
              ></v-select>
            </v-col>
            <v-col md="12" sm="6">
              <v-text-field v-model="selectedStudent.address" label="Address"/>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="UPDATE" @click="update"></v-btn>
        <v-btn text="CANCEL" @click="updateDialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="deleteDialog" max-width="30%">
    <v-card class="bg-white text-green-darken-4">
      <v-card-title>
        <v-icon class="mr-2">mdi-delete</v-icon>
        Want to <span class="text-red"> DELETE</span>?
      </v-card-title>
      <v-card-text>If you delete the item , you won't access it anymore!</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteItem">DELETE</v-btn>
        <v-btn @click=" deleteDialog = false">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
import {onMounted, ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";
import axios from "axios";



const faculties = ref()
const student = ref({
  studentId: null,
  firstname: null,
  lastname: null,
  nationalNumber: null,
  address: null,
  faculty: null,
})
const addDialog = ref(false)
const updateDialog = ref(false)
const deleteDialog = ref(false)
const selectedStudent = ref(null)

const handleUpdate = (student) => {
  updateDialog.value = true
  selectedStudent.value = {...student}
  console.log("selected", selectedStudent.value)
}
const headers = ref([
  {title: 'Student ID', value: 'studentId', key: 'studentId'},
  {title: 'Firstname', value: 'firstname', key: 'firstname'},
  {title: 'Lastname', value: 'lastname', key: 'lastname'},
  {title: 'National Number', value: 'nationalNumber', key: 'nationalNumber'},
  {title: 'Address', value: 'address', key: 'address'},
  {title: 'Faculty', value: 'faculty', key: 'faculty'},
  {title: 'Actions', value: 'actions'}
])


const getFaculties = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties');
    faculties.value = response.data;
    console.log("gettt", faculties.value)
  } catch (error) {
    console.error('Error fetching faculties:', error);
  }
};
const items = ref()
const getStudents = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/students');
    items.value = response.data;
    console.log("get students", items.value)
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};


//as I learned ,POST method: submits data to be processed to a specified resource.
const add = async () => {
  if (student.value.studentId) {
    await getStudents();
    await axios.post('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/students', {
      "studentId": student.value.studentId,
      "firstname": student.value.firstname,
      "lastname": student.value.lastname,
      "nationalNumber": student.value.nationalNumber,
      "address": student.value.address,
      "faculty": student.value.faculty,
    })
      .then((response) => console.log("wfgre", response.status, response.data))
      .catch((error) => console.log(error))
    clearStudent()
  }

}
const clearStudent = () => {
  student.value.studentId = null
  student.value.firstname = null
  student.value.lastname = null
  student.value.nationalNumber = null
  student.value.faculty = null
  student.value.address = null
  addDialog.value = false
}

//So no put , PATCH: it is used to update an existing entity with new information.
const update = async () => {
  try {
    console.log((await axios.patch('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/students')).data)
    updateDialog.value = false
  } catch (error) {
    console.error('Error creating student:', error);
  }
}
const deleteItem = async () => {
  await axios.delete('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/students')
    .then((response) => console.log(response.status))
  deleteDialog.value = false
}


onMounted(() => {
  getFaculties();
  getStudents()

})

</script>


<style scoped lang="scss">

</style>
