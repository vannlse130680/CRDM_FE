<template>
  <v-container
    id="data-tables"
    tag="section"
    fluid
  >
    <v-form
      ref="form"
    >
      <v-card
        class="overflow-hidden"
        color=""
        width="1600"
      >
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-icon>mdi-clipboard-outline </v-icon>
          <v-toolbar-title>
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
                :rules="[v => !!v || 'Item is required']"
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
                    v-on="isEditing ? on : ''"
                  />
                </template>
                <v-date-picker
                  v-model="selectedProject.deadline"
                  :min="today"
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
                    @click:close="if(isEditing) remove(data.item)"
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
          Your project has been updated
        </v-snackbar>
      </v-card>
    </v-form>
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
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="formulas"
          sort-by="code"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Formula Version
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.id"
                            label="Dessert name"
                          />
                        </v-col> -->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.id"
                            label="ID"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogDelete"
                max-width="500px"
              >
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to delete this item?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeDelete"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      OK
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <!-- <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template> -->
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'DashboardDataTables',

    data: () => ({

      today: new Date().toISOString().substr(0, 10),
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

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Code', value: 'code' },
        { text: 'Created Date', value: 'createdDate' },
        { text: 'Status', value: 'status' },

        { text: 'Actions', value: 'actions', sortable: false },
      ],
      formulas: [],
      selectedProject: {
      },

      editedIndex: -1,
      editedItem: {
        id: '',
        code: 0,
        createdDate: 0,
        status: 0,

      },
      defaultItem: {
        id: '',
        code: 0,
        createdDate: 0,
        status: 0,
      },

      selectedProjectId: '',
      search: undefined,
      projectUpdataRequest:
        {
          project: '',
          users: [],
        },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
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

      axios.get('http://localhost:8080/formula/projectId/' + this.$route.query.projectId)
        .then(response => {
          this.formulas = response.data
          for (var i = 0; i < response.data.length; i++) {
            this.formulas[i].createdDate = this.formatDate(response.data[i].createdDate)
          }
        })
        .catch(e => {
          // this.errors.push(e)
        })
    },
    methods: {
      formatDate (timestamp) {
        return new Date(timestamp).toISOString().substr(0, 10)
      },
      save () {
        if (!this.$refs.form.validate()) return

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

      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
    },
  }
</script>
