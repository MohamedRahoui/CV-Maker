<script src="./-.ts" lang="ts"></script>
<style lang="scss" src="./-.scss"></style>

<template>
  <div>
    <q-card v-if="experiences">
      <q-inner-loading :showing="!fetchedExperiences && !experiences.length" class="bg-primary">
        <q-spinner-gears size="50px" color="white"/>
      </q-inner-loading>
      <q-card-section>
        <div class="text-subtitle1 title text-uppercase">Expérience</div>
        <q-list bordered padding>
          <div v-for="(experience, i) in experiences" :key="i">
            <q-item>
              <q-item-section>
                <q-item-label class="text-primary text-weight-bold text-h6">{{ experience.title }} -
                  {{ experience.company }}
                </q-item-label>
                <q-item-label caption class="text-bold">
                  {{ $tools.getMonth(experience.start_month) }}
                  {{ experience.start_year }}
                  -
                  <span v-if="experience.end_month">
                    {{ $tools.getMonth(experience.end_month) }}
                    {{ experience.end_year }}
                  </span>
                  <span v-else>aujourd'hui</span>
                </q-item-label>
                <br>
                <q-item-label class="text-primary text-weight-bold text-subtitle2">
                  PROJET ET MISSIONS
                </q-item-label>
                <br>
                <span> {{ experience.description }} </span>
                <br>
                <b> {{ experience.job_title }} </b>
                <br>
                <div v-if="$tools.getJsonField(experience.tasks, 'tasks', []).length">
                  <q-item-label class="text-uppercase text-primary text-weight-bold text-subtitle2">
                    Tâches du poste
                  </q-item-label>
                  <br>
                  <q-list bordered>
                    <div :key="i" v-for="(x, i) of $tools.getJsonField(experience.tasks, 'tasks', [])">
                      <q-item>
                        <q-item-section>{{ x }}</q-item-section>
                      </q-item>
                      <q-separator/>
                    </div>
                  </q-list>
                </div>
                <br>
                <div v-if="getEnvList(experience).length">
                  <q-item-label class="text-primary text-weight-bold text-subtitle2">
                    ENVIRONNEMENT TECHNIQUE & FONCTIONNEL
                  </q-item-label>
                  <br>
                  <q-list bordered>
                    <div :key="i" v-for="(x, i) of getEnvList(experience)">
                      <q-item>
                        <q-item-section>{{ x }}</q-item-section>
                      </q-item>
                      <q-separator/>
                    </div>
                  </q-list>
                </div>
              </q-item-section>
              <q-item-section side top>
                <q-btn round flat color="primary" icon="edit" size="12px" class="edit-icon gt-xs"
                       @click="editExperience(experience)"/>
              </q-item-section>
            </q-item>
            <q-separator spaced v-if="i+1 < experiences.length"/>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
    <q-dialog v-model="isEditingExperience">
      <q-card style="width: 700px; max-width: 80vw;" v-if="expEdition">
        <q-card-section class="edit-form">
          <q-input filled v-model="expEdition.title" label="Nom du projet"/>
          <q-input filled v-model="expEdition.company" label="Entreprise"/>
          <div class="q-gutter-md row">
            <q-select filled v-model="expEdition.start_month"
                      map-options
                      :emit-value="false"
                      :options="$tools.getMonthsOptions()">
              <template v-slot:before>
              <span class="text-subtitle2 text-select-margin-align">
                Date de début
              </span>
              </template>
            </q-select>
            <q-input filled v-model="expEdition.start_year"
                     placeholder="2004" class="text-select-margin-align"/>
          </div>
          <div class="q-gutter-md row">
            <q-select filled v-model="expEdition.end_month"
                      map-options
                      :emit-value="false"
                      :options="$tools.getMonthsOptions()">
              <template v-slot:before>
                <span class="text-subtitle2 text-select-margin-align">
                  Date de fin
                </span>
              </template>
            </q-select>
            <q-input filled v-model="expEdition.end_year"
                     placeholder="2004" class="text-select-margin-align"/>
          </div>
          <q-input filled v-model="expEdition.description" label="Description du projet"/>
          <q-input filled v-model="expEdition.job_title" label="Titre du poste"/>
          <br>
          <q-item-label class="text-primary text-weight-bold text-subtitle2 text-uppercase">
            Tâches du poste
          </q-item-label>
          <br>
          <q-input filled v-model="currentTask" label="Tâche">
            <template v-slot:append>
              <q-btn round dense flat icon="add" @click="addTaskItem()"/>
            </template>
          </q-input>
          <q-list bordered v-if="$tools.getJsonField(expEdition.tasks, 'tasks', []).length">
            <div :key="i" v-for="(x, i) of $tools.getJsonField(expEdition.tasks, 'tasks', [])">
              <q-item>
                <q-item-section>{{ x }}</q-item-section>
                <q-item-section avatar>
                  <div class="q-gutter-xs">
                    <q-btn round flat color="primary" class="gt-xs" size="12px" icon="delete"
                           @click="removeTaskItem(x)"/>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator/>
            </div>
          </q-list>
          <br>
          <q-item-label class="text-primary text-weight-bold text-subtitle2">
            ENVIRONNEMENT TECHNIQUE & FONCTIONNEL
          </q-item-label>
          <br>
          <q-input filled v-model="envCurrent" label="Compétence">
            <template v-slot:append>
              <q-btn round dense flat icon="add" @click="addEnvItem()"/>
            </template>
          </q-input>
          <q-list bordered v-if="getEnvList(expEdition).length">
            <div :key="i" v-for="(x, i) of getEnvList(expEdition)">
              <q-item>
                <q-item-section>{{ x }}</q-item-section>
                <q-item-section avatar>
                  <div class="q-gutter-xs">
                    <q-btn round flat color="primary" class="gt-xs" size="12px" icon="delete"
                           @click="removeEnvItem(x)"/>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator/>
            </div>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup/>
          <q-btn label="Modifier" color="primary" @click="updateExperience()"
                 :loading="editionLoading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
