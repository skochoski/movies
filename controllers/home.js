import models from "../models/index.js";
import extend from "../utils/context.js";
import docModifier from "../utils/doc-modifier.js";
import notifications from "../utils/notifications.js";

export default {
  get: {
    home(context) {
      extend(context).then((res) => {
        if (localStorage.getItem("userId")) {
          models.movie.getAll().then((res) => {
            let movies = res.docs.map(docModifier).sort((a, b) => {
              return (
                Number(b.peopleLiked.length) - Number(a.peopleLiked.length)
              );
            });

            if (context.params.search) {
              movies = movies.filter((movie) =>
                movie.title.toLowerCase().includes(context.params.search)
              );
            }

            context.movies = movies;

            extend(context).then(function () {
              this.partial("../views/home/home.hbs");
              notifications.hideLoading();
            });
          });
        } else {
          extend(context).then(function () {
            this.partial("../views/home/home.hbs");
            notifications.hideLoading();
          });
        }
      });
    },
  },
};
