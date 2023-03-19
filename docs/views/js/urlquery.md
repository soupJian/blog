---
title: url-query-params
date: 2023-03-19
categories:
 - javascript
tags:
 - utils
---
## query
```javascript
function getSearchQuery() {
  return decodeURI(window.location.search)
      .replace('?', '')
      .split('&')
      .map(param => param.split('='))
      .reduce((values, [key, value]) => {
          values[key] = value
          return values
      }, {})
}
```
## params
```javascript
function getSearchParam() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}
```