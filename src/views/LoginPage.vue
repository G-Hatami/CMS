<template>
  <v-container fluid class="fill-height " max-width="95%">
    <v-row no-gutters class="d-flex ">
      <v-col cols="4" lg="4" md="4" class="rounded-s-xl background">
        <v-img src="@/assets/management.jpg" alt="Management" class="rounded-s-xl w-100 h-100"
               style="object-fit: cover;">
        </v-img>
      </v-col>
      <v-col cols="8" lg="8" md="8" class="d-flex background rounded-e-xl">

        <v-sheet class="d-flex flex-column  justify-center align-center bg-white fill-height rounded-xl"
                 width="inherit">
          <div style="text-align: center" class="text-h1 font-weight-bold text-green-darken-4 pa-5 mt-9 mb-5">Login
          </div>
          <div style="width: 50%" class="my-text-field mb-8">
            <v-text-field clearable label="Username" variant="outlined" :prepend-icon="icon"
                          @click:prepend="changeIcon" v-model="username"
                          :rules="[rules.required, rules.max]" hint="at most 5 characters"></v-text-field>
            <br>
            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                          @click:append-inner="visible = !visible"
                          :type="visible ? 'text' : 'password'"
                          clearable label="Password" variant="outlined" prepend-icon="mdi-lock"
                          aria-required="true"
                          v-model="password"
                          :rules="[rules.required, rules.max]" hint="at most 5 characters"

            ></v-text-field>
            <v-checkbox
              v-model="isRemembered"
              color="green"
              label="Remember me"
            ></v-checkbox>
            <div class="d-flex justify-center mb-5">
              <v-btn @submit.prevent type="submit" color="green" size="large" variant="tonal" class="px-15"
                     @click="login">
                Log In
              </v-btn>
            </div>
          </div>
        </v-sheet>

      </v-col>
    </v-row>

  </v-container>

</template>


<script setup>
import {computed, ref} from "vue";
import router from "@/router";

const iconIndex = ref(0)
const icons = ref([
  'mdi-emoticon',
  'mdi-emoticon-cool',
  'mdi-emoticon-dead',
  'mdi-emoticon-excited',
  'mdi-emoticon-happy',
  'mdi-emoticon-neutral',
  'mdi-emoticon-sad',
  'mdi-emoticon-tongue',

])
const icon = computed(() => {
  return icons.value[iconIndex.value]
})
const changeIcon = () => {
  iconIndex.value === icons.value.length - 1
    ? (iconIndex.value = 0)
    : iconIndex.value++
}
const visible = ref(false)
const isRemembered = ref(false)
const username = ref('')
const password = ref('')
const rules = ref({
  required: value => !!value || 'Required.',
  max: v => v.length <= 5 || 'max 5 characters'
})

const login = () => {
  if (username.value === "admin" && password.value === "admin") {
    if (isRemembered.value) {
      console.log("true")
      sessionStorage.setItem("authenticated", "true");
      router.push({name: "dashboard"})
    }
  } else {
    alert("Invalid credentials");
  }
}

</script>


<style lang="scss" scoped>

.background {
  background-color: #8DBB94;
}

.my-text-field {
  color: #154617;
  display: flex;
  flex-direction: column;

}


//.my-custom-button {
//  @include custom-button(#007bff, #ffffff);
//}
</style>
