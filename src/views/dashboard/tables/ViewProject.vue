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
            {{ item.status }}
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
                    @click="reset"
                    v-on="on"
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
                      <v-row>
                        <v-col
                          cols="1"
                          sm="2"
                          md="5"
                        >
                          <v-text-field
                            v-model="editedItem.code"
                            required
                            :rules="[v => !!v || 'Item is required']"
                            :counter="10"
                            label="Project code"
                          />
                        </v-col>
                      </v-row>
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
                            v-model="editedItem.client"
                            :rules="[v => !!v || 'Item is required']"
                            :items="clients"
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
                            label="Status"
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
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
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
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      isEdit: true,
      clients: ['VFARM', 'FPT', 'ACB'],
      statuses: ['Open', 'Processing', 'Close'],
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Project Code',

          sortable: false,
          value: 'code',
          width: 100,

        },
        { text: 'Product', value: 'product', width: 450 },
        { text: 'Client', value: 'client' },
        { text: 'Created Date', value: 'createdDate' },
        { text: 'Status', value: 'status', align: 'center', width: 100 },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      projects: [],
      editedIndex: -1,
      editedItem: {
        code: '',
        product: '',
        client: 0,
        createdDate: 0,
        status: 0,
      },
      defaultItem: {
        code: '',
        product: '',
        client: 0,
        createdDate: 0,
        status: 0,
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
      this.initialize()
    },

    methods: {
      initialize () {
        this.projects = [
          {
            code: 'PR001',
            product: 'COCO MIRACLE ANTI ACNE SOAP',
            client: 'VFARM',
            createdDate: '00:15:09, 28/1/2021',
            status: 'Open',
          },
          {
            code: 'PR002',
            product: 'COCO MIRACLE SHAMPOO AND BODY WASH 2IN1',
            client: 'FPT',
            createdDate: '00:15:09, 28/1/2021',
            status: 'Open',
          },
          {
            code: 'PR003',
            product: 'NATURAL TINTED LIP BALM',
            client: 'FPT',
            createdDate: '00:15:09, 28/1/2021',
            status: 'Processing',
          },
          {
            code: 'PR004',
            product: 'NATURAL COCONUT BELLY BUTTER',
            client: 'ACB',
            createdDate: '00:15:09, 28/1/2021',
            status: 'Open',
          },
          {
            code: 'PR005',
            product: 'COCONUT MOOD BOOST BODY OIL',
            client: 'VFARM',
            createdDate: '00:15:09, 28/1/2021',
            status: 'Close',
          },

        ]
      },

      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
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
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
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
          console.log(this.editedItem.code)
          this.editedItem.createdDate = new Date().toLocaleString()
          this.editedItem.status = 'Open'
          this.projects.push(this.editedItem)
        }
        this.close()
      },
      getColor (status) {
        if (status === 'Open') return 'green'
        else if (status === 'Processing') return 'orange'
        else if (status === 'Close') return 'red'
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
