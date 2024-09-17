<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in courses"
               @delete-item="deleteDialog = true" @update-item="handleUpdate" @create-item="addDialog = true">
    <template #models-name>Courses</template>
    <template #model-name>Course</template>
  </models-list>
  <v-dialog v-model="addDialog" transition="dialog-bottom-transition" max-width="50%">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-book-open-variant" title="Add New Course">
      <v-card-text>
        <v-row>
          <v-col md="4" sm="6" cols="12">
            <v-text-field v-model="course.name" label="Name*"
                          :rules="[v => !!v || 'Required' ,  v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed' , v=> v.length <= 64 || 'at most 64 characters']"
                          clearable counter="64">

            </v-text-field>
          </v-col>
          <v-col md="4" sm="6" cols="12">
            <v-text-field v-model="course.courseCredit" label="Credit*"
                          :rules="[v => !!v || 'Required' , v => /^\d+$/.test(v) || 'Only numeric characters (0-9) are allowed']"
                          clearable
            >

            </v-text-field>
          </v-col>
          <v-col md="4" sm="6" cols="12">
            <v-select
              v-model="course.faculty"
              :items="faculties"
              item-value="name"
              item-title="name"
              label="Faculty"
              required
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="add">ADD</v-btn>
        <v-btn @click="clearCourse">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateDialog" transition="dialog-bottom-transition" max-width="50%">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-book-open-variant" title="Update Course">
      <v-card-text>
        <v-row>
          <v-col md="4" sm="6" cols="12">
            <v-text-field v-model="selectedCourse.name" label="Name*"
                          :rules="[v => !!v || 'Required' ,  v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters are allowed' , v=> v.length <= 64 || 'at most 64 characters']"
                          clearable counter="64">

            </v-text-field>
          </v-col>
          <v-col md="4" sm="6" cols="12">
            <v-text-field v-model="selectedCourse.courseCredit" label="Credit*"
                          :rules="[v => !!v || 'Required' , v => /^\d+$/.test(v) || 'Only numeric characters (0-9) are allowed']"
                          clearable

            >
            </v-text-field>
          </v-col>
          <v-col md="4" sm="6" cols="12">
            <v-select
              v-model="selectedCourse.faculty"
              :items="faculties"
              item-value="name"
              item-title="name"
              label="Faculty"
              required
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="update">UPDAET</v-btn>
        <v-btn @click="updateDialog = false">CANCEL</v-btn>
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


const addDialog = ref(false)
const deleteDialog = ref(false)
const updateDialog = ref(false)
const selectedCourse = ref(null)
const handleUpdate = () => {
  updateDialog.value = true
  selectedCourse.value = {...course}
}
const course = ref({
  name: null,
  courseCredit: null,
  faculty: null
})
const headers = ref([
  {title: 'Course name', value: 'course-name', key: 'course-name'},
  {title: 'Course credit', value: 'course-credit', key: 'course-credit'},
  {title: 'Faculty', value: 'faculty', key: 'faculty'},
  {title: 'Actions', value: 'actions'}
])
const clearCourse = () => {
  course.value.name = null
  course.value.faculty = null
  course.value.courseCredit = null
  addDialog.value = false
}

const items = ref()
const getCourses = async () => {
  try {
    items.value = (await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/courses')).data
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}
const faculties = ref()
const getFaculties = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties');
    faculties.value = response.data;
    console.log("gettt", faculties.value)
  } catch (error) {
    console.error('Error fetching faculties:', error);
  }
};
const add = async () => {
  const response = await axios.post('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/courses',
    {
      name: course.value.name,
      courseCredit: course.value.courseCredit,
      faculty: course.value.faculty
    })
  console.log("response of posting course:", response.status)
  addDialog.value = false
}
const update = async () => {
  try {
    const response = await axios.patch('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/courses')
    console.log(response.data, response.status)
    updateDialog.value = false
  } catch (error) {
    console.log(error)
  }
}
const deleteItem = async () => {
  try {
    const response = await axios.delete('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/courses')
    console.log(response.data, response.status)
    deleteDialog.value = false
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getCourses()
  getFaculties()
})
</script>


<style scoped lang="scss">

</style>
