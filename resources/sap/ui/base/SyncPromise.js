/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t=new i(function(t,n){t()});function n(t,n,e){var i;function r(t){if(!i){i=true;e(t)}}function u(t){if(!i){i=true;n(t)}}try{t(u,r)}catch(t){r(t)}}function e(t){return t&&(typeof t==="function"||typeof t==="object")&&"then"in t}function i(t){var r=false,u,f,o,c,s=this;function h(t){c=t;u=-1;if(!r&&i.listener){i.listener(s,false)}if(f){f(t);f=o=null}}function l(t){var r;if(t===s){h(new TypeError("A promise cannot be resolved with itself."));return}if(t instanceof i){if(t.isFulfilled()){l(t.getResult());return}else if(t.isRejected()){t.caught();h(t.getResult());return}else{t.caught();t=t.getResult()}}u=0;c=t;if(e(c)){try{r=c.then}catch(t){h(t);return}if(typeof r==="function"){n(r.bind(c),l,h);return}}u=1;if(o){o(c);f=o=null}}this.caught=function(){if(!r){r=true;if(i.listener&&this.isRejected()){i.listener(this,true)}}};this.getResult=function(){return c};this.isFulfilled=function(){return u===1};this.isPending=function(){return!u};this.isRejected=function(){return u===-1};n(t,l,h);if(u===undefined){c=new Promise(function(t,n){o=t;f=n});c.catch(function(){})}}i.prototype.catch=function(t){return this.then(undefined,t)};i.prototype.finally=function(t){if(typeof t==="function"){return this.then(function(n){return i.resolve(t()).then(function(){return n}).unwrap()},function(n){return i.resolve(t()).then(function(){throw n}).unwrap()})}return this.then(t,t)};i.prototype.then=function(t,n){var e=this.isFulfilled()?t:n,r=typeof e==="function",u=this.isPending(),f=this;if(u||r){this.caught()}if(!u){return r?new i(function(t,n){t(e(f.getResult()))}):this}return i.resolve(this.getResult().then(t,n))};i.prototype.toString=function(){if(this.isPending()){return"SyncPromise: pending"}return String(this.getResult())};i.prototype.unwrap=function(){this.caught();if(this.isRejected()){throw this.getResult()}return this.getResult()};i.all=function(t){return new i(function(n,i){var r=false,u=0;function f(){if(r&&u===0){n(t)}}t=Array.prototype.slice.call(t);t.forEach(function(n,r){if(n!==t[r+1]&&e(n)){u+=1;n.then(function(e){do{t[r]=e;r-=1}while(r>=0&&n===t[r]);u-=1;f()},function(t){i(t)})}});r=true;f()})};i.isThenable=function(t){try{return!!e(t)&&typeof t.then==="function"}catch(t){return false}};i.reject=function(t){return new i(function(n,e){e(t)})};i.resolve=function(n){if(n===undefined){return t}if(n instanceof i){return n}return new i(function(t,e){t(n)})};return i},true);