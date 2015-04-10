# Angular Epic editor directive

forked from https://github.com/programmieraffe/angular-editors/blob/master/editors/epiceditor/index.html

## Install with Bower

`bower install e154/angular-epiceditor --save`

## How to Use

Add `ui.epiceditor` to the list of dependencies in your Angular.JS application:

```javascript
var app = angular.module('app', ['ui.epiceditor']);
```

## In view

```html
<textarea id="epiceditor" ui:epic-editor ng-model="post.content.preview" content-filtered="post.content.preview_filtered"></textarea>
```

## Help

need help for optimise this directive...
