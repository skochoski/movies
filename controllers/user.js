import models from "../models/index.js";
import extend from "../utils/context.js";
import notifications from "../utils/notifications.js";

export default {
  get: {
    login(context) {
      extend(context).then(function () {
        this.partial("../views/user/login.hbs");
      });
      notifications.hideLoading();
    },
    register(context) {
      extend(context).then(function () {
        this.partial("../views/user/register.hbs");
      });
      notifications.hideLoading();
    },
    logout(context) {
      models.user
        .logout()
        .then((res) => {
          notifications.showSuccess("Successful logout!");
          context.redirect("#/");
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for logout!");
          console.error(err);
        });
    },
  },
  post: {
    login(context) {
      const { email, password } = context.params;
      models.user
        .login(email, password)
        .then((res) => {
          notifications.showSuccess("Login successful!");
          Array.from(document.querySelectorAll("form input")).forEach(
            (inputEl) => (inputEl.value = "")
          );
          context.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for login!");
          console.error(err);
        });
    },
    register(context) {
      const { email = null, password, repeatPassword } = context.params;

      if (!email) {
        notifications.showError("The email box should not be empty!");

        return;
      }

      if (password.length < 6) {
        notifications.showError(
          "The password should be at least 6 characters long!"
        );

        return;
      }

      if (password !== repeatPassword) {
        notifications.showError("Both passwords must be the same!");

        return;
      }

      models.user
        .register(email, password)
        .then((res) => {
          notifications.showSuccess("Successful registration!");
          context.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for registration!");
          console.error(err);
        });
    },
  },
};
