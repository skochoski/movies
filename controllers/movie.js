import models from "../models/index.js";
import extend from "../utils/context.js";
import docModifier from "../utils/doc-modifier.js";
import notifications from "../utils/notifications.js";

export default {
  get: {
    create(context) {
      extend(context).then(function () {
        this.partial("../views/movie/create.hbs");
      });

      notifications.hideLoading();
    },
    details(context) {
      const { movieId } = context.params;
      models.movie
        .get(movieId)
        .then((res) => {
          const movie = docModifier(res);
          context.movie = movie;
          context.isCreator = movie.uid === localStorage.getItem("userId");
          context.hasUserLikedTheMovie = movie.peopleLiked.includes(
            localStorage.getItem("userEmail")
          );
          context.movie.likes = movie.peopleLiked.length;

          extend(context).then(function () {
            this.partial("../views/movie/details.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(
            "Sorry, currently we are not able to show You the details of this movie."
          );
          console.error(err);
        });

      notifications.hideLoading();
    },
    edit(context) {
      const { movieId } = context.params;

      models.movie
        .get(movieId)
        .then((res) => {
          context.movie = docModifier(res);

          extend(context).then(function () {
            this.partial("../views/movie/edit.hbs");
          });
        })
        .catch((err) => {
          console.error(err);
        });

      notifications.hideLoading();
    },
  },
  post: {
    create(context) {
      const { title, description, imageUrl } = context.params;

      if (!title || !description || !imageUrl) {
        notifications.showError("Invalid inputs!");

        return;
      }

      const data = {
        ...context.params,
        uid: localStorage.getItem("userId"),
        creator: localStorage.getItem("userEmail"),
        peopleLiked: [],
      };

      models.movie
        .create(data)
        .then((res) => {
          notifications.showSuccess("Created successfully!");
          context.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for adding a movie!");
          console.error(err);
        });

      notifications.hideLoading();
    },
    edit(context) {
      const { movieId, title, description, imageUrl } = context.params;

      if (!title || !description || !imageUrl) {
        notifications.showError("Invalid inputs!");

        return;
      }

      models.movie
        .update(movieId, { title, description, imageUrl })
        .then((res) => {
          notifications.showSuccess("Edited successfully!");
          context.redirect(`#/details/${movieId}`);
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for editing a movie!");
          console.error(err);
        });

      notifications.hideLoading();
    },

    likes(context) {
      const { movieId } = context.params;
      models.movie
        .get(movieId)
        .then((res) => {
          const movie = docModifier(res);
          movie.peopleLiked.push(localStorage.getItem("userEmail"));

          notifications.showSuccess("Liked successfully!");

          return models.movie.update(movieId, movie);
        })
        .then((res) => {
          context.redirect(`#/details/${movieId}`);
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for liking this movie!");
          console.error(err);
        });

      notifications.hideLoading();
    },
  },
  del: {
    delete(context) {
      const { movieId } = context.params;
      models.movie
        .delete(movieId)
        .then((res) => {
          notifications.showSuccess("Deleted successfully!");
          context.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError("Unsuccessful atempt for deleting a movie!");
          console.error(err);
        });

      notifications.hideLoading();
    },
  },
};
