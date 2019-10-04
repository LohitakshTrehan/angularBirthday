myApp.controller("signupController",['$scope','dataOps','currentUser','$state',function($scope,dataOps,currentUser,$state){
    $( "#BirthDate" ).datepicker();

    $scope.seeIfBorn = function(bornOn){
        if(bornOn==="" || bornOn === undefined)
            return false;
        var today = new Date();
        var getYear = today.getFullYear();
        bornOn = bornOn.split("/");
        if(parseInt(bornOn[2])<getYear){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.emailExists = function(email){
        var persons = dataOps.getData()
        if(persons===null)
            return false;
        else{
            for(var person of persons){
                if(person.email === email)
                    return true
            }
        }
        return false
    }

    $scope.validate = function(name_value,dob,empId,enteredEmail,pass){

        //NO VALIDATION TEST FOR 29, 30, 31 FEB OR ANY OTHER INVALID DATE FOR A MONTH OR AN IMPROPER MONTH ARE CODED, IN CASE ERROR, DEFAULT DATE = 1, DEFAULT MONTH = 1
    
        var letters = /^[A-Za-z]+$/;
        var email = /^[A-Za-z0-9]+(?:[\.][A-Za-z0-9]+)*$/
        var empIdPattern = /^[0-9]+$/;
        var nameArr = undefined;
        if(name_value!==undefined){
            name_value = name_value.trim();
            nameArr = name_value.split(" ");
        }
        var confirm_pass = $scope.confirm_pass;
        var isValid = true;
        var err = 0;
        //chnage using join
        if(nameArr !== undefined){
            for(let i=0;i<nameArr.length;i++){
                if(nameArr[i].match(letters)===null){
                    document.getElementById("wrap_name").setAttribute("class","mb-1");
                    $scope.show_error.name = true;
                    isValid = false;
                    err = 1;
                    break;
                }
            }
            if(err===0){
                document.getElementById("wrap_name").setAttribute("class","mb-3");
                $scope.show_error.name = false;
            }
        }
        else{
            $scope.show_error.name = true;
            isValid = false;
        }
    
        var isBorn = $scope.seeIfBorn(dob);
        if( !isBorn || empId===undefined || empId.match(empIdPattern)===null){
            document.getElementById("wrap_input").setAttribute("class","mb-1 d-flex flex-row");
            isValid = false;
            if(!isBorn){
                $scope.show_error.dob = true;
            }
            if(empId===undefined || empId.match(empIdPattern)===null){
                $scope.show_error.empId = true;
            }
        }
        if(isBorn && empId!==undefined && empId.match(empIdPattern)!==null){
            document.getElementById("wrap_input").setAttribute("class","mb-3 d-flex flex-row");
        }
        if(isBorn){
            $scope.show_error.dob = false;
        }
        if(empId!==undefined && empId.match(empIdPattern)!==null){
            $scope.show_error.empId = false;
        }
        
        if(enteredEmail===undefined || enteredEmail.match(email)===null){
            document.getElementById("email-input-wrapper").setAttribute("class","mb-1");
            $scope.show_error.email = true;
            isValid = false;
        }
        else{
            document.getElementById("email-input-wrapper").setAttribute("class","mb-3");
            $scope.show_error.email = false;
        }
        if(enteredEmail!==undefined && $scope.emailExists(enteredEmail)){
            document.getElementById("email-input-wrapper").setAttribute("class","mb-1");
            $scope.show_error.email_exist = true;
            isValid = false;
        }
        else{
            document.getElementById("email-input-wrapper").setAttribute("class","mb-3");
            $scope.show_error.email_exist = false;
        }
    
        if(pass===undefined || pass.length<5){
            document.getElementById("wrap_pass").setAttribute("class","mb-1 d-flex flex-row");
            isValid = false;
            $scope.show_error.pass = true;
    
            $scope.show_error.cpass = false;
        }
        else{
            $scope.show_error.pass = false;
            if(confirm_pass===undefined || pass!==confirm_pass){
                document.getElementById("wrap_pass").setAttribute("class","mb-1 d-flex flex-row");
                $scope.show_error.cpass = true;
                isValid = false;
            }
            else{
                document.getElementById("wrap_pass").setAttribute("class","mb-3 d-flex flex-row");
                $scope.show_error.cpass = false;
            }
        }
        return isValid;
    }
    document.getElementById("RegisterPerson").addEventListener('click',function(event){
        event.preventDefault();
        //start registering the person and look for inline error marking
        let name_value = $scope.Name;
        let dob = $scope.BirthDate;
        let empId = $scope.empId;
        let enteredEmail = $scope.Email;
        let pass = $scope.pass;
        $scope.show_error = {
            name:false,
            dob:false,
            empId:false,
            email:false,
            email_exist:false,
            pass:false,
            cpass:false
        }
        var isValid = $scope.validate(name_value,dob,empId,enteredEmail,pass,$scope,dataOps);
        $scope.$apply();
        if(isValid){
            enteredEmail = enteredEmail + "@iongroup.com";
            empId = "C-"+empId
            //save user
            dataOps.saveData(name_value,dob,enteredEmail,pass,empId);
            //save current user
            currentUser.setCurrentUser(enteredEmail,pass);
            $state.go('home')
        }
    });
}])