<template>
  <div id="signin">
    <div class="signin-form">
      <h1>Sign In</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            v-model="email"
          />
        </div>
        <div class="input">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <messages :errors="errors" :success="success"></messages>
        <div class="resetPassword">
          <a href="#" @click="switchView">Want to reset password?</a>
        </div>
        <div class="submit">
          <button type="submit">
            Login
            <i class="arrow right"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus.js";
import Messages from "../views/Messages";

export default {
  name: "Login",
  components: {
    Messages,
  },
  data() {
    return {
      email: "",
      password: "",
      resetPassView: true,
      errors: [],
      success: [],
      response: null,
    };
  },
  computed: {},
  methods: {
    onSubmit(e) {
      const formData = {
        email: this.email,
        password: this.password,
      };

      this.validateForm(e, formData);

      if (this.errors.length == 0) {
        fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((json) => {
            let key = json.token;
            localStorage.setItem(key, "Login");
            this.success.push("Login successful!");
          })
          .catch((err) => {
            err.json().then((errorMessage) => {
              this.errors.push(errorMessage.error);
            });
          });
      }
    },
    switchView() {
      this.errors = [];
      if (!this.email.length) {
        this.errors.push("Email field is required");
        return;
      } else if (!this.validateEmail(this.email)) {
        this.errors.push("Please enter valid email!");
        return;
      } else {
        EventBus.$emit("newEmailAdded", this.email);
        EventBus.$emit("switchView", this.resetPassView);
      }
    },
    setPassword(val) {
      this.password = val;
    },
    validateForm(e, data) {
      e.preventDefault();
      this.errors = [];
      this.success = [];
      if (!data.email.length) {
        this.errors.push("Email field is required");
      } else if (!this.validateEmail(data.email)) {
        this.errors.push("Please enter valid email!");
      }
      if (!data.password.length) {
        this.errors.push("Password field is required");
      }
    },
    validateEmail(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>