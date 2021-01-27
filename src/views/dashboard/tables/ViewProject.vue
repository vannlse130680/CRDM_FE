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
    <base-material-card
      id="btn-create"
      color="success"
      icon="mdi-clipboard-plus"
      title="List project"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th>No</th>
            <th>Project Code</th>
            <th>Project Name</th>
            <th>Customer Name</th>
            <th>Create Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>AX001</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>
          <tr>
            <td>1</td>
            <td>AX001</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>

          <tr>
            <td>2</td>
            <td>AX002</td>
            <td>Curaçao</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>

          <tr>
            <td>3</td>
            <td>AX003</td>
            <td>Netherlands</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>

          <tr>
            <td>4</td>
            <td>AX004</td>
            <td>Korea, South</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>

          <tr>
            <td>5</td>
            <td>AX005</td>
            <td>Malawi</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>

          <tr>
            <td>6</td>
            <td>AX006</td>
            <td>Chile</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
<style>
#btn-create {
  margin-top: 50px;
}
</style>
