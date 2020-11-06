<script src="./-.ts" lang="ts"></script>
<style src="./-.scss" lang="scss"></style>
<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated bordered style="margin-left: -1px" class="header-conserto">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu"/>
          CaMiPa
          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" class="float-right"/>
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-sm q-gutter-sm text-black" style="margin: 0;">
        <q-breadcrumbs active-color="white">
          <q-breadcrumbs-el :key="i" v-for="(x, i) in breadCrumbs()" :label="x.text" :icon="x.icon"
                            :to="x.to"/>
        </q-breadcrumbs>
      </div>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      bordered
    >
      <!-- Profile info -->
      <div class="absolute-top bg-accent user-card">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="~assets/me.jpg">
        </q-avatar>
        <div class="text-weight-bold text-capitalize">{{ fullName() }}</div>
        <div>{{ user.email }}</div>
      </div>

      <!-- SideMenu -->
      <q-scroll-area style="height: calc(100% - 192px); margin-top: 150px;">
        <q-list>
          <q-item clickable v-ripple :to="listItem.to" v-for="(listItem, i) of menuItems" :key="i"
                  :class="listItem.color ? `bg-${listItem.color}`: ''">
            <q-item-section avatar>
              <q-icon :name="listItem.icon"/>
            </q-item-section>
            <q-item-section>
              {{ listItem.text }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- Logout button -->
      <q-btn class="logout-button" round color="primary" icon="power_settings_new"
             style="bottom: 20px;transform: translate(-50%, -50%);" @click="logout"/>

    </q-drawer>
    <q-drawer show-if-above v-model="drawerRight" side="right" bordered>
      Right Drawer
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
