This is my solution to the **JS Applications Exam at SoftUni - 8 August 2020**.
All students are provided with the web design of the application as HTML + CSS files.
The goal of the exam is to add **basic functionalities with Javascript to a Client-Side Web Application**.
The **main topics of the course** are:
* Asynchronous programming
* Remote databases
* Templating
* Routing

Link to Problem Description (Условие) and Resources (Ресурси) [here](https://judge.softuni.bg/Contests/2529/JS-Applications-Exam-8-August-2020).

**Please perform these steps before starting the app:**

* **Install node_modules**

* **Set up libraries**
    * Set up index.html with the required libraries in script tags;
    * Set up firebase app;
    * Add firebase configs inside your index.html file;
        *Note:* _If you are using handlebars with sammy you must include also sammy-handlebars in your index.html_

* **Config Sammy.js (if Sammy.js is used)**

    _initialize the application_
const app = Sammy('#main', function() {
    _define the template engine your app will use_
    this.use('Handlebars', 'hbs');

    _define your routes and handlers/controllers_
    this.get('#/', homeViewHandler);
    ...
  });
  _start the application_
  app.run('#/');
Look at the docs here: http://www.sammyjs.org/

* **Firebase DB config**

{
  "rules": {
    ".read": "auth !== null",
    ".write": "auth !== null"
  }
}