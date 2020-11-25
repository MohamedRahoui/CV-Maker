<script src="./-.ts" lang="ts"></script>
<style lang="scss" src="./-.scss"></style>

<template>
  <div>
    <q-card v-if="educations">
      <q-inner-loading :showing="!fetchedEducation && !educations.length" class="bg-primary">
        <q-spinner-gears size="50px" color="white"/>
      </q-inner-loading>
      <q-card-section>
        <q-btn round flat color="primary" icon="add" class="add-education" @click="createEducation()"/>
        <div class="text-subtitle1 title text-uppercase">
          Formations
        </div>
        <div class="text-weight-light text-h6 text-center" v-if="!educations.length">Ajoutez vos formations
          ici
        </div>
        <q-list bordered v-else>
          <div :key="i" v-for="(education, i) in educations">
            <q-item>
              <q-item-section><span><b>{{ education.year }} : </b> {{ education.title }}</span></q-item-section>
              <q-item-section avatar>
                <div class="q-gutter-xs">
                  <q-btn round flat color="primary" class="gt-xs" size="12px" icon="edit"
                         @click="editEducation(education)"/>
                  <q-btn round flat color="primary" class="gt-xs" size="12px" icon="delete"
                         @click="removeEducation(education.id)"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator/>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
    <br>
    <q-card>
      <q-card-section>
        <q-btn round flat color="primary" icon="add" class="add-education"
               @click="addItem('Compétence fonctionnelle', 'functional_skill')"/>
        <div class="text-subtitle1 title text-uppercase">
          COMPÉTENCES FONCTIONNELLES
        </div>
        <div class="text-weight-light text-h6 text-center"
             v-if="!$tools.getJsonField(user.functional_skills, 'skills', []).length">Ajoutez vos compétences
          fonctionnelles
          ici
        </div>
        <q-list bordered v-if="$tools.getJsonField(user.functional_skills, 'skills', []).length">
          <div :key="i" v-for="(skill, i) in $tools.getJsonField(user.functional_skills, 'skills', [])">
            <q-item>
              <q-item-section><span>{{ skill }}</span></q-item-section>
              <q-item-section avatar>
                <div class="q-gutter-xs">
                  <q-btn round flat color="primary" class="gt-xs" size="12px" icon="delete"
                         @click="removeItem(skill, 'functional_skills', 'skills',
                         'La compétence fonctionnelle')"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator/>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
    <br>
    <q-card>
      <q-card-section>
        <q-btn round flat color="primary" icon="add" class="add-education"
               @click="addItem('Compétence technique', 'technical_skill', 'Titre')"/>
        <div class="text-subtitle1 title text-uppercase">
          COMPÉTENCES TECHNIQUES
        </div>
        <div class="text-weight-light text-h6 text-center"
             v-if="!$tools.getJsonField(user.technical_skills, 'skills', []).length">
          Ajoutez vos compétences techniques ici
        </div>
        <q-list bordered v-if="$tools.getJsonField(user.technical_skills, 'skills', []).length">
          <div :key="i" v-for="(skill, i) in $tools.getJsonField(user.technical_skills, 'skills', [])">
            <q-item>
              <q-item-section><b>{{ skill.title }}</b></q-item-section>
              <q-item-section>{{ skill.value }}</q-item-section>
              <q-item-section avatar>
                <div class="q-gutter-xs">
                  <q-btn round flat color="primary" class="gt-xs" size="12px" icon="delete"
                         @click="removeItem(skill.value, 'technical_skills', 'skills',
                         'La compétence technique', true)"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator/>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
    <br>
    <q-card>
      <q-card-section>
        <q-btn round flat color="primary" icon="add" class="add-education"
               @click="addItem('Domaine d\'intervention', 'focus_area')"/>
        <div class="text-subtitle1 title text-uppercase">
          DOMAINES D’INTERVENTIONS
        </div>
        <div class="text-weight-light text-h6 text-center"
             v-if="!$tools.getJsonField(user.focus_areas, 'areas', []).length">
          Ajoutez vos domaines d'intervention ici
        </div>
        <q-list bordered v-if="$tools.getJsonField(user.focus_areas, 'areas', []).length">
          <div :key="i" v-for="(area, i) in $tools.getJsonField(user.focus_areas, 'areas', [])">
            <q-item>
              <q-item-section><span>{{ area }}</span></q-item-section>
              <q-item-section avatar>
                <div class="q-gutter-xs">
                  <q-btn round flat color="primary" class="gt-xs" size="12px" icon="delete"
                         @click="removeItem(area, 'focus_areas', 'areas',
                         'Le domaine d\'intervention')"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator/>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
    <q-dialog v-model="isEditingEducation">
      <q-card style="width: 700px; max-width: 80vw;" v-if="educEdition">
        <q-card-section class="edit-form">
          <q-input filled v-model="educEdition.year" label="Année de la formation"/>
          <q-input filled v-model="educEdition.title" label="Titre de la formation"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup/>
          <q-btn :label="mode === 'edit' ? 'Modifier' : 'Ajouter'" color="primary"
                 @click="mode === 'edit' ? updateEducation() : addEducation()"
                 :loading="editionLoading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isAddingItem">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="edit-form">
          <q-input filled v-model="itemTitle" :label="itemTitleLabel" v-if="itemTitleLabel"/>
          <q-input filled v-model="item" :label="itemLabel"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup/>
          <q-btn label="Ajouter" color="primary"
                 @click="runAddItem(...addItemParams())"
                 :loading="addingItemLoading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
