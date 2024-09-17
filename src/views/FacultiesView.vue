<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in faculties"
               @create-item="addDialog = true" @update-item="handleUpdate" @delete-item="deleteDialog = true">
    <template #models-name>Faculties</template>
    <template #model-name>Faculty</template>
  </models-list>


  <v-dialog v-model="addDialog" max-width="50%" transition="dialog-bottom-transition">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-town-hall" title="Add New Faculty">
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="faculty.name"
                label="Name*"
                :rules="[v => !!v || 'Required', v => (v &&  v.length <= 48 && v.length >= 5 ) || 'At most 48 char', v => /^[a-zA-Z\s]+$/.test(v) || 'Only alphabetic characters and numeric are allowed']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
                <v-select
                  v-model="faculty.manager"
                  :items="masters"
                  item-value="firstname"
                  item-title="lastname"
                  label="Head of Department*"
                  :rules="[v => !!v || 'Required']"
                >
                </v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" type="submit" @click="add"></v-btn>
        <v-btn text="Cancel" @click="clearFaculty"></v-btn>
      </template>
    </v-card>
  </v-dialog>


  <v-dialog v-model="updateDialog" max-width="50%">
    <v-card class="bg-white text-green-darken-4" prepend-icon="mdi-town-hall" title="Update Faculty">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col md="6" sm="6">
              <v-text-field v-model="selectedFaculty.name" label="StudentId"/>
            </v-col>
            <v-col md="6" sm="6">
              <v-select
                v-model="faculty.manager"
                :items="masters"
                item-title="lastname"
                item-value="firstname"
                label="Head of department"
                required
              ></v-select>
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

const addDialog = ref(false)
const updateDialog = ref(false)
const deleteDialog = ref(false)
const selectedFaculty = ref(null)

const handleUpdate = (faculty) => {
  updateDialog.value = true
  selectedFaculty.value = {...faculty}
  console.log("selected", selectedFaculty.value)
}
const headers = ref([
  {title: 'Faculty Name', value: 'name', key: 'name'},
  {title: 'Head Of Department', value: 'manager', key: 'manager'},
  {title: 'Actions', value: 'actions'}
])
const faculty = ref({
  name: '',
  manager: ''
})
const masters = ref()
const getMasters = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/masters');
    masters.value = response.data;
    console.log("masters",masters.value)
  } catch (error) {
    console.log('Error fetching masters:',error)
  }
}

const items = ref()
const getFaculties = async () => {
  try {
    const response = await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
  }
};
const add = async () => {
  await axios.post('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties',
    {
      "name": faculty.value.name,
      "manager": faculty.value.manager
    }
  )
    .then((response) => console.log(response.data, response.status))
    .catch((error) => console.log(error))
  clearFaculty()
}
const update = async () => {
  await axios.patch('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties')
    .then((response) => console.log(response.status))
  updateDialog.value = false
}

const deleteItem = async () => {
  await axios.delete('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/faculties')
    .then((response) => console.log(response.status))
  deleteDialog.value = false
}
const clearFaculty = () => {
  addDialog.value = false
  faculty.value.name = null
  faculty.value.manager = null
}

onMounted(() => {
  getFaculties();
  getMasters()
  console.log("getting faculties!")
});


</script>


<style scoped lang="scss">

</style>
