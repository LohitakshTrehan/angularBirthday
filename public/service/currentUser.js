myApp.service('currentUser', ['dataOps', function(dataOps) {
    var self = this;
    this.setCurrentUser = function(email,pass){
        var currrentUserObj = {
            email,
            pass
        }
        localStorage.setItem("currentUser",JSON.stringify(currrentUserObj));
    }

    this.unsetCurrentUser = function(){
        localStorage.setItem("currentUser","");
    }

    this.getCurrentUser = function(){
        let currentUser = null;
        var data =  dataOps.getDBdata("currentUser")
        //localStorage.getItem("currentUser");
        if(data){
            currentUser = data;
        }
        return JSON.parse(currentUser);
    }

    this.getCurrentUserName = function(){
        let data = dataOps.getData();
        let name = "";
        if(data){
            for(let person of data){
                if(person.email === self.getCurrentUser().email){
                    name = person.name;
                }
            }
        }
        return name;
    }

    this.getCurrentUserIndex = function (email) {
        let data = dataOps.getData();
        let currUserIndex = 0;
        if(data){
            for(let person of data){
                if(person.email === self.getCurrentUser().email){
                    break;
                }
                currUserIndex++;
            }
        }
        return currUserIndex;    
    }
}])