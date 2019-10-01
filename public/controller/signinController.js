myApp.controller("signinController",['$scope','dataOps','currentUser','$state',function($scope,dataOps,currentUser,$state){
    $scope.err = {
        emailError:false,
        emailNotFound:false,
        wrongCredentials:false
    }
    window.signInButtonClickHandler = (event)=>{
        event.preventDefault();
        $scope.err = {
            emailError:false,
            emailNotFound:false,
            wrongCredentials:false
        }
        let email = $scope.login_email;
        let pass = $scope.login_pass;
        email = email + "@iongroup.com"
        let data = dataOps.getCredentialData() || {};
        let currentUserLogin = null;
        let emailNotFound = true;
        if(Object.keys(data).length>0){
            for(let user of data){
                if(user.email === email){
                    currentUserLogin = user;
                    emailNotFound = false;
                }
            }
        }
        if(emailNotFound){
            $scope.err.emailError=true;
            $scope.err.emailNotFound = true;
        }
        else{
            //userExists
            if(currentUserLogin.pass === pass){
                //set currentUser, redirect to home page
                currentUser.setCurrentUser(currentUserLogin.email,currentUserLogin.pass)
                $state.go('home'); 
            }
            else{
                $scope.err.wrongCredentials=true;
            }
        }
        $scope.$apply();
    }

}])
