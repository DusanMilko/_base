$ = require('jquery');
globals = require('./app/globals');
basic = require('./app/basic');
scrollTo = require('./app/scroll-to');
hamburger = require('./app/hamburger');
docs_side_nav = require('./app/docs-side-nav');

globals();
basic();
scrollTo();
hamburger();
docs_side_nav();

o(plugins);