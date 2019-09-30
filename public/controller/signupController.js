myApp.controller("signupController",['$scope',function($scope){
    $( "#BirthDate" ).datepicker();
    document.getElementById("RegisterPerson").addEventListener('click',function(event){
        event.preventDefault();
        //start registering the person and look for inline error marking
        let name_value = $scope.Name.trim();
        let dob = $scope.BirthDate;
        let empId = $scope.empId;
        let enteredEmail = $scope.Email;
        let pass = $scope.pass;
        $scope.show_error = {
            name:false,
            dob:false,
            empId:false,
            email:false,
            pass:false,
            cpass:false
        }
        var isValid = validate(name_value,dob,empId,enteredEmail,pass);
    });
}])

function validate(name_value,dob,empId,enteredEmail,pass){

    //NO VALIDATION TEST FOR 29, 30, 31 FEB OR ANY OTHER INVALID DATE FOR A MONTH OR AN IMPROPER MONTH ARE CODED, IN CASE ERROR, DEFAULT DATE = 1, DEFAULT MONTH = 1

    var letters = /^[A-Za-z]+$/;
    var email = /^[A-Za-z0-9]+(?:[\.][A-Za-z0-9]+)*$/
    var empIdPattern = /^[0-9]+$/;
    var nameArr = name_value.split(" ");
    var confirm_pass = $scope.confirm_pass;
    var isValid = false;
    var err = 0;
    //chnage using join
    for(let i=0;i<nameArr.length;i++){
        if(nameArr[i].match(letters)===null){
            document.getElementById("wrap_name").setAttribute("class","mb-1");
            $scope.show_error.name = true;
            //document.getElementById("err_name").style["display"]="inline";
            isValid = false;
            err = 1;
            break;
        }
    }

    if(err===0){
        document.getElementById("wrap_name").setAttribute("class","mb-3");
        $scope.show_error.name = false;
        //document.getElementById("err_name").style["display"]="none";
    }
    var isBorn = seeIfBorn(dob);
    if( !isBorn || empId.match(empIdPattern)===null){
        document.getElementById("wrap_input").setAttribute("class","mb-1 d-flex flex-row");
        isValid = false;
        if(!isBorn){
            dob_node.classList.remove("is-valid")
            dob_node.classList.add("is-invalid")
            document.getElementById("err_birth").style["display"]="inline";
        }
        if(empId.match(empIdPattern)===null){
            empId_node.classList.remove("is-valid")
            empId_node.classList.add("is-invalid")
            document.getElementById("err_empId").style["display"]="inline";
        }
    }
    if(isBorn && empId.match(empIdPattern)!==null){
        document.getElementById("wrap_input").setAttribute("class","mb-3 d-flex flex-row");
    }
    if(isBorn){
        dob_node.classList.remove("is-invalid")
        dob_node.classList.add("is-valid")
        document.getElementById("err_birth").style["display"]="none";
    }
    if(empId.match(empIdPattern)!==null){
        empId_node.classList.remove("is-invalid")
        empId_node.classList.add("is-valid")
        document.getElementById("err_empId").style["display"]="none";
    }
    
    if(enteredEmail.match(email)===null){
        document.getElementById("email-input-wrapper").setAttribute("class","mb-1");
        email_node.classList.remove("is-valid")
        email_node.classList.add("is-invalid")
        document.getElementById("err_email").style["display"]="inline";
        isValid = false;
    }
    else{
        document.getElementById("email-input-wrapper").setAttribute("class","mb-3");
        email_node.classList.remove("is-invalid")
        email_node.classList.add("is-valid")
        document.getElementById("err_email").style["display"]="none";
    }

    if(pass.length<5){
        document.getElementById("wrap_pass").setAttribute("class","mb-1 d-flex flex-row");
        isValid = false;
        pass_node.classList.remove("is-valid")
        pass_node.classList.add("is-invalid")
        document.getElementById("err_pass").style["display"]="inline";

        confirm_pass_node.classList.remove("is-valid")
        confirm_pass_node.classList.remove("is-invalid")
        document.getElementById("err_cpass").style["display"]="none";
    }
    else{
        pass_node.classList.remove("is-invalid")
        pass_node.classList.add("is-valid")
        document.getElementById("err_pass").style["display"]="none";
        if(pass!==confirm_pass){
            document.getElementById("wrap_pass").setAttribute("class","mb-1 d-flex flex-row");
            confirm_pass_node.classList.remove("is-valid")
            confirm_pass_node.classList.add("is-invalid")
            document.getElementById("err_cpass").style["display"]="inline";
            isValid = false;
        }
        else{
            document.getElementById("wrap_pass").setAttribute("class","mb-3 d-flex flex-row");
            confirm_pass_node.classList.remove("is-invalid")
            confirm_pass_node.classList.add("is-valid")
            document.getElementById("err_cpass").style["display"]="none";
        }
    }
    if(emailExists(enteredEmail)){
        document.getElementById("email-input-wrapper").setAttribute("class","mb-1");
        email_node.classList.remove("is-valid")
        email_node.classList.add("is-invalid")
        document.getElementById("err_email_exists").style["display"]="inline";
        isValid = false;
    }
    else{
        document.getElementById("email-input-wrapper").setAttribute("class","mb-3");
        email_node.classList.remove("is-invalid")
        email_node.classList.add("is-valid")
        document.getElementById("err_email_exists").style["display"]="none";
    }
    return isValid;
}

function seeIfBorn(bornOn){
    if(bornOn==="")
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

function emailExists(email){
    var persons = getData()
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