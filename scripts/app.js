import controllers from "../controllers/index.js";

const app = Sammy("#root", function () {
  this.use("Handlebars", "hbs");

  this.get("#/", controllers.home.get.home);
  this.get("#/home", controllers.home.get.home);

  this.get("#/register", controllers.user.get.register);
  this.post("#/register", controllers.user.post.register);
  this.get("#/login", controllers.user.get.login);
  this.post("#/login", controllers.user.post.login);
  this.get("#/logout", controllers.user.get.logout);

  this.get("#/create", controllers.movie.get.create);
  this.post("#/create", controllers.movie.post.create);
  this.get("#/details/:movieId", controllers.movie.get.details);
  this.get("#/edit/:movieId", controllers.movie.get.edit);
  this.post("#/edit/:movieId", controllers.movie.post.edit);
  this.get("#/like/:movieId", controllers.movie.post.likes);
  this.get("#/delete/:movieId", controllers.movie.del.delete);
});

(() => {
  app.run("#/");
})();
