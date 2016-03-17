/**

*/

function loadFiles(object){
    
    var basepath = CKEDITOR.plugins.getPath('semantic-annotate');

    CKEDITOR.scriptLoader.load(basepath + '/underscore/underscore-min.js', function (success) {
        console.log('Underscore loaded: ', success);
        CKEDITOR.scriptLoader.load(basepath + '/backbone/backbone.min.js', function (success) {
            console.log('Backbone loaded: ', success);
            CKEDITOR.scriptLoader.load(basepath + '/vie/vie.min.js', function (success) {
                console.log('Vie loaded: ', success);
                CKEDITOR.scriptLoader.load(basepath + '/annotate/annotate.js', function (success) {
                    console.log('Annotate loaded: ', success);
                    if(typeof object.callback == 'function'){
                        object.callback();
                    }

                });
            });
        });
    });




}
var addCommand = {
    editor:"",
    callback: function addCommand(){

        console.log("files loaded, initialising");

        var options = {
            autoAccept: false,
            debug: true,
            url: 'http://api.wallscope.co.uk',
        };


    // Define the editor command that inserts a timestamp.
    console.log('Gonna add command');
    editor = this.editor;
    editor.addCommand('insertAnnotations', {
        // Define the function that will be fired when the command is executed.
        exec: function (editor) {

            var text = editor.getData();
            console.log('Executing with text: ' + text);

            var vie = new VIE();
            vie.use(new options.vie.StanbolService(options.url));

            text.annotate({
                vie: vie,
                // typeFilter: ["http://dbpedia.org/ontology/Place", "http://dbpedia.org/ontology/Organisation", "http://dbpedia.org/ontology/Person"],
                debug: options.debug,
                autoAnalyze: true,
                showTooltip: true,
                decline: function (event, ui) {
                    console.log('decline event', event, ui);
                },
                select: function (event, ui) {
                    console.log('select event', event, ui);
                },
                remove: function (event, ui) {
                    console.log('remove event', event, ui);
                },
                success: function (event, ui) {
                    console.log('success event', event, ui);
                },
                error: function (event, ui) {
                    console.log('error event', event, ui);
                }
            });
            console.log('annotated');

            // Create the toolbar button that executes the above command.
            editor.ui.addButton('Annotate', {
                label: 'Annotate',
                command: 'insertAnnotations'
                // icon: CKEDITOR.plugins.getPath('semantic-annotate') + 'icon/mybuttonicon.gif'
            });
        }
    });
    console.log('Command added');

  }
}



// Register the plugin within the editor.
CKEDITOR.plugins.add('semantic-annotate', {
    // The plugin initialization logic goes inside this method.
    init: function (editor){
        addCommand.editor = editor;
        loadFiles(addCommand);
    }
});
