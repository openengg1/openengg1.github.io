(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{87:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return c})),t.d(r,"rightToc",(function(){return s})),t.d(r,"default",(function(){return l}));var n=t(2),o=t(6),a=(t(0),t(96)),i={id:"work",title:"resume -> work:",sidebar_label:"work"},c={unversionedId:"resume_schema/work",id:"resume_schema/work",isDocsHomePage:!1,title:"resume -> work:",description:"`yaml",source:"@site/docs/resume_schema/work.md",slug:"/resume_schema/work",permalink:"/docs/resume_schema/work",editUrl:"https://github.com/acrlakshman/profileio/edit/master/docs/docs/resume_schema/work.md",version:"current",sidebar_label:"work",sidebar:"docs",previous:{title:"resume -> basics:",permalink:"/docs/resume_schema/basics"},next:{title:"resume -> education:",permalink:"/docs/resume_schema/education"}},s=[],u={rightToc:s};function l(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),'work:\n  # required\n  label: Experience\n\n  # optional\n  rank: 2\n\n  # required\n  list:\n    - value:\n        # required\n        name: Walt Disney Animation Studios\n        # required\n        location: Burbank, CA\n        # optional\n        brief: ""\n        # required\n        position: Senior Software Engineer\n        # optional\n        url: "https://www.disneyanimation.com/"\n        # optional\n        startDate: "2019" # string (if you want to just enter numbers, enclose it in quotes)\n        # optional\n        endDate: Present  # string (if you want to just enter numbers, enclose it in quotes)\n        active: true\n        # required\n        highlights:\n          - brief: "" # optional\n            detail: This is the sample text written for the demo of profileio\n          - detail: Sample text written as part of the demo for profileio. Sample text written as part of the demo for profileio\n      render: true # required\n')))}l.isMDXComponent=!0},96:function(e,r,t){"use strict";t.d(r,"a",(function(){return p})),t.d(r,"b",(function(){return d}));var n=t(0),o=t.n(n);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),l=function(e){var r=o.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},p=function(e){var r=l(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},f=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(t),f=n,d=p["".concat(i,".").concat(f)]||p[f]||m[f]||a;return t?o.a.createElement(d,c(c({ref:r},u),{},{components:t})):o.a.createElement(d,c({ref:r},u))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=f;var c={};for(var s in r)hasOwnProperty.call(r,s)&&(c[s]=r[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var u=2;u<a;u++)i[u]=t[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);