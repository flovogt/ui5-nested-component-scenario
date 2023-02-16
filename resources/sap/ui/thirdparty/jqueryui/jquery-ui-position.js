/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function(t,i){t.ui=t.ui||{};var e,o=Math.max,l=Math.abs,n=Math.round,f=/left|center|right/,s=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,r=/^\w+/,p=/%$/,c=t.fn.position;function d(t,i,e){return[parseFloat(t[0])*(p.test(t[0])?i/100:1),parseFloat(t[1])*(p.test(t[1])?e/100:1)]}function a(i,e){return parseInt(t.css(i,e),10)||0}function g(t){var i=t[0];if(i.nodeType===9){return{width:t.width(),height:t.height(),offset:{top:0,left:0}}}if(i.window===i){return{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}}if(i.preventDefault){return{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}}if(typeof window.SVGElement!=="undefined"&&i instanceof window.SVGElement||i.useClientRect){var e=i.getBoundingClientRect();return{width:e.width,height:e.height,offset:t.offset()}}return{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}t.position={scrollbarWidth:function(){if(e!==i){return e}var o,l,n=t("<div><div></div></div>"),f=n.children()[0];n[0].style="display:block;position:absolute;width:50px;height:50px;overflow:hidden;";f.style="height:100px;width:auto;";t("body").append(n);o=f.offsetWidth;n.css("overflow","scroll");l=f.offsetWidth;if(o===l){l=n[0].clientWidth}n.remove();return e=o-l},getScrollInfo:function(i){var e=i.isWindow||i.isDocument?"":i.element.css("overflow-x"),o=i.isWindow||i.isDocument?"":i.element.css("overflow-y"),l=e==="scroll"||e==="auto"&&i.width<i.element[0].scrollWidth,n=o==="scroll"||o==="auto"&&i.height<i.element[0].scrollHeight;return{width:n?t.position.scrollbarWidth():0,height:l?t.position.scrollbarWidth():0}},getWithinInfo:function(i){var e=t(i||window),o=!!e[0]&&e[0]===e[0].window,l=!!e[0]&&e[0].nodeType===9;return{element:e,isWindow:o,isDocument:l,offset:(o?null:e.offset())||{left:0,top:0},scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop(),width:o?e.width():e.outerWidth(),height:o?e.height():e.outerHeight()}}};t.fn.position=function(i){if(!i||!i.of){return c.apply(this,arguments)}i=t.extend({},i);var e,p,u,m,w,v,y=typeof i.of==="string"?t(document).find(i.of):t(i.of),W=t.position.getWithinInfo(i.within),b=t.position.getScrollInfo(W),H=(i.collision||"flip").split(" "),x={};v=g(y);if(y[0].preventDefault){i.at="left top"}p=v.width;u=v.height;m=v.offset;w=t.extend({},m);t.each(["my","at"],function(){var t=(i[this]||"").split(" "),e,o;if(t.length===1){t=f.test(t[0])?t.concat(["center"]):s.test(t[0])?["center"].concat(t):["center","center"]}t[0]=f.test(t[0])?t[0]:"center";t[1]=s.test(t[1])?t[1]:"center";e=h.exec(t[0]);o=h.exec(t[1]);x[this]=[e?e[0]:0,o?o[0]:0];i[this]=[r.exec(t[0])[0],r.exec(t[1])[0]]});if(H.length===1){H[1]=H[0]}if(i.at[0]==="right"){w.left+=p}else if(i.at[0]==="center"){w.left+=p/2}if(i.at[1]==="bottom"){w.top+=u}else if(i.at[1]==="center"){w.top+=u/2}e=d(x.at,p,u);w.left+=e[0];w.top+=e[1];return this.each(function(){var f,s,h=t(this),r=h.outerWidth(),c=h.outerHeight(),g=a(this,"marginLeft"),v=a(this,"marginTop"),T=r+g+a(this,"marginRight")+b.width,L=c+v+a(this,"marginBottom")+b.height,P=t.extend({},w),E=d(x.my,h.outerWidth(),h.outerHeight());if(i.my[0]==="right"){P.left-=r}else if(i.my[0]==="center"){P.left-=r/2}if(i.my[1]==="bottom"){P.top-=c}else if(i.my[1]==="center"){P.top-=c/2}P.left+=E[0];P.top+=E[1];if(!t.support.offsetFractions){P.left=n(P.left);P.top=n(P.top)}f={marginLeft:g,marginTop:v};t.each(["left","top"],function(o,l){if(t.ui.position[H[o]]){t.ui.position[H[o]][l](P,{targetWidth:p,targetHeight:u,elemWidth:r,elemHeight:c,collisionPosition:f,collisionWidth:T,collisionHeight:L,offset:[e[0]+E[0],e[1]+E[1]],my:i.my,at:i.at,within:W,elem:h})}});if(i.using){s=function(t){var e=m.left-P.left,n=e+p-r,f=m.top-P.top,s=f+u-c,d={target:{element:y,left:m.left,top:m.top,width:p,height:u},element:{element:h,left:P.left,top:P.top,width:r,height:c},horizontal:n<0?"left":e>0?"right":"center",vertical:s<0?"top":f>0?"bottom":"middle"};if(p<r&&l(e+n)<p){d.horizontal="center"}if(u<c&&l(f+s)<u){d.vertical="middle"}if(o(l(e),l(n))>o(l(f),l(s))){d.important="horizontal"}else{d.important="vertical"}i.using.call(this,t,d)}}h.offset(t.extend(P,{using:s}))})};t.ui.position={fit:{left:function(t,i){var e=i.within,l=e.isWindow?e.scrollLeft:e.offset.left,n=e.width,f=t.left-i.collisionPosition.marginLeft,s=l-f,h=f+i.collisionWidth-n-l,r;if(i.collisionWidth>n){if(s>0&&h<=0){r=t.left+s+i.collisionWidth-n-l;t.left+=s-r}else if(h>0&&s<=0){t.left=l}else{if(s>h){t.left=l+n-i.collisionWidth}else{t.left=l}}}else if(s>0){t.left+=s}else if(h>0){t.left-=h}else{t.left=o(t.left-f,t.left)}},top:function(t,i){var e=i.within,l=e.isWindow?e.scrollTop:e.offset.top,n=i.within.height,f=t.top-i.collisionPosition.marginTop,s=l-f,h=f+i.collisionHeight-n-l,r;if(i.collisionHeight>n){if(s>0&&h<=0){r=t.top+s+i.collisionHeight-n-l;t.top+=s-r}else if(h>0&&s<=0){t.top=l}else{if(s>h){t.top=l+n-i.collisionHeight}else{t.top=l}}}else if(s>0){t.top+=s}else if(h>0){t.top-=h}else{t.top=o(t.top-f,t.top)}}},flip:{left:function(t,i){var e=i.within,o=e.offset.left+e.scrollLeft,n=e.width,f=e.isWindow?e.scrollLeft:e.offset.left,s=t.left-i.collisionPosition.marginLeft,h=s-f,r=s+i.collisionWidth-n-f,p=i.my[0]==="left"?-i.elemWidth:i.my[0]==="right"?i.elemWidth:0,c=i.at[0]==="left"?i.targetWidth:i.at[0]==="right"?-i.targetWidth:0,d=-2*i.offset[0],a,g;if(h<0){a=t.left+p+c+d+i.collisionWidth-n-o;if(a<0||a<l(h)){t.left+=p+c+d}}else if(r>0){g=t.left-i.collisionPosition.marginLeft+p+c+d-f;if(g>0||l(g)<r){t.left+=p+c+d}}},top:function(t,i){var e=i.within,o=e.offset.top+e.scrollTop,n=e.height,f=e.isWindow?e.scrollTop:e.offset.top,s=t.top-i.collisionPosition.marginTop,h=s-f,r=s+i.collisionHeight-n-f,p=i.my[1]==="top",c=p?-i.elemHeight:i.my[1]==="bottom"?i.elemHeight:0,d=i.at[1]==="top"?i.targetHeight:i.at[1]==="bottom"?-i.targetHeight:0,a=-2*i.offset[1],g,u;if(h<0){u=t.top+c+d+a+i.collisionHeight-n-o;if(t.top+c+d+a>h&&(u<0||u<l(h))){t.top+=c+d+a}}else if(r>0){g=t.top-i.collisionPosition.marginTop+c+d+a-f;if(t.top+c+d+a>r&&(g>0||l(g)<r)){t.top+=c+d+a}}}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments);t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments);t.ui.position.fit.top.apply(this,arguments)}}};(function(){var i,e,o,l,n,f=document.getElementsByTagName("body")[0],s=document.createElement("div");i=document.createElement(f?"div":"body");o={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(f){t.extend(o,{position:"absolute",left:"-1000px",top:"-1000px"})}for(n in o){i.style[n]=o[n]}i.appendChild(s);e=f||document.documentElement;e.insertBefore(i,e.firstChild);s.style.cssText="position: absolute; left: 10.7432222px;";l=t(s).offset().left;t.support.offsetFractions=l>10&&l<11;i.innerHTML="";e.removeChild(i)})()})(jQuery);
//# sourceMappingURL=jquery-ui-position.js.map