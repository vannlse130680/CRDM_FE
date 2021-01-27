<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-row>
      <v-col>
        <v-btn
          absolute
          right
          tile
          color="success"
          to="/project/create-project"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          Create New Project
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Project Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template>
      <base-material-card
        id="btn-create"
        color="success"
        icon="mdi-clipboard-plus"
        title="List project"
        class="px-5 py-3"
      >
        <v-card-title>
          Project
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="projects"
          :items-per-page="5"
          :search="search"
          @click:row="dialog = true"
        />
      </base-material-card>
    </template>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'No',
            align: 'start',
            sortable: false,
            value: 'no',
          },
          { text: 'Code', value: 'code' },
          { text: 'Product', value: 'product' },
          { text: 'Customer', value: 'customerName' },
          { text: 'createDate', value: 'createDate', sortable: false },
          { text: 'Iron (%)', value: 'iron' },
        ],
        dialog: false,
        projects: [],
      }
    },
    mounted () {
      for (let i = 1; i < 10; i++) {
        this.projects.push({
          no: i,
          code: 'PR00' + i,
          product: 'Body Wash 2in1',
          customerName: 24,
          createDate: '2021/01/01',
          iron: '1%',
        })
      }
    },
    methods: {
      rowClick (item) {
        this.dialog = true
      },
      createProject () {
        this.$router.push({ name: 'Create Project' })
      },
    },
  }
</script>
<style>
#btn-create {
  margin-top: 50px;
}
</style>
