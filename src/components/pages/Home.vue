<template>
  <div class="container">
    <header>
      <div class="logo">
        <a @click="logInView = false">
          <img
            :src="urlLogo"
            width="200"
            alt="VueJs-Login-page - Black Logo - Without fon.png"
          />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a class="about" @click="openLink">About VueJs-Login-page</a>
          </li>
          <li>
            <div class="user">
              <img src="@/assets/user.png" />
            </div>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container-body">
      <login v-if="!logInView"></login>
      <reset v-else :email="newEmail"></reset>
    </div>
  </div>
</template>
<script>
import Login from "../views/Login";
import Reset from "../views/Reset";
import EventBus from "../../event-bus.js";

export default {
  name: "Home",
  components: {
    Login,
    Reset,
  },
  data() {
    return {
      newEmail: "",
      logInView: false,
      urlLogo:
        "https://landen.imgix.net/4xq4is7892ks/assets/twvggbvm.png?w=400",
    };
  },
  computed: {},
  methods: {
    openLink() {
      window.open("https://www.financial.com", "_blank");
    },
    setResetView(val) {
      this.logInView = val;
    },
    setNewEmail(val) {
      this.newEmail = val;
    },
  },
  created() {
    EventBus.$on("switchView", (data) => {
      this.setResetView(data);
    });
    EventBus.$on("newEmailAdded", (data) => {
      this.setNewEmail(data);
    });
  },
  beforeDestroy() {
    EventBus.$off("switchView");
    EventBus.$off("newEmailAdded");
  },
};
</script>
<style lang="scss">
$prefixContainer: container;
$main_color: #521751;
$prefixFormSignIn: signin-form;
$prefixFormReset: reset-form;

.#{$prefixContainer} {
  min-height: 500px;
  background-image: url("~@/assets/background.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #8495a0;
    padding: 0 20px;
    .about {
      &:hover {
        cursor: pointer;
      }
    }
    .user {
      width: 30px;
      img {
        border-radius: 50%;
        max-width: 100%;
      }
    }
    .logo {
      font-weight: bold;
      color: white;
      a {
        text-decoration: none;
        color: white;
        &:hover {
          cursor: pointer;
        }
      }
    }
    nav {
      height: 100%;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;
        li {
          margin: 0 16px;
          a {
            text-decoration: none;
            color: white;
            &:hover,
            &:active {
              color: $main_color;
            }
          }
        }
      }
    }
  }
  &-body {
    text-align: left;
    width: 50%;
  }
}

.#{$prefixFormSignIn},
.#{$prefixFormReset} {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
  .input {
    margin: 10px auto;
    label {
      display: block;
      color: #4e4e4e;
      margin-bottom: 6px;
    }
    input {
      background: transparent;
      border: none;
      font: inherit;
      width: 100%;
      padding: 5px 0px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      &:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid $main_color;
        background-color: #eee;
      }
    }
  }
  .errors {
    li {
      list-style-type: none;
      color: red;
      font-size: 0.7rem;
      &:before {
        color: white;
        background-color: red;
        display: inline-block;
        content: "\D7";
        border-radius: 50%;
        margin-right: 5px;
        padding: 0px 4px;
        vertical-align: text-top;
        font-size: 0.8rem;
      }
    }
  }
  .success {
    list-style-type: none;
    color: green;
    font-size: 0.7rem;
    li {
      &:before {
        content: "\A1";
        color: white;
        background-color: green;
        display: inline-block;
        border-radius: 50%;
        margin-right: 5px;
        padding: 1px 7px;
        vertical-align: text-top;
        transform: rotate(180deg);
        font-size: 0.8rem;
      }
    }
  }
  .resetPassword {
    margin: 20px 0px;
    a {
      text-decoration: none;
    }
  }
  .submit button {
    border: 1px solid $main_color;
    color: #521751;
    padding: 6px 70px;
    font: inherit;
    cursor: pointer;
    border-radius: 5px;

    &:hover,
    &:active {
      background-color: $main_color;
      color: white;
    }
    &[disabled],
    &[disabled]:hover,
    &[disabled]:active {
      border: 1px solid #ccc;
      background-color: transparent;
      color: #ccc;
      cursor: not-allowed;
    }
  }
}
::placeholder {
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.7rem;
}
</style>