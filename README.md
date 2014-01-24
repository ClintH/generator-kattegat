# Kattegat generator

This generator creates a ready-to-run [Kattegat application server](https://github.com/ClintH/kattegat), and client-side Javascript samples.

# Setup

Make sure you've already installed:
* [Node.js](http://nodejs.org/download/)
* Git: [Windows](https://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git) / [Mac](http://git-scm.com/download/mac)

Install [Yeoman](http://yeoman.io) with the following command:

(note: the $ is just a hint to let you know you should type 'npm install -g yo' at the command line. Don't type the $ in)

```
$ npm install -g yo
```


Next, install the Kattegat generator

```
$ npm install -g generator-kattegat
```

# <a name="make-server"></a> Making a server

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

It will take some time to run, and you'll see a lot of stuff scrolling by. Once it's done, and you get the message "Done, without errors" you're ready to continue.

[Continue on!](https://github.com/ClintH/kattegat)

# If you get an error
If you get an error running the `npm install` or `yo kattegat` commands, try them once more. I've noticed sometimes I get permission denied errors which go away after repeating the command.

# <a name="make-page"></a> Starter pages

When you first make your app, the directory `BASE\public\template` is created, with HTML, CSS and JS files ready to go. This is a great starting point for making quick sketches or experiments.

You can generate a new page by running the following command (it will prompt you for a name):

````
$ yo kattegat:page
`````

The page generator will make a new folder and starter files for you, all ready to go.

Generating a new page is great if you're just doing client-side code because they quick to create, and lets you keep your sketches separate.