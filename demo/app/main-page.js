var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
    
    page.bindingContext.init();
}
exports.onNavigatingTo = onNavigatingTo;
