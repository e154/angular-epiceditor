(function(){
    'use strict';

    angular
        .module('ui.epiceditor', [])
        .directive('uiEpicEditor', function(){
            return {
                replace: true,
                scope: {'contentFiltered': "=", 'ngModel': "="},
                template:'<div class="epic-editor"></div>',
                link: function(scope, element, attrs, ngModel) {

                    var opts = {
                        container: element.get(0),
                        textarea: null,
                        basePath: '/admin/static/private/bower_components/EpicEditor/epiceditor',
                        clientSideStorage: false,
                        localStorageName: 'epiceditor',
                        useNativeFullscreen: true,
                        parser: marked,
                        file: {
                            name: 'epiceditor',
                            defaultContent: '',
                            autoSave: 100
                        },
                        theme: {
                            base: '/themes/base/epiceditor.css',
                            preview: '/themes/preview/preview-dark.css',
                            editor: '/themes/editor/epic-dark.css'
                        },
                        button: {
                            preview: true,
                            fullscreen: true,
                            bar: "auto"
                        },
                        focusOnLoad: true,
                        shortcut: {
                            modifier: 18,
                            fullscreen: 70,
                            preview: 80
                        },
                        string: {
                            togglePreview: 'Toggle Preview Mode',
                            toggleEdit: 'Toggle Edit Mode',
                            toggleFullscreen: 'Enter Fullscreen'
                        },
                        autogrow: {
                            minHeight: 350,
                            maxHeight: false,
                            scroll: true
                        }
                    };

                    var editor = new EpicEditor(opts);

                    editor.load(function () {

                        var iFrameEditor = editor.getElement('editor');

                        // we get body dom element, because this is contenteditable=true
                        // http://stackoverflow.com/questions/6256342/trigger-an-event-when-contenteditable-is-changed
                        var contents = $('body',iFrameEditor).html();
                        $('body',iFrameEditor).blur(function() {
                            if (contents!=$(this).html()){
                                contents = $(this).html(); // set to new content
                                editor.save(); // important!
                                scope.contentFiltered = editor.exportFile(null, 'html', false);
                                scope.ngModel = editor.exportFile();
                                scope.$apply();
                            }
                        });
                    });

                    // Editor unloaded
                    scope.$on('$destroy', function (event, next, current) {
                        editor.unload(function () {
                            //...
                        });
                    });

                    scope.$watch('ngModel', function (newValue, oldValue) {
                        editor.importFile('content', newValue);
                    });
                }
            }
        });
}());