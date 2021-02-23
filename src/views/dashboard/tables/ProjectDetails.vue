<template>
  <v-container
    id="data-tables"
    tag="section"
    fluid
  >
    <v-card
      class="overflow-hidden"
      color=""
      width="1600"
    >
      <v-toolbar
        flat
        color="primary"
      >
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title
          class="font-weight-light"
          color="primary"
        >
          Project Information
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          color="primary darken-3"
          fab
          small
          @click="isEditing = !isEditing"
        >
          <v-icon v-if="isEditing">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="2"
            md="1"
          >
            <v-text-field
              v-model="selectedProject.id"
              readonly

              label="Project Code"
            />
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3"
          >
            <v-text-field
              v-model="selectedProject.product"
              :readonly="!isEditing"

              label="Product"
              width="100"
            />
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="3"
          >
            <v-select
              v-model="selectedProject.clientId"
              :readonly="!isEditing"
              :rules="[v => !!v || 'Item is required']"
              :items="clients"
              item-text="name"
              item-value="id"
              label="Client"
            />
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="2"
          >
            <v-text-field
              v-model="selectedProject.createdDate"
              :readonly="!isEditing"
              prepend-icon="mdi-calendar"
              label="Created Day"
              width="100"
            />
          </v-col>
          <v-col
            cols="12"
            sm="3"
            md="2"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="selectedProject.deadline"

                  label="Deadline"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="!!isEditing ? on : ''"
                />
              </template>
              <v-date-picker
                v-model="selectedProject.deadline"
                color="primary"
                @input="menu2 = false"
              />
            </v-menu>
          </v-col>
          <v-col>
            <v-select

              v-model="selectedProject.status"
              :readonly="!isEditing"
              :items="statuses"
              item-value="id"
              item-text="name"
              label="Status"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="selectedProject.requirement"
              :readonly="!isEditing"
              label="Requirement"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="chips"
              :readonly="!isEditing"
              :items="users"
              item-text="name"
              item-value="name"
              chips
              clearable
              label="Assign user"
              multiple
              prepend-icon="mdi-filter-variant"
              solo
              return-object
            >
              <template v-slot:selection=" data ">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <strong>{{ data.item.name }}</strong>&nbsp;
                </v-chip>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="isEditing"
          :disabled="!isEditing"
          color="success"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        absolute
        bottom
        left
      >
        Your profile has been updated
      </v-snackbar>
    </v-card>

    <!-- <base-material-card
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          Formula Version
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      />
    </base-material-card> -->
    <template>
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Formula Version</v-toolbar-title>

          <v-spacer />

          <template v-slot:extension>
            <v-tabs

              v-model="tab"
              color="white"
              align-with-title
            >
              <v-tabs-slider color="yellow" />

              <v-tab
                v-for="item in items"
                :key="item"
              >
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item"
            color="primary"
          >
            <v-card flat>
              <v-card-text v-text="text" />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      users: [],
      chips: [],
      menu: false,
      modal: false,
      menu2: false,
      clients: [
      ],
      hasSaved: false,
      isEditing: null,
      model: null,
      statuses: [
        {
          id: 1,
          name: 'Open',
        },
        {
          id: 2,
          name: 'Processing',
        },
        {
          id: 3,
          name: 'Complete',
        },
      ],
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Position',
          value: 'position',
        },
        {
          text: 'Office',
          value: 'office',
        },
        {
          text: 'Age',
          value: 'age',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      selectedProject: {
      },
      selectedProjectId: '',
      search: undefined,
      projectUpdataRequest:
        {
          project: '',
          users: [],
        },
    }),
    created () {
      axios.get('http://localhost:8080/user/' + this.$route.query.projectId)
        .then(response => {
          this.chips = response.data
          console.log(this.chips)
        })
        .catch(e => {
          // this.errors.push(e)
        })
      axios.get('http://localhost:8080/user')
        .then(response => {
          this.users = response.data
        })
        .catch(e => {
          // this.errors.push(e)
        })
      // Get list client
      axios.get('http://localhost:8080/client')
        .then(response => {
          this.clients = response.data
        })
        .catch(e => {
          console.log(e)
        })
      this.selectedProjectId = this.$route.query.projectId
      // console.log(this.$route)
      axios.get('http://localhost:8080/project/' + this.selectedProjectId)
        .then(response => {
          this.selectedProject = response.data

          this.selectedProject.createdDate = this.formatDate(this.selectedProject.createdDate)
          this.selectedProject.deadline = this.formatDate(this.selectedProject.deadline)

          // console.log(this.chips)
        })
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      save () {
        this.isEditing = !this.isEditing

        this.projectUpdataRequest.users = this.chips
        this.projectUpdataRequest.project = this.selectedProject
        console.log(this.projectUpdataRequest)
        axios.put('http://localhost:8080/project', this.projectUpdataRequest)
          .then(response => {
            if (response.status === 200) {
              this.hasSaved = true
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      formatDate (timestamp) {
        return new Date(timestamp).toISOString().substr(0, 10)
      },
      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
    },
  }
</script>
