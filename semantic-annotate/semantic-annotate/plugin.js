/**

 */

var options = {
    autoAccept: false,
    debug: true,
    url: 'http://api.wallscope.co.uk'
};

if (!logger) {
    var logger;
}

logger = options.debug ? console : {
    info: function () { },
    warn: function () { },
    error: function () { },
    log: function () { }
};

// Register the plugin within the editor.
CKEDITOR.plugins.add('semantic-annotate', {
    icons: 'timestamp',
    // The plugin initialization logic goes inside this method.
    init: function (editor) {

        var basepath = '/sites/all/modules/ckeditor/plugins/semantic-annotate';



        CKEDITOR.scriptLoader.load(basepath + '/underscore/underscore-min.js', function (success) {
            logger.info('Underscore loaded: ', success);
            CKEDITOR.scriptLoader.load(basepath + '/backbone/backbone.min.js', function (success) {
                logger.info('Backbone loaded: ', success);
                CKEDITOR.scriptLoader.load(basepath + '/vie/vie.min.js', function (success) {
                    logger.info('Vie loaded: ', success);
                    CKEDITOR.scriptLoader.load(basepath + '/annotate/annotate.js', function (success) {
                        logger.info('Annotate loaded: ', success);
                    });
                });
            });
        });

        // Define the editor command that inserts a timestamp.
        editor.addCommand('insertAnnotations', {

            // Define the function that will be fired when the command is executed.
            exec: function (editor) {

                var text = editor.getData();
                console.log('Executing with text: ' + text);

                text.annotate({
                    vie: vie,
                    // typeFilter: ["http://dbpedia.org/ontology/Place", "http://dbpedia.org/ontology/Organisation", "http://dbpedia.org/ontology/Person"],
                    debug: options.debug,
                    autoAnalyze: true,
                    showTooltip: true,
                    decline: function (event, ui) {
                        logger.info('decline event', event, ui);
                    },
                    select: function (event, ui) {
                        logger.info('select event', event, ui);
                    },
                    remove: function (event, ui) {
                        logger.info('remove event', event, ui);
                    },
                    success: function (event, ui) {
                        logger.info('success event', event, ui);

                        // $(event.target.button).find('.text').html(Drupal.t('Annotate'));
                        // if (options.autoAccept) {
                        //     Drupal.iksce_annotate.acceptAll(event.target);
                        // }
                    },
                    error: function (event, ui) {
                        logger.info('error event', event, ui);
                    }
                });
                logger.log('annotated');

                // Create the toolbar button that executes the above command.
                editor.ui.addButton('Annotate', {
                    label: Drupal.t('Enhance and annotate'),
                    command: 'insertAnnotations',
                    toolbar: 'insert'
                });
            }
        });
    }
});