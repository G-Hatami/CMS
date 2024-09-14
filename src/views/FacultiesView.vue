<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in faculties"
               @create-item="addDialog = true" @update-item="updateDialog = true" @delete-item="deleteDialog = true">
    <template #models-name>Faculties</template>
    <template #model-name>Faculty</template>
  </models-list>
</template>
<script setup>
import {onMounted, ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";
import axios from "axios";

const addDialog = ref(false)
const updateDialog = ref(false)
const deleteDialog = ref(false)

const headers = ref([
  {title: 'Faculty Name', value: 'name', key: 'name'},
  {title: 'Head Of Department', value: 'manager', key: 'manager'},
  {title: 'Actions', value: 'actions'}
])
const items = ref()
const getFaculties = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
  }
};
onMounted(() => {
  getFaculties();
  console.log("getting faculties!")
});


</script>


<style scoped lang="scss">

</style>
