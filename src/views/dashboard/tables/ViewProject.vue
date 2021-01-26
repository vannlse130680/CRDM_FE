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
          <router-link
            to="/project/view-project-detail"
            tag="tr"
          >
            <td>1</td>
            <td>AX001</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td>2020/01/01</td>
          </router-link>
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
<style>
#btn-create {
  margin-top: 50px;
}
</style>
