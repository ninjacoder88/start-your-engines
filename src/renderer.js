$().ready(function(){

    // function ViewModel(){
    //     const self = this;
    //     self.applications = ko.observableArray([]);

    //     self.addApplication = function(){
    //         self.applications.push({applicationName: "Test"});
    //     };
    // }

    const applications = [];

    document.getElementById("addApplication").addEventListener("click", function(){
        applications.push({launch: true, applicationName: "test"});
    });

    

    // ViewModel.prototype.handleEvent = function(event){
    //     switch(event.type){
    //         case "change":
    //             this.change(this.element.value);
    //     }
    // };

    // ViewModel.prototype.change = function(value){
    //     this.data = value;
    //     this.element.value = value;
    // };

    //ko.applyBindings(new ViewModel(), document.getElementById("application"));
});