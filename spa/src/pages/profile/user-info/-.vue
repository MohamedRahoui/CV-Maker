<script src="./-.ts" lang="ts"></script>
<style lang="scss" src="./-.scss"></style>

<template>
  <q-card>
    <div class="conserto-cover">
      <q-img class="ball1" src="~assets/balls/blue.png" width="80px"/>
      <q-img class="ball2" src="~assets/balls/pink-blur.png" width="80px"/>
    </div>
    <q-card-section>
      <div class="user-picture">
        <q-img class="picture" src="~assets/me.jpg"/>
      </div>
      <div class="user-info">
        <div class="full-name text-uppercase">{{ fullName() }}</div>
        <div class="experience-duration">
          Développeur Full Stack Confirmé <br>
          4 ans d’expérience
        </div>
        <q-btn class="download-cv" color="primary" label="Génerer mon CV Conserto"/>
      </div>
    </q-card-section>
  </q-card>
</template>
