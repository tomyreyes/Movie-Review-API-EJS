# Movie Review Website

This is a movie review database website inspired by [IMDB](http://www.imdb.com/) and [Rotten Tomatoes](https://www.rottentomatoes.com/). I created this website using server-side rendering and I implemented this using node, express, EJS, SASS and Materialize.
Server-side rendering refers to the creation of dynamic content within a pre-built structure in a web application. For instance, when we look at many social media applications, for example
Instagram we see that the structure of users' pages are all the same, but the content within it is not. It would be inefficient to create a separate page for each user, when the structure of their web pages are all the same. Instead of doing this, server-side rendering enables 
developers to create a template that will be used by all users. The only difference is that the information that is displayed in these templates will be different.
To generate the different user pages, there will be code within this template that provides the page with the requested content. 
This code will be linked to server-side code that handle the requests and handle the information of the users such as their usernames, passwords and pictures. 

In this assignment the template engine I used was Embedded Javascript (EJS). An interesting thing that I utilized within EJS is partials. Partials enable users to create 
re-usable HTML web page structures. For example, in my movie website I use the exact same navigation bar for all pages. With EJS partials, I am able to create a file that contains a navigation bar
that can be included on all my pages. Since this is just in one file, every change I make to this navbar will be implemented on every web page that includes it. 

To obtain the content for my application I used [The Movie Database's](https://www.themoviedb.org/?language=en) API, node and Express. 
The way I used EJS to generate all of the movies and their stand-alone pages, I used each movie's id. This id and the other data of interest pertaining to these movies were 
written to a file using node's fs.WriteFile and then created into a global variable. 

Finally, important thing I tried to implement within this application was routers. Routers will be something I will be using for every project I will be working on
in the future in order to ensure that my project is well organized and that my code is clean. 

## This application was built using:
* node.js
* [express](https://www.npmjs.com/package/express)
* [request](https://www.npmjs.com/package/request)
* [EJS](https://www.npmjs.com/package/ejs)
* [Materialize](http://materializecss.com/)
* SASS
