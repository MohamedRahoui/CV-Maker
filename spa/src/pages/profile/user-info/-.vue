<script src="./-.ts" lang="ts"></script>
<style lang="scss" src="./-.scss"></style>

<template>
  <div>
    <q-card>
      <div class="conserto-cover">
        <q-img class="ball1" src="~assets/balls/blue.png" width="80px"/>
        <q-img class="ball2" src="~assets/balls/pink-blur.png" width="80px"/>
      </div>
      <q-card-section class="user-info-section">
        <q-btn round flat color="primary" icon="edit" class="edit-icon" @click="editInfo()"/>
        <div class="user-picture">
          <q-img class="picture" src="~assets/me.jpg"/>
        </div>
        <div class="user-info">
          <div class="full-name text-uppercase">{{ fullName() }}</div>
          <div class="experience-duration">
            {{ user.title }} <br>
            <span v-if="user.experience_duration">{{ user.experience_duration }} ans d’expérience</span>
          </div>
          <q-btn class="download-cv" color="primary" label="Génerer mon CV Conserto" @click="downloadCv()"/>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="isEditingInfo">
      <q-card style="width: 700px; max-width: 80vw;" v-if="userForm">
        <q-card-section class="edit-form">
          <q-input filled v-model="userForm.title" label="Titre du profil"/>
          <q-input filled v-model="userForm.experience_duration" label="Années d'expérience"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup/>
          <q-btn label="Modifier" color="primary" @click="updateInfo()"
                 :loading="editionLoading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
