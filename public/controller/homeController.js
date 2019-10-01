// $( "#BirthDate" ).datepicker();
myApp.controller("homeController", ['$scope', 'dataOps', 'currentUser', '$state', 'dateOps', function ($scope, dataOps, currentUser, $state, dateOps) {
    $scope.err = {
        name_err: false,
        dob_err: false,
        empid_err: false,
        pass_err: false,
        cpass_err: false,
        wrap_name: false,
        wrap_input: false,
        wrap_pass: false
    }
    
    $("#BirthDate").datepicker();
    $scope.checkLoggedIn = function () {
        let curr_user = currentUser.getCurrentUser();
        if (curr_user === null) {
            $state.go('signin')
        }
        else {
            let valid_user = false;
            let data = dataOps.getCredentialData();
            if (data !== null) {
                for (let user of data) {
                    if (user.email === curr_user.email) {
                        if (curr_user.pass === user.pass) {
                            valid_user = true;
                        }
                    }
                }
            }
            if (!valid_user) {
                $state.go('signin')
            }
        }
    }
    
    if(currentUser.getCurrentUser() !== null)
        $scope.userName = currentUser.getCurrentUserName();

    $scope.logoutFun = function () {
        currentUser.unsetCurrentUser();
        $state.go('signin');
    }

    $scope.seeIfBorn = function (bornOn) {
        if (bornOn === "" || bornOn===undefined)
            return false;
        var today = new Date();
        var getYear = today.getFullYear();
        bornOn = bornOn.split("/");
        if (parseInt(bornOn[2]) < getYear) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.editProfileFun = function () {
        let currPersonData = null;
        let currPersonIndex = null;
        $scope.checkLoggedIn();
        let currPerson = currentUser.getCurrentUser();
        currPersonIndex = currentUser.getCurrentUserIndex(currPerson.email)
        let data = dataOps.getData();
        currPersonData = data[currPersonIndex];
        $scope.Name = currPersonData.name;
        $scope.BirthDate = "" + currPersonData.dob[0] + "/" + currPersonData.dob[1] + "/" + currPersonData.dob[2];
        $scope.empId = currPersonData.connectionId;
        $scope.Email = currPersonData.email;
    }

    $scope.validate = function validate() {
        $scope.err = {
            name_err: false,
            dob_err: false,
            empid_err: false,
            pass_err: false,
            cpass_err: false,
            wrap_name: false,
            wrap_input: false,
            wrap_pass: false
        }
        //NO VALIDATION TEST FOR 29, 30, 31 FEB OR ANY OTHER INVALID DATE FOR A MONTH OR AN IMPROPER MONTH ARE CODED, IN CASE ERROR, DEFAULT DATE = 1, DEFAULT MONTH = 1
        var isValid = true;
        var letters = /^[A-Za-z]+$/;
        var empIdPattern = /^C\-[0-9]+$/;
        var dob = $scope.BirthDate
        let name = $scope.Name
        let name_value = ""
        if (name !== undefined && name !== null && name !== "")
            name_value = name.trim();
        var nameArr = [];
        if (name_value.length > 0)
            nameArr = name_value.split(" ");
        else {
            isValid = false;
            //apply errors here
            $scope.err.wrap_name = true;
            $scope.err.name_err = true;
        }
        var empId = $scope.empId;
        var pass = $scope.pass;
        var confirm_pass = $scope.confirm_pass;
        if (nameArr.length > 0) {
            for (let i = 0; i < nameArr.length; i++) {
                if (nameArr[i].match(letters) === null) {/////////////////////
                    $scope.err.wrap_name = true;
                    $scope.err.name_err = true;
                    isValid = false;
                    break;
                }
            }
        }

        var isBorn = $scope.seeIfBorn(dob);///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (!isBorn || empId === null || empId === undefined || empId.match(empIdPattern) === null) {/////////////////////
            $scope.err.wrap_input = true;
            isValid = false;
            if (!isBorn) {
                $scope.err.dob_err = true;
            }
            if (empId === null || empId === undefined || empId.match(empIdPattern) === null) {
                $scope.err.empid_err = true;
            }
        }
        if (pass===undefined || pass==="" || pass.length < 5) {/////////////////////////////
            $scope.err.wrap_pass = true;
            isValid = false;
            $scope.err.pass_err = true;
        }
        else {
            if (pass !== confirm_pass) {
                $scope.err.wrap_pass = true;
                isValid = false;
                $scope.err.cpass_err = true;
            }
        }
        return isValid;
    }

    $scope.saveProfileFun = function () {
        let name = $scope.Name
        let name_value = ""
        if (name !== undefined && name !== null && name !== "")
            name_value = name.trim();
        let dob = $scope.BirthDate;
        let pass = $scope.pass;
        let empId = $scope.empId;
        let isValid = $scope.validate();
        if (isValid) {
            //update credential data, person data, current user data
            let currPersonIndex = null;
            $scope.checkLoggedIn();
            let currPerson = currentUser.getCurrentUser();
            currPersonIndex = currentUser.getCurrentUserIndex(currPerson.email)
            let data = dataOps.getData();
            data[currPersonIndex].name = name_value;
            data[currPersonIndex].dob = dob.split('/')
            data[currPersonIndex].connectionId = empId.trim()
            let credentialData = dataOps.getCredentialData();
            credentialData[currPersonIndex].pass = pass;
            dataOps.saveListData(data, credentialData);
            let currUser = currentUser.getCurrentUser();
            currentUser.setCurrentUser(currUser.email, pass)
            $state.go("home");
        }
    }

    $scope.buildMainList = function () {
        let data = dataOps.getData();
        for (let person of data) {
            var clonedNode = document.getElementById("card-template").cloneNode(true);
            clonedNode.setAttribute("id", "")
            clonedNode.style["display"] = "block"
            let outerDiv = clonedNode.children[0];
            //update person name
            outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
            //update person DOB
            outerDiv.getElementsByClassName("person-dob")[0].innerText = dateOps.humanFriendlyDate(person.dob);
            //update person connection link
            outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click", () => {
                window.open('https://connect.iongroup.com/person/' + person.connectionId, 'Connection Profile', 'height=900,width=1000')
            });
            //update person team link
            outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:" + person.email);
            document.getElementById("list_all_bday").appendChild(clonedNode);
        }


        let todayDate = new Date();
        let dateArr = [todayDate.getMonth() + 1, todayDate.getDate(), todayDate.getFullYear];
        document.getElementById("todays-date").innerHTML = dateOps.humanFriendlyDate(dateArr);


        for (let person of data) {
            if (dateOps.isToday(person.dob)) {
                var clonedNode = document.getElementById("card-template").cloneNode(true);
                clonedNode.setAttribute("id", "")
                clonedNode.style["display"] = "block"
                let outerDiv = clonedNode.children[0];
                //update person name
                outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
                //update person DOB
                outerDiv.getElementsByClassName("person-dob-prepend")[0].style["display"] = "none"
                //update person connection link
                outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click", () => {
                    window.open('https://connect.iongroup.com/person/' + person.connectionId, 'Connection Profile', 'height=900,width=1000')
                });
                //update person team link
                outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:" + person.email);
                document.getElementById("list_today_bday").appendChild(clonedNode);
            }
        }
        for (let person of data) {
            if (dateOps.isUpcoming(person.dob)) {
                var clonedNode = document.getElementById("card-template").cloneNode(true);
                clonedNode.setAttribute("id", "")
                clonedNode.style["display"] = "block"
                let outerDiv = clonedNode.children[0];
                //update person name
                outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
                //update person DOB
                outerDiv.getElementsByClassName("person-dob")[0].innerText = dateOps.humanFriendlyDate(person.dob);
                //update person connection link
                outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click", () => {
                    window.open('https://connect.iongroup.com/person/' + person.connectionId, 'Connection Profile', 'height=900,width=1000')
                });
                //update person team link
                outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:" + person.email);
                document.getElementById("list_upcoming_bday").appendChild(clonedNode);
            }
        }
    }
    $scope.checkLoggedIn();
    $scope.buildMainList();
}]);