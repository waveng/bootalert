# bootalert 
**bootalert** is a Javascript library for non-blocking notifications. jQuery is required. The goal is to create a simple core library that can be customized and extended.
based on [toastr](https://github.com/CodeSeven/toastr) Modify

[Build Status](https://github.com/waveng/bootalert)
Browser testing provided by BrowserStack.

## Install

#### [NuGet Gallery](http://nuget.org/packages/bootalert)
```
Install-Package bootalert
```

#### [Bower](http://bower.io/search/?q=bootalert)
```
bower install bootalert
```

#### [npm](https://www.npmjs.com/package/bootalert)
```
npm install --save bootalert
```

#### [Ruby on Rails](https://github.com/tylergannon/bootalert-rails)
```ruby
# Gemfile

gem 'bootalert-rails'
```

```coffee
# application.coffee

#= require bootalert
```

```scss
// application.scss

@import "bootalert";
```

## Breaking Changes

#### Animation Changes
The following animations options have been deprecated and should be replaced:

 - Replace `options.fadeIn` with `options.showDuration`
 - Replace `options.onFadeIn` with `options.onShown`
 - Replace `options.fadeOut` with `options.hideDuration`
 - Replace `options.onFadeOut` with `options.onHidden`

## Quick Start

### 3 Easy Steps

1. Link to bootalert.css `<link href="bootalert.css" rel="stylesheet"/>`

2. Link to bootalert.js `<script src="bootalert.js"></script>`

3. use bootalert to display a bootalert for info, success, warning or error
	```js
	// Display an info bootalert with no title
	bootalert.info('Are you the 6 fingered man?')
	```

### Other Options
```js
// Display a warning bootalert, with no title
bootalert.warning('My name is Inigo Montoya. You killed my father, prepare to die!')

// Display a success bootalert, with a title
bootalert.success('Have fun storming the castle!', 'Miracle Max Says')

// Display an error bootalert, with a title
bootalert.error('I do not think that word means what you think it means.', 'Inconceivable!')

// Immediately remove current bootalerts without using animation
bootalert.remove()

// Remove current bootalerts using animation
bootalert.clear()

// Override global options
bootalert.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000})
```

### Escape HTML characters
In case you want to escape HTML characters in title and message

	bootalert.options.escapeHtml = true;

### Close Button
Optionally enable a close button
```js
bootalert.options.closeButton = true;
````

Optionally override the close button's HTML.

```js
bootalert.options.closeHtml = '<button><i class="icon-off"></i></button>';
```

You can also override the CSS/LESS for `#bootalert-container .bootalert-close-button`

Optionally override the hide animation when the close button is clicked (falls back to hide configuration).
```js
bootalert.options.closeMethod = 'fadeOut';
bootalert.options.closeDuration = 300;
bootalert.options.closeEasing = 'swing';
```

### Display Sequence
Show newest bootalert at bottom (top is default)
```js
bootalert.options.newestOnTop = false;
```

### Callbacks
```js
// Define a callback for when the bootalert is shown/hidden/clicked
bootalert.options.onShown = function() { console.log('hello'); }
bootalert.options.onHidden = function() { console.log('goodbye'); }
bootalert.options.onclick = function() { console.log('clicked'); }
bootalert.options.onCloseClick = function() { console.log('close button clicked'); }
```

### Animation Options
bootalert will supply default animations, so you do not have to provide any of these settings. However you have the option to override the animations if you like.

#### Easings
Optionally override the animation easing to show or hide the bootalerts. Default is swing. swing and linear are built into jQuery.
```js
bootalert.options.showEasing = 'swing';
bootalert.options.hideEasing = 'linear';
bootalert.options.closeEasing = 'linear';
```

Using the jQuery Easing plugin (http://www.gsgd.co.uk/sandbox/jquery/easing/)
```js
bootalert.options.showEasing = 'easeOutBounce';
bootalert.options.hideEasing = 'easeInBack';
bootalert.options.closeEasing = 'easeInBack';
```

#### Animation Method
Use the jQuery show/hide method of your choice. These default to fadeIn/fadeOut. The methods fadeIn/fadeOut, slideDown/slideUp, and show/hide are built into jQuery.
```js
bootalert.options.showMethod = 'slideDown';
bootalert.options.hideMethod = 'slideUp';
bootalert.options.closeMethod = 'slideUp';
```

### Prevent Duplicates
Rather than having identical bootalerts stack, set the preventDuplicates property to true. Duplicates are matched to the previous bootalert based on their message content.
```js
bootalert.options.preventDuplicates = true;
```

### Timeouts
Control how bootalert interacts with users by setting timeouts appropriately. Timeouts can be disabled by setting them to 0.
```js
bootalert.options.timeOut = 30; // How long the bootalert will display without user interaction
bootalert.options.extendedTimeOut = 60; // How long the bootalert will display after a user hovers over it
```


### Progress Bar
Visually indicate how long before a bootalert expires.
```js
bootalert.options.progressBar = true;
```

### rtl
Flip the bootalert to be displayed properly for right-to-left languages.
```js
bootalert.options.rtl = true;
```

## Building bootalert

To build the minified and css versions of bootalert you will need [node](http://nodejs.org) installed. (Use Homebrew or Chocolatey.)

```
npm install -g gulp karma-cli
npm install
```

At this point the dependencies have been installed and you can build bootalert

- Run the analytics `gulp analyze`
- Run the test `gulp test`
- Run the build `gulp`

## Contributing

For a pull request to be considered it must resolve a bug, or add a feature which is beneficial to a large audience.

Pull requests must pass existing unit tests, CI processes, and add additional tests to indicate successful operation of a new feature, or the resolution of an identified bug.

Requests must be made against the `develop` branch. Pull requests submitted against the `master` branch will not be considered.

All pull requests are subject to approval by the repository owners, who have sole discretion over acceptance or denial.

## Authors
**John Papa**

+ [http://twitter.com/John_Papa](http://twitter.com/John_Papa)

**Tim Ferrell**

+ [http://twitter.com/ferrell_tim](http://twitter.com/ferrell_tim)

**Hans Fjällemark**

+ [http://twitter.com/hfjallemark](http://twitter.com/hfjallemark)

## Credits
Inspired by https://github.com/Srirangan/notifer.js/.

## Copyright
Copyright © 2012-2015

## License
bootalert is under MIT license - http://www.opensource.org/licenses/mit-license.php
