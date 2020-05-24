<template>
  <div id="reset">
    <div class="reset-form">
      <h1>Reset Password</h1>
      <form @submit.prevent>
        <div class="input">
          <label for="password">New Password</label>
          <input type="password" required id="newPassword" v-model="newPassword" />
        </div>
        <div class="input">
          <label for="password">Confirm Password</label>
          <input type="password" required id="confirmPassword" v-model="confirmPassword" />
        </div>
        <messages
          :errors="errors"
          :success="success"
        ></messages>
        <div class="submit">
          <button @click="savePassword" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus";
import Messages from "../views/Messages";

export default {
  name: "Reset",
  props: ["email"],
  components: {
    Messages
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      resetPassView: false,
      errors: [],
      success: []
    };
  },
  methods: {
    savePassword() {
      const formData = {
        email: this.email,
        password: this.newPassword
      };

      this.validatePasswords();

      if (this.errors.length == 0) {
        fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
          .then(response => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then(() => {
            this.success.push("Reset password successful!");
            setTimeout(() => {
              this.routeBack();
            }, 3000);
          })
          .catch(err => {
            err.json().then(errorMessage => {
              this.errors.push(errorMessage.error);
            });
          });
      }
    },
    routeBack() {
      EventBus.$emit("switchView", this.resetPassView);
    },
    validatePasswords() {
      this.errors = [];

      if (this.newPassword !== this.confirmPassword) {
        this.errors.push("Password and confirm password do not match");
      }
    }
  }
};
</script>