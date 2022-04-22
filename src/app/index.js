jQuery(function(){
    const ps = new PubSub();

    function PubSub(){
        const self = this;
        self.subscribtions = [];

        self.publish = function(queueName, message){
            const queue = self.subscribtions.find(q => q.queueName === queueName);
            queue.callback(message);
        };

        self.subscribe = function(queueName, callback){
            self.subscribtions.push({queueName: queueName, callback: callback});
        }
    };

    function Application(obj){
        const self = this;
        self.applicationName = ko.observable(obj.applicationName);
        self.applicationPath = ko.observable(obj.applicationPath);
        self.enabled = ko.observable(obj.enabled ?? true);
        self.editing = ko.observable(false);

        self.cancel = function(){
            self.editing(false);
            self.applicationName(obj.applicationName);
            self.applicationPath(obj.applicationPath);
            self.enabled(obj.enabled ?? true);
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

        self.save = function(){
            self.editing(false);

            obj.applicationName = self.applicationName();
            obj.applicationPath = self.applicationPath();
            obj.enabled = self.enabled();

            ps.publish("applicationUpdated");
        };
    }

    function ViewModel(){
        const self = this;
        self.newApplicationName = ko.observable("");
        self.newApplicationPath = ko.observable("");
        self.applications = ko.observableArray([]);

        ps.subscribe("applicationUpdated", function(message){
            saveApplications();
        });

        function saveApplications(){
            const apps = ko.toJSON(self.applications());

            window.electronAPI.saveData(apps);
        }

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
            saveApplications();
        };

        self.startApplications = function(){
            const paths = [];
            self.applications().forEach(app => {
                if(app.enabled() === true){
                    paths.push(app.applicationPath());
                }
            });

            window.electronAPI.startApplications(paths);
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