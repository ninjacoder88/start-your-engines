jQuery(function(){
    // function ViewModel(){
    //     const self = this;
    //     self.applications = ko.observableArray([]);

    //     self.addApplication = function(){
    //         self.applications.push({applicationName: "Test"});
    //     };
    // }

    // ko.applyBindings(new ViewModel(), document.getElementById("application"));

    const applicationTemplate = document.getElementById("applicationTableBody").innerHTML;
    document.getElementById("applicationTableBody").innerHTML = "";

    const applications = [];
    let id = 0;

    document.getElementById("addApplicationButton").addEventListener("click", function(){
        const applicationName = document.getElementById("addApplicationName").value;
        const applicationPath = document.getElementById("addApplicationPath").value;

        if(applicationName === undefined || applicationName === null || applicationName === ""){
            return;
        }

        if(applicationPath === undefined || applicationPath === null || applicationPath === ""){
            return;
        }

        const applicationId = id;
        applications.push({launch: true, applicationName: applicationName, id: applicationId, applicationPath: applicationPath});

        let application = applicationTemplate;
        application = application.replaceAll("__", `_${applicationId}_`);//need to make /g/

        document.getElementById("applicationTableBody").insertAdjacentHTML("beforeend", application);
        document.getElementById(`application_${applicationId}_launch`).value = true;
        document.getElementById(`application_${applicationId}_name`).value = applicationName;
        document.getElementById(`application_${applicationId}_delete`).addEventListener("click", function(){
            //const application = applications.find(a => a.id == applicationId);
            //const index = applications.indexOf(application);
            //applications.splice(index, 1);
        });
        document.getElementById(`application_${applicationId}_moveup`).addEventListener("click", function(){

        });
        document.getElementById(`application_${applicationId}_movedown`).addEventListener("click", function(){

        });

        document.getElementById("addApplicationName").value = "";
        document.getElementById("addApplicationPath").value = "";

        id++;
    });

    document.getElementById("startApplicationsButton").addEventListener("click", function(){
        window.alert("starting applications");
    });
});