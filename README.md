# BASE
Documentation using Foundation, Gulp

All the files you edit go into **src** and compiles into **build**

---
## Setup

NPM is required to be installed.

Run `npm install` after clone to download gulp and other required modules.

---
### Tasks:

**gulp build** - cleans and builds everything into build folder

**gulp clean** - cleans build folder

**gulp css** - compile scss to css

**gulp js** - compile js with browserify

**gulp assemble** - generate all pages

**gulp fonts** - move fonts to build folder

**gulp todo** - go through and generate todo's based off of comments "//TODO:"

**gulp watch** - look for changes in src/pages|scss|js

**gulp iconfont** - generate icon font

---
### Folder Structure

```
└── src
  ├── assets
  │    ├── fonts
  │    ├── icons
  │    │   ├── _icon-font.css (icon font template)
  │    │   └── svgs
  │    │        └── *.svg
  │    ├── imgs
  │    │   └── *.*
  │    ├── sprites
  │    │   └── *.png
  │    ├── js
  │    │   ├── libs
  │    │   ├── app
  │    │   ├── templates
  │    │   └── main.js
  │    └── scss
  │        ├── libs
  │        ├── partials
  │        ├── elements
  │        ├── modules
  │        ├── pages
  │        ├── theme
  │        ├── main.scss
  │        └── _*.scss
  ├── data
  │   └── *.{json,yml}
  ├── helpers
  │   └── *.js
  └── views
      ├── docs
      │   └── *.{hbs,html,php}
      ├── partials
      │   └── *.{hbs,html,php}
      ├── layouts
      │   └── default.{hbs,html,php}
      └── pages
          └── index.{hbs,html,php}
```

---
### Pages

All the files in **pages** folder are used to generate static pages.

These files in pages should contain the core content of the page.

The layout files will contain the major layout and are referenced to by front matter(more on that below)

Pages can also load partials anywhere in the page


##### Front matter

Pages can use YAML front matter as shown below or call a variable from a data.json file in the **data** folder, for things like the layout.

```
---
layout: 'default'
title: 'site'
arr:
- {"a":"b"}
---

this.arr.[0] // {"a","b"}

```

##### Loading partial

```
{{>nav }}

with current front matter
{{>nav this}}

with custom variable
{{>nav key="value"}}

with global data variable
{{>nav site}}

with custom json
{{#parseJSON '{
  "a": "b",
  "c": "d"
}'}}
{{> nav }}
{{/parseJSON}}

{{#parseJSON '{"name": "John", "age": "1"}'}}
    {{> partial title="TITLE" desc=../site.desc person=this}}
{{/parseJSON}}

```

---
### Foundation

This project uses the Foundation grid, block grid and visibility classes. Other Foundation elements are available but not being pulled in, edit the "_foundation.scss" file in "src/assets/scss/libs/".

The grid has between tweaked to a 24 column grid for more versatility and with more media breakpoints.

---
### SCSS

All scss goes into "src/assets/scss/" 

All scss goes into "src/assets/scss/libs"  

The "_global.scss" file contains some utility classes

---
### JS

Using Browserify for JS

All js goes into "src/assets/js/app"
Refrence js in the main.js file located in "src/assets/js/" 

All libraries goes into "src/assets/js/libs"  

If you do any js templating put that into "src/assets/js/templates/"

---
### Fonts

Fonts go into "src/assets/fonts/"

The current build comes with Google's Roboto font

---
### Icon Font

Put svg files into "src/assets/icons" 
Then run **gulp iconfont** to generate font and matching scss file

Once the icon font is generated uncomment the import of "icon-font" in the main.scss file

