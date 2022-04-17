$().ready(function(){

    function ViewModel(){
        const self = this;
        self.applications = ko.observableArray([]);

        self.addApplication = function(){
            self.applications.push({applicationName: "Test"});
        };
    }

    ko.applyBindings(new ViewModel(), document.getElementById("application"));
});