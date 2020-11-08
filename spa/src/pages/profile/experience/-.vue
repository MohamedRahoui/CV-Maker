<script src="./-.ts" lang="ts"></script>
<style lang="scss" src="./-.scss"></style>

<template>
  <q-card v-if="experiences">
    <q-card-section>
      <div class="text-subtitle1 title">Expérience</div>
      <q-list bordered padding>
        <div v-for="(experience, i) in experiences" :key="i">
          <q-item>
            <q-item-section>
              <q-item-label overline>{{ experience.title }}</q-item-label>
              <q-item-label>{{ experience.company }}</q-item-label>
              <q-item-label caption>
                {{ $tools.getMonth(experience.start_month) }}
                {{ experience.start_year }}
                -
                {{ $tools.getMonth(experience.end_month) }}
                {{ experience.end_year }}
              </q-item-label>
              <span v-html="experience.description"></span>
            </q-item-section>
            <q-item-section side top>
              <q-btn round flat color="primary" icon="edit" class="edit-icon"/>
            </q-item-section>
          </q-item>
          <q-separator spaced v-if="i+1 < experiences.length"/>
        </div>
      </q-list>
    </q-card-section>
  </q-card>
</template>
