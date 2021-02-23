<template>
  <base-material-card
    color="success"
    icon="mdi-sprout"
    title="Material List"
    class="px-5 py-3"
  >
    <v-data-table
      :search="search"
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <!-- ?<v-toolbar-title>Material</v-toolbar-title> -->
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-10"
          />
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
                Add New
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
                        v-model="editedItem.name"
                        label="Raw Material"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.incname"
                        label="INCName"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.supplier"
                        label="Supplier"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    />
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
      <template
        v-slot:[`item.actions`]="{ item }"
        class="mr-10"
      >
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
        <v-icon
          small
          class="ml-2"
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
  <!-- </v-data-table> -->
</template>
<script>
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Raw Material',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'INCName', value: 'incname', width: 450 },
        { text: 'Supplier', value: 'supplier' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        incname: 0,
        supplier: 0,
      },
      defaultItem: {
        name: '',
        incname: 0,
        supplier: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        this.desserts = [
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
          {
            name: 'Lavie drink',
            incname: 'water',
            supplier: 'Công ty TNHH La Vie',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
