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
        sort-by="calories"
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

            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-1"
                  v-bind="attrs"

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
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.code"
                          label="Project code"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.product"
                          label="Product"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.client"
                          label="Client"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.createdDate"
                          label="created date"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.status"
                          label="status"
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
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Project Code',
          align: 'center',
          sortable: false,
          value: 'code',
          width: 100,

        },
        { text: 'Product', value: 'product', align: 'center' },
        { text: 'Client', value: 'client', align: 'center' },
        { text: 'Created Date', value: 'createdDate', align: 'center' },
        { text: 'Status', value: 'status', align: 'center', width: 100 },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      projects: [],
      editedIndex: -1,
      editedItem: {
        code: '',
        product: 0,
        client: 0,
        createdDate: 0,
        status: 0,
      },
      defaultItem: {
        code: '',
        product: 0,
        client: 0,
        createdDate: 0,
        status: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
      },
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
            product: 159,
            client: 6.0,
            createdDate: 24,
            status: 'Open',
          },
          {
            code: 'PR002',
            product: 237,
            client: 9.0,
            createdDate: 37,
            status: 'Open',
          },
          {
            code: 'PR003',
            product: 262,
            client: 16.0,
            createdDate: 23,
            status: 'Processing',
          },
          {
            code: 'PR004',
            product: 305,
            client: 3.7,
            createdDate: 67,
            status: 'Open',
          },
          {
            code: 'PR005',
            product: 356,
            client: 16.0,
            createdDate: 49,
            status: 'Close',
          },
          {
            code: 'PR006',
            product: 375,
            client: 0.0,
            createdDate: 94,
            status: 'Open',
          },
          {
            code: 'PR007',
            product: 392,
            client: 0.2,
            createdDate: 98,
            status: 'Processing',
          },
          {
            code: 'PR008',
            product: 408,
            client: 3.2,
            createdDate: 87,
            status: 'Processing',
          },
          {
            code: 'PR009',
            product: 452,
            client: 25.0,
            createdDate: 51,
            status: 'Open',
          },
          {
            code: 'PR0010',
            product: 518,
            client: 26.0,
            createdDate: 65,
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
        if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem)
        } else {
          this.projects.push(this.editedItem)
        }
        this.close()
      },
      getColor (status) {
        if (status === 'Open') return 'green'
        else if (status === 'Processing') return 'orange'
        else if (status === 'Close') return 'red'
      },
    },
  }
</script>
<style>
  #chip-status {
    width: 80px;
    display: block;
    text-align: center;

  }
  .disable-events {
  pointer-events: none
}
</style>
