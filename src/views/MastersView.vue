<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in masters" @update-item="handleUpdate"
               @create-item="addDialog = true" @delete-item="deleteDialog = true">
    <template #models-name>Masters</template>
    <template #model-name>Master</template>
  </models-list>
  <v-dialog v-model="addDialog" max-width="50%" transition="dialog-bottom-transition">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-human-male-board" title="Add New Master">
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="master.personalNumber"
                label="Personal number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only numeric characters (0-9) are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="master.firstname"
                label="First name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
                counter="48"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="master.lastname"
                label="Last name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
                counter="48"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                v-model="master.nationalNumber"
                label="National number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only positive numbers are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-select
                v-model="master.faculty"
                :items="faculties"
                item-title="name"
                item-value="id"
                label="Faculty"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-select
                v-model="master.courses"
                :items="courses"
                item-title="courseName"
                item-value="courseName"
                label="Course"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ms-auto" text="Ok" type="submit" @click="add"></v-btn>
        <v-btn text="Cancel" @click="clearMaster"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateDialog" max-width="50%" transition="dialog-bottom-transition">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-human-male-board" title="Update Master">
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedMaster.personalNumber"
                label="Personal number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only numeric characters (0-9) are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedMaster.firstname"
                label="First name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
                counter="48"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedMaster.lastname"
                label="Last name*"
                :rules="[v => !!v || 'Required', v => (v && v.length <= 48) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed']"
                clearable
                counter="48"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                v-model="selectedMaster.nationalNumber"
                label="National number*"
                :rules="[v => !!v || 'Required', v => /^\d+$/.test(v) || 'Only positive numbers are allowed']"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-select
                v-model="selectedMaster.faculty"
                :items="faculties"
                item-title="name"
                item-value="id"
                label="Faculty"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-select
                v-model="selectedMaster.courses"
                :items="courses"
                item-title="courseName"
                item-value="courseName"
                label="Course"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ms-auto" text="UPDATE" @click="update"></v-btn>
        <v-btn text="CANCEL" @click="updateDialog = false"></v-btn>
      </v-card-actions>
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

const master = ref({
  personalNumber: null,
  firstname: null,
  lastname: null,
  nationalNumber: null,
  courses: null,
  faculty: null
})
const addDialog = ref(false)
const updateDialog = ref(false)
const deleteDialog = ref(false)
const selectedMaster = ref(null)
const handleUpdate = (master) => {
  selectedMaster.value = {...master}
  updateDialog.value = true
}
const headers = ref([
  {title: 'Personal Number', value: 'personalNumber', key: 'personalNumber'},
  {title: 'Firstname', value: 'firstname', key: 'firstname'},
  {title: 'Lastname', value: 'lastname', key: 'lastname'},
  {title: 'National Number', value: 'nationalNumber', key: 'nationalNumber'},
  {title: 'Courses', value: 'courses', key: 'courses'},
  {title: 'Faculty', value: 'faculty', key: 'faculty'},
  {title: 'Actions', value: 'actions'}
])

const items = ref()
const getMasters = async () => {
  try {
    items.value = (await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/masters')).data
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}
const courses = ref(null)
const getCourses = async () => {
  try {
    courses.value = (await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/courses')).data
    console.log("courses", courses.value)
  } catch (error) {
    console.log(error)
  }
}
const faculties = ref(null)
const getFaculties = async () => {
  try {
    faculties.value = (await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties')).data
    console.log("faculties", faculties.value)
  } catch (error) {
    console.log(error)
  }
}
const clearMaster = () => {
  master.value.personalNumber = null
  master.value.firstname = null
  master.value.lastname = null
  master.value.nationalNumber = null
  master.value.faculty = null
  master.value.courses = null
  addDialog.value = false
}
const add = async () => {
  await axios.post('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/masters', {
    "personalNumber": master.value.personalNumber,
    "firstname": master.value.firstname,
    "lastname": master.value.lastname,
    "nationalNumber": master.value.nationalNumber,
    "courses": master.value.courses,
    "faculty": master.value.faculty
  })
    .then((response) => console.log(response.status, response.data))
    .catch((error) => console.log(error))
  clearMaster()
}
const update = async () => {
  await axios.patch('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/masters', {
    "personalNumber": master.value.personalNumber,
    "firstname": master.value.firstname,
    "lastname": master.value.lastname,
    "nationalNumber": master.value.nationalNumber,
    "courses": master.value.courses,
    "faculty": master.value.faculty
  })
    .then((response) => console.log(response.data, response.status))
  updateDialog.value = false
}
const deleteItem = async () => {
  await axios.delete('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/masters')
    .then((response) => console.log(response.data, response.status))
  deleteDialog.value = false
}
onMounted(() => {
  getFaculties()
  getCourses()
  getMasters()
  console.log("masters")
})
</script>


<style scoped lang="scss">

</style>
