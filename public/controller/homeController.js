// $( "#BirthDate" ).datepicker();
myApp.controller("signinController",['$scope','dataOps','currentUser','$state','dateOps',function($scope,dataOps,currentUser,$state,dateOps){
    $( "#BirthDate" ).datepicker();
    $scope.checkLoggedIn = function(){
        let curr_user = currentUser.getCurrentUser();
        if(curr_user===null){
            $state.go('signin')
        }
        else{
            let valid_user = false;
            let data = dataOps.getCredentialData();
            if(data !== null){
                for(let user of data){
                    if(user.email === curr_user.email){
                        if(curr_user.pass === user.pass){
                            valid_user = true;
                        }
                    }
                }
            }
            if(!valid_user){
                $state.go('signin')
            }
        }
    }
    $scope.checkLoggedIn();
    $scope.userName = currentUser.getCurrentUserName();
    $scope.logoutFun = function () {
        currentUser.unsetCurrentUser();
        $state.go('signin');
    }

    $scope.editProfileFun = function(){
        let currPersonData = null;
        let currPersonIndex = null;
        $scope.checkLoggedin();
        let currPerson = currentUser.getCurrentUser();
        currPersonIndex = currentUser.getCurrentUserIndex(currPerson.email)
        let data = dataOps.getData();
        currPersonData = data[currPersonIndex];
        $scope.Name = currPersonData.name;
        $scope.BirthDate = ""+currPersonData.dob[0]+"/"+currPersonData.dob[1]+"/"+currPersonData.dob[2];
        $scope.empId = currPersonData.connectionId;
        $scope.Email = currPersonData.email;
    }

    $scope.saveProfileFun = function () {
        let name = $scope.Name
        let name_value = ""
        if(name!==undefined && name!==null && name!=="")
            name_value = name.trim();
        let dob = $scope.BirthDate;
        let pass = $scope.pass;
        let empId = $scope.empId;
        let isValid = validate(name_node,dob_node,pass_node,empId_node);
        if(isValid){
            //update credential data, person data, current user data
            let currPersonIndex = null;
            checkLoggedin();
            let currPerson = getCurrentUser();
            currPersonIndex = getCurrentUserIndex(currPerson.email)
            let data = getData();
            data[currPersonIndex].name = name_value;
            data[currPersonIndex].dob = dob.split('/')
            data[currPersonIndex].connectionId = empId.trim()
            let credentialData = getCredentialData();
            credentialData[currPersonIndex].pass = pass;
            saveListData(data,credentialData);
            let currUser = getCurrentUser();
            setCurrentUser(currUser.email,pass)
            window.location.href = "http://"+window.location.host+"/home.html"
        }
    }
}])