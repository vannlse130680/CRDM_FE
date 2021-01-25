<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      color="success"
      dark
      icon="mdi-clipboard-plus"
      title="Table on Dark Background"
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
