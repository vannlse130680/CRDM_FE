<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      color="success"
      icon="mdi-clipboard-plus"
      title="List project"
      class="px-5 py-3"
    >
      <v-data-table

        :search="search"
        :headers="headers"
        :items="projects"

        class="elevation-1"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            id="chip-status"
            label
            dense

            small
            :color="getColor(item.status)"
            dark
          >
            {{ setStatus(item.status) }}
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-spacer />

            <v-text-field
              v-model="search"
              filled
              dense
              class="mr-10"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
            <v-form
              ref="form"
            >
              <v-dialog
                v-model="dialog"
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-1"
                    v-bind="attrs"

                    v-on="on"
                    @click="reset"
                  >
                    <v-icon left>
                      mdi-plus
                    </v-icon>
                    New Project
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <!-- <v-row>
                        <v-col
                          cols="1"
                          sm="2"
                          md="5"
                        >
                          <v-text-field
                            v-model="editedItem.id"
                            required
                            :rules="[v => !!v || 'Item is required']"
                            :counter="10"
                            label="Project code"
                          />
                        </v-col>
                      </v-row> -->
                      <v-row>
                        <v-col
                          cols="12"
                          sm="10"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.product"
                            label="Product"
                            :rules="[v => !!v || 'Item is required']"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-select
                            v-model="editedItem.clientId"
                            :rules="[v => !!v || 'Item is required']"
                            :items="clients"
                            item-text="name"
                            item-value="id"
                            label="Client"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-select
                            v-if="editedIndex > -1"
                            v-model="editedItem.status"
                            :items="statuses"
                            item-value="id"
                            item-text="name"
                            label="Status"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
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
                                v-model="editedItem.deadline"
                                label="Deadline"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.deadline"
                              color="primary"
                              @input="menu2 = false"
                            />
                          </v-menu>
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
            </v-form>
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
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="view"
          >
            mdi-eye
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
    </base-material-card>
  </v-container>
</template>
<script>
  import axios from 'axios'
  // import { validationMixin } from 'vuelidate'
  // import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {

    // mixins: [validationMixin],

    // validations: {
    //   name: { required, maxLength: maxLength(10) },
    //   email: { required, email },
    //   select: { required },
    //   checkbox: {
    //     checked (val) {
    //       return val
    //     },
    //   },
    // },
    data: () => ({
      // date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      isEdit: true,
      clients: [
        {
          id: '',
          name: '',
        },
      ],
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
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Project Code',

          sortable: false,
          value: 'id',
          width: 100,
        },
        { text: 'Product', value: 'product', width: 350 },
        { text: 'Client', value: 'client' },
        { text: 'Created Date', value: 'createdDate' },
        { text: 'Deadline', value: 'deadline' },
        { text: 'Status', value: 'status', align: 'center', width: 100 },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],

      projects: [],
      editedIndex: -1,
      editedItem: {
        product: '',
        clientId: 0,
        createdDate: 0,
        status: 0,
        deadline: '',
      },
      defaultItem: {
        product: '',
        clientId: 0,
        createdDate: 0,
        status: 0,
        deadline: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
      },
      // selectErrors () {
      //   const errors = []
      //   if (!this.$v.select.$dirty) return errors
      //   !this.$v.select.required && errors.push('Item is required')
      //   return errors
      // },
      // nameErrors () {
      //   const errors = []
      //   if (!this.$v.name.$dirty) return errors
      //   !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      //   !this.$v.name.required && errors.push('Name is required.')
      //   return errors
      // },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      // Get list client
      axios.get('http://localhost:8080/client')
        .then(response => {
          this.clients = response.data
        })
        .catch(e => {
          console.log(e)
        })
      axios.get('http://172.16.189.126:8080/project')
        .then(response => {
          // duyệt để set name cho client
          this.projects = response.data
          for (var i = 0; i < response.data.length; i++) {
            this.projects[i].client = response.data[i].client.name
            this.projects[i].createdDate = this.formatDate(response.data[i].createdDate)
            this.projects[i].deadline = response.data[i].deadline != null ? this.formatDate(response.data[i].deadline) : ''
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
      customizeObj (response) {
        return {
          id: response.data.id,
          product: response.data.product,
          client: response.data.client.name,
          clientId: response.data.client.id,
          createdDate: this.formatDate(response.data.createdDate),
          status: response.data.status,
          deadline: response.data.deadline != null ? this.formatDate(response.data.deadline) : '',
        }
      },

      setStatus (statusCode) {
        if (statusCode === 1) return 'Open'
        if (statusCode === 2) return 'Processing'
        if (statusCode === 3) return 'Complete'
      },

      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.projects.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)

          this.editedIndex = -1
        })

        this.dialog = false
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (!this.$refs.form.validate()) return

        if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem)
        } else {
          console.log(this.editedItem)
          axios.post('http://localhost:8080/project', this.editedItem)
            .then(response => {
              // console.log(response)

              if (response.status === 200) { this.projects.push(this.customizeObj(response)) }
            })
            .catch(e => {
              console.log(e)
            })
        }
        this.close()
      },
      getColor (status) {
        if (status === 1) return 'blue'
        else if (status === 2) return 'orange'
        else if (status === 3) return 'greend'
      },
      view () {
        this.$router.push({ path: '/project/view-project-detail' })
      },
      reset () {
        if (!this.$refs.form.validate()) {
          this.$refs.form.reset()
        }
      },
    },
  }
</script>
<style>
  #chip-status {
    width: 100px;
    display: block;
  }
  .disable-events {
  pointer-events: none
}
</style>
