<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in courses">
    <template #models-name>Courses</template>
    <template #model-name>Course</template>
  </models-list>
</template>
<script setup>
import {onMounted, ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";
import axios from "axios";


const headers = ref([
  {title: 'Course name', value: 'course-name', key: 'course-name'},
  {title: 'Course credit', value: 'course-credit', key: 'course-credit'},
  {title: 'Faculty', value: 'faculty', key: 'faculty'},
  {title: 'Actions', value: 'actions'}
])
const items = ref()

const getCourses = async () => {
  try {
    items.value = (await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/courses')).data
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}
onMounted(() => {
  getCourses()
})
</script>


<style scoped lang="scss">

</style>
