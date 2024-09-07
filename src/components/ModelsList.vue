<template>
  <v-layout class="d-flex flex-column fill-height">
    <div class="text-h3 font-weight-bold">
      <slot name="models-name"></slot>
    </div>
    <v-main class=" ">
      <v-divider></v-divider>
      <v-card class="mt-10 bg-green-lighten-5 fill-height" max-width="100%">
        <v-card-text>
          <v-row class="align-center justify-lg-space-between">
            <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
              <v-text-field bg-color="white"
                            label="Search"
                            :placeholder="searchPlaceholder"
                            append-inner-icon="mdi-magnify"
                            hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="2" class="d-flex justify-end">
              <v-btn @click="emitCreate" class="bg-green ">Add
                <slot name="model-name"></slot>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider>
        </v-divider>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1 bg-white"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td v-for="header in headers" :key="header.value">
                  <span v-if="header.value === 'actions'">
            <v-btn icon variant="plain" @click="emitUpdate(item)">
              <v-icon color="green">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon variant="plain" @click="emitDelete(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </span>
                  <span v-else>
            {{ item[header.value] }}
          </span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-main>
  </v-layout>


</template>
<script setup>


defineProps({
  searchPlaceholder: {
    type: String,
    required: false,
    default: 'Search...'
  },
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update-item', 'delete-item' , 'create-item']);

// Emit custom events for update and delete
const emitUpdate = (item) => {
  emit('update-item', item);
};

const emitDelete = (item) => {
  emit('delete-item', item);
};
const emitCreate = () => {
  emit('create-item' )
}

</script>


<style scoped lang="scss">

</style>
