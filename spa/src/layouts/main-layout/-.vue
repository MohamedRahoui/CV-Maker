<script src="./-.js"></script>
<style src="./-.scss" lang="scss"></style>
<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated bordered style="margin-left: -1px">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
          CaMiPa
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-sm q-gutter-sm text-black" style="margin: 0;">
        <q-breadcrumbs>
          <q-breadcrumbs-el :key="i" v-for="(x, i) in breadCrumbs" :label="x.text" :icon="x.icon"
                            :to="x.to"/>
        </q-breadcrumbs>
      </div>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
    >
      <!-- Profile info -->
      <div class="absolute-top bg-accent" style="height: 150px; padding: 20px 0 0 20px">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="~assets/me.jpg">
        </q-avatar>
        <div class="text-weight-bold text-capitalize">{{user.username}}</div>
        <div>{{user.email}}</div>
      </div>

      <!-- SideMenu -->
      <q-scroll-area style="height: calc(100% - 192px); margin-top: 150px;">
        <q-list>
          <q-item clickable v-ripple :to="listItem.url" v-for="(listItem, i) of menuItems" :key="i"
                  :class="listItem.color ? `bg-${listItem.color}`: ''">
            <q-item-section avatar>
              <q-icon :name="listItem.icon"/>
            </q-item-section>
            <q-item-section>
              {{listItem.text}}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- Logout button -->
      <q-btn class="logout-button" round color="primary" icon="power_settings_new"
             style="bottom: 20px;transform: translate(-50%, -50%);" @click="logout"/>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

