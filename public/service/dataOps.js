myApp.service('dataOps', function() {
   
    var self = this;

    this.saveData = function(name,dob,email,pass,empId){
        var dobArr = dob.split("/");
        var connectionId = empId.trim()
        var personObj = {
            name,
            dob : dobArr,
            email,
            connectionId
        }

        var credentialObj = {
            email,
            pass
        }
        var oldPersonData = self.getData() || [];
        var oldCredentialData = self.getCredentialData() || [];
        oldPersonData.push(personObj);
        self.setDBData('data', JSON.stringify(oldPersonData));
        oldCredentialData.push(credentialObj);
        self.setDBData('credentials', JSON.stringify(oldCredentialData));
    }

    this.getDBdata = function(storageKey){
        let listOfPersons = null;
        let data = localStorage.getItem(storageKey);
        if(data){
            listOfPersons = JSON.parse(data);
        }
        return listOfPersons;
    }

    this.setDBData = function(storageKey, data){
        if(storageKey){
            localStorage.setItem(storageKey, data);    
        }
    }

    this.getData = function(){
        return self.getDBdata('data');
    }

    this.getCredentialData = function(){
        return self.getDBdata('credentials');
    }
    
    this.saveListData = function(dataList,credentialList){
        self.setDBData('data', JSON.stringify(dataList));
        self.setDBData('credentials', JSON.stringify(credentialList));
    }
});