<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          label="Project Code"
          value="PRO001"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          label="Product"
          value="Coconut Soap"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          label="Client"
          value="ABC Cosmetics"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-combobox
          v-model="select"
          :items="items"
          label="Assignee"
          multiple
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              />
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          label="Create date"
          placeholder="2021/01/26"
          disabled
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          label="Reporter"
          value="Manager"
          disabled
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          label="Requirment"
          textarea
          outline
        />
      </v-col>

      <base-material-card
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
      </base-material-card>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'DashboardDataTables',

    data: () => ({
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
      items: [
        {
          name: 'Airi Satou',
          position: 'Accountant',
          office: 'Tokyo',
          age: 33,
          date: '2008/11/28',
        },
        {
          name: 'Angelica Ramos',
          position: 'Chief Executive Officer (CEO)',
          office: 'London',
          age: 47,
          date: '2009/10/09',
        },
        {
          name: 'Ashton Cox',
          position: 'Junior Technical Author',
          office: 'San Francisco',
          age: 66,
          date: '2009/01/12',
        },
        {
          name: 'Bradley Greer',
          position: 'Software Engineer',
          office: 'London',
          age: 41,
          date: '2012/10/13',
        },
        {
          name: 'Brenden Wagner',
          position: 'Software Engineer',
          office: 'San Francisco',
          age: 28,
          date: '2011/06/07',
        },
      ],
      search: undefined,
    }),
  }
</script>
<script>
  export default {
    data () {
      return {
        select: ['DucPLM', 'LinhLNK'],
        items: [
          'DucPLM',
          'VanNL',
          'SuNV',
          'LinhLNK',
        ],
      }
    },
  }
</script>
