# Kattegat generator

This generator creates a ready-to-run [Kattegat application server](https://github.com/ClintH/kattegat), and client-side Javascript samples.

# Setup

Make sure you've already installed:
* [Node.js](http://nodejs.org/download/)
* Git: [Windows](https://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git) / [Mac](http://git-scm.com/download/mac)

Once you've got Node installed, you can install [Yeoman](http://yeoman.io) with:
```
$ npm install -g yo
```

Next, install the Kattegat generator

```
$ npm install -g generator-kattegat
```

# Making a server

Now that the setup tasks are out of the way, you are able to generate a new Kattegat server when ever you like.

You'll probably only need one, but if something breaks, it's nice to know you can re-generate it!

Make a new directory and change to it:

```
$ mkdir myapp && cd myapp
```

And now run the Kattegat generator. It will ask you for a name of the app, or just press enter if you aren't fussed.

```
$ yo kattegat
```

It will take some time to run, and you'll see a lot of stuff scrolling by. Once it's done, you're ready to continue.

[Continue on!](https://github.com/ClintH/kattegat)

# Starter pages

When you first make your app, the directory `BASE\public\template` is created, with HTML, CSS and JS files ready to go. This is a good first test of your setup (eg by navigating to a URL such as `http://localhost:3000/template/`) and also a great starting point for making quick sketches or experiments.

You can generate a new page by running the following. It will prompt you for a name:

````
$ yo kattegat:page
`````

And the generator will make a new folder and starter files for you.

Generating a new page is great if you're just doing client-side code, because they simple and quick to create, and lets you keep your sketches separate.