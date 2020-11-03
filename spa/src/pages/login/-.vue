<script src="./-.js"></script>
<style scoped src="./-.scss" lang="scss"></style>
<template>
  <div class="flex flex-center true-full-height bg-primary">
    <q-card class="login-card bg-white text-white">
      <div class="text-h3 text-bold text-white text-center q-pa-xs">
        <q-img src="~assets/conserto.png" width="80%" class="logo-login"/>
        <div class="text-primary">CaMiPa</div>
      </div>
      <q-card-section>
        <q-input filled v-model="username" label="Username"/>
        <br>
        <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn :loading="loading" @click="login" color="primary" :disable="!username || !password">Se connecter
        </q-btn>
      </q-card-actions>
    </q-card>
    <div class="absolute-bottom-right">version 0.0.1</div>
  </div>
</template>



