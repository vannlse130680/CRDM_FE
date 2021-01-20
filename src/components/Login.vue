<template>
  <div class="login-main">
    <div>
      <!-- <label>Language</label> -->
      <!-- <el-select v-model="value" placeholder="Select Language">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
    </div>
    <h2>Project</h2>
    <!-- <form action="/action_page.php" method="post"> -->
    <!-- <div class="imgcontainer">
      <img src="../assets/image/logoHome.png" alt="Avatar" class="avatar" />
    </div> -->

    <!-- <div class="container"> -->
    <h2>Login</h2>
    <el-row>
      <label for="uname" class="userClass"><b>Username</b></label>
      <input
        type="text"
        placeholder="Enter Username"
        v-model="username"
        required
      />
    </el-row>
    <el-row>
      <label for="psw" class="userClass"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        v-model="password"
        required
      />
    </el-row>
    <!-- <div> -->
    <el-row>
      <el-button type="submit" @click="clickButton" v-loading.fullscreen.lock="fullscreenLoading">Login</el-button>
    </el-row>
    <el-row>
      <label>
        <input type="checkbox" checked="checked" name="remember" /> Remember me
      </label>
    </el-row>
    <!-- </div> -->
    <!-- </div> -->

    <div class="container">
      <el-row>
        <el-button type="button" class="cancelbtn">Cancel</el-button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </el-row>
    </div>

    <el-dialog
      title="ERROR"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>Username or Password wrong!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
Vue.use(ElementUI);

export default {
  name: "Login",
  data() {
    return {
      fullscreenLoading: '',
      username: "",
      password: "",
      dialogVisible: false,
      value: "",
      options: [
        {
          value: "1",
          label: "English",
        },
        {
          value: "2",
          label: "Japanese",
        },
      ],
    };
  },
  mounted() {
    this.value = "1";
  },
  methods: {
    ...mapActions("login", ["_checkLogin"]),
    clickButton: function () {
      let obj = {
        username: this.username,
        password: this.password,
      };
      new Promise((resolve, reject) => {
        resolve();
      })
        .then((res) => {
          return this._checkLogin(obj);
        })
        .then((res) => {
          if (res.data) {
            localStorage.setItem('language', this.value)
            localStorage.setItem('username', this.username)
            this.fullscreenLoading = true
            setTimeout(() => {
              this.fullscreenLoading = false
              this.$router.push({ name: "DashBoard" })
            }, 2000);
            
          } else {
            this.dialogVisible = true;
          }
        });
    },
  },
};
</script>

<style scoped style="scss">
.login-main {
  background-color: lightsteelblue;
  text-align: center;
}
body {
  font-family: "quicksand", sans-serif;
}
form {
  border: 3px solid #f1f1f1;
}

input[type="text"],
input[type="password"] {
  width: 40%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.userClass {
  padding-right: 10px;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 15%;
}
.el-select {
  margin-left: 85vw;
}
.el-dropdown-link {
  /* border: 1px solid black; */
}
span.psw {
  /* float: right; */
  padding-top: 16px;
  margin-left: 10px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
