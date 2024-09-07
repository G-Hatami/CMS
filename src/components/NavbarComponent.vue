<template>
  <nav>
    <v-app-bar flat app class="bg-green-lighten-3 text-white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">
        ᴄᴏᴜʀꜱᴇ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ ꜱʏꜱᴛᴇᴍ
      </v-toolbar-title>
      <div class="mr-10 ">
        <v-btn href="https://github.com/G-Hatami/G-Hatami" target="_blank">
          <span class="mdi mdi-github text-h5 text-white "></span>
        </v-btn>
        <v-btn class="mr-5">
          <span>About CMS</span>
        </v-btn>
        <v-btn class="mr-5">
          HELp & SUPPORT
        </v-btn>
        <v-menu>
          <template v-slot:activator="{props}">
            <v-btn v-bind="props"><span class="mdi mdi-account text-h4 text-white"></span></v-btn>
          </template>
          <v-list class="bg-white">
            <v-list-item @click="console.log('dsscfdvfvf')">
              <v-list-item-title>
                <span class="mdi mdi-account-circle text-h5 mr-2 text-green-lighten-2 "></span>
                <span>Profile</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <span class="mdi mdi-cog text-green-lighten-2 text-h5 mr-2"></span>
                <span>Settings</span>
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-title>
                <span class="mdi mdi-help-circle text-green-lighten-2 text-h5 mr-2 "></span>
                <span>Help & Support</span>

              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <span class="mdi mdi-frequently-asked-questions text-green-lighten-2 text-h5 mr-2"></span>
                <span>FAQ</span>

              </v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" width="auto">
                  <template v-slot:activator="{props}">
                    <span v-bind="props" class="cursor-pointer">
                      <span class="mdi mdi-logout text-green-lighten-2 text-h5 mr-2"></span>
                      <span>Log out</span>
                    </span>
                  </template>
                  <v-card>
                    <v-toolbar class="bg-white" title="Really?">
                      <template v-slot:append>
                        <v-btn @click="isDialogOpen=false" icon="$close" variant="text"></v-btn>
                      </template>
                    </v-toolbar>
                    <v-card-text class="pa-12 bg-white">Are you sure you wanna log out?</v-card-text>
                    <v-card-actions class="bg-white d-flex justify-center align-center ">
                      <div class=" mb-2 d-flex ga-4">
                        <v-btn class="bg-green-lighten-5" @click="isDialogOpen = false">Not at all.</v-btn>
                        <v-btn class="bg-green-lighten-5" @click="logout">Yes sorry!</v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer permanent app v-model="drawer">
      <v-layout class="flex-column justify-center align-center mt-4">
        <v-avatar size="100">
          <v-img src="../assets/img1.png" alt="#" cover height="100%" width="100%"></v-img>
        </v-avatar>
        <p class="ma-3 text-white text-uppercase">admin</p>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="model in models"
          :key="model.text"
          :to="model.route"
          active-class="bye"
          active-color="white"
          class="d-flex align-center"
        >
          <v-container class="d-inline-flex">
            <v-list-item-action>
              <v-icon class="mr-2">{{ model.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ model.text }}
            </v-list-item-title>
          </v-container>

        </v-list-item>
      </v-list>

    </v-navigation-drawer>

  </nav>
</template>
<script setup>
import router from "@/router";
import {ref} from "vue";

const drawer = ref(true)
const isDialogOpen = ref(false)
const logout = () => {
  sessionStorage.removeItem("authenticated")
  isDialogOpen.value = false
  router.push({name: "login"})
}
const models = ref([{icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard'},
  {icon: 'mdi-town-hall', text: 'Faculties', route: '/faculties'},
  {icon: 'mdi-human-male-board', text: 'Teachers', route: '/teachers'},
  {icon: 'mdi-account-school', text: 'Students', route: '/students'},
  {icon: 'mdi-book-open-variant', text: 'Courses', route: '/courses'},
])
</script>


<style scoped lang="scss">

.bye {
  border-left: 5px solid white;
}


</style>
