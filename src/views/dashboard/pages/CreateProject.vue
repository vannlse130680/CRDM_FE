<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Create Project
            </div>

            <!-- <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div> -->
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="first"
                    label="Project Code"
                    filled
                  />

                  <v-text-field
                    v-model="first"
                    label="Project Name"
                    filled
                  />
                </v-col>
                <v-col>
                  <v-btn
                    absolute
                    right
                    bottom
                    tile
                    color="success"
                  >
                    <v-icon left>
                      mdi-pencil
                    </v-icon>
                    Create
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: ['VFRAM', 'FPT', 'ABC', 'Buzz'],
    }),
  }
</script>
