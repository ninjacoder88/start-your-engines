jQuery(function(){
    function Application(obj){
        const self = this;
        self.applicationName = ko.observable(obj.applicationName);
        self.applicationPath = ko.observable(obj.applicationPath);
        self.enabled = ko.observable(obj.enabled ?? true);
        self.editing = ko.observable(false);

        self.cancel = function(){
            self.editing(false);
        };

        self.edit = function(){
            self.editing(true);
        };

        self.deleteApplication = function(){

        };

        self.moveUp = function(){

        };

        self.moveDown = function(){

        };
    }

    function ViewModel(){
        const self = this;
        self.newApplicationName = ko.observable("");
        self.newApplicationPath = ko.observable("");
        self.applications = ko.observableArray([]);

        self.addApplication = function(){
            if(self.newApplicationName() === "" || self.newApplicationPath() === ""){
                return;
            }

            self.applications.push(new Application({
                    applicationName: self.newApplicationName(),
                    applicationPath: self.newApplicationPath()
                }));
            self.newApplicationName("");
            self.newApplicationPath("");

            const apps = ko.toJSON(self.applications());

            window.electronAPI.saveData(apps);
        };

        self.startApplications = function(){

        };

        function initialize(){
            window.electronAPI.loadData()
                .then(data => {
                    data.forEach(d => {
                        self.applications.push(new Application({applicationName: d.applicationName, applicationPath: d.applicationPath, enabled: d.enabled}));
                    });
                }).catch(error => {

                });
        }

        initialize();
    }

    ko.applyBindings(new ViewModel(), document.getElementById("application"));
});