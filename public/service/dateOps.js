myApp.service('dateOps', function() {

    var self = this;

    this.humanFriendlyDate = function (dateArr) {
        // in form of string array of format mm, dd, yyyy; dont need yyyy
        let integerMonth = parseInt(dateArr[0]);
        let month = "";
        let monthToStringMap = {
            1:'January',
            2:'Feburary',
            3:'March',
            4:'April',
            5:'May',
            6:'June',
            7:'July',
            8:'August',
            9:'September',
            10:'October',
            11:'November',
            12:'December'
        }
        month = monthToStringMap[integerMonth];
        let date = parseInt(dateArr[1])
        let finalString = date+", "+month;
        return finalString;
    }

    this.getTodayDate = function(){
        var today = new Date();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let dateObj = {
            date,
            month,
            year
        }
        return dateObj;
    }
    
    this.isLeapYear = function(year){
        year = parseInt(year)
        if(year%4===0){
            if(year%100===0){
                if(year%400===0){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    }

    this.isToday = function (dateToBeChecked) {
        //input in [mm,dd,yyyy] format
        let today = self.getTodayDate()
        if(today.date === parseInt(dateToBeChecked[1]) && today.month === parseInt(dateToBeChecked[0]))
            return true;
        else
            return false;
    }

    this.isUpcoming = function(dateToBeChecked){
        let calendar = []
        if(self.isLeapYear(self.getTodayDate().year)){
            calendar = [31,31,29,31,30,31,30,31,31,30,31,30];
        }
        else{
            calendar = [31,31,28,31,30,31,30,31,31,30,31,30];
        }
        let remainingDays = 30;
        let date = self.getTodayDate().date
        let month = self.getTodayDate().month % 12;
        let days = calendar[month]
        remainingDays = remainingDays - (days-date)
        let lastDate = {};
        if(remainingDays!==0){
            // roll over to next month, one day subtracts from remaining mnth, so one is subtracted
            month = (month+1)%12;
            date = 1;
            remainingDays = remainingDays - 1;
            if(remainingDays !==0){
                days = calendar[month];
                if(remainingDays - (days-date)>0){
                    remainingDays = remainingDays - (days-date)
                    month = (month+1)%12;
                    date = 1;
                    remainingDays = remainingDays - 1;
                    date+=remainingDays
                    date+=remainingDays;
                    if(month===0)
                        month = 12
                    lastDate = {
                        "date": date,
                        "month": month
                    }
                }
                else{
                    date+=remainingDays;
                    if(month===0)
                        month = 12
                    lastDate = {
                        "date": date,
                        "month": month
                    }
                }
            }
            else{
                if(month===0)
                    month = 12
                lastDate = {
                    "date": date,
                    "month": month
                }
            }
        }
        else{
            date = date + 30
            if(month===0)
                month = 12
            lastDate = {
                "date": date,
                "month": month
            }
        }
        let flag = false;
        if(self.getTodayDate().month <= lastDate.month){
            flag = true;
        }
        if(flag){
            let flag1 = false;
            let flag2 = false;
            if(parseInt(dateToBeChecked[0])>=self.getTodayDate().month){
                flag1 = true;
                if(parseInt(dateToBeChecked[0])===self.getTodayDate().month){
                    if(parseInt(dateToBeChecked[1])<=self.getTodayDate().date)
                        flag1 = false;
                }
            }
            if(parseInt(dateToBeChecked[0])<=lastDate.month){
                flag2 = true;
                if(parseInt(dateToBeChecked[0])===lastDate.month){
                    if(parseInt(dateToBeChecked[1])>lastDate.date)
                        flag2 = false;
                }
            }
            if(flag1 && flag2)
                return true;
            else
                return false;
        }
        else{
            let flag1 = false;
            let flag2 = false;
            if(parseInt(dateToBeChecked[0])>=self.getTodayDate().month){
                flag1 = true;
                if(parseInt(dateToBeChecked[0])===self.getTodayDate().month){
                    if(parseInt(dateToBeChecked[1])<=self.getTodayDate().date)
                        flag1 = false;
                }
            }
            if(parseInt(dateToBeChecked[0])<=lastDate.month){
                flag2 = true;
                if(parseInt(dateToBeChecked[0])===lastDate.month){
                    if(parseInt(dateToBeChecked[1])>lastDate.date)
                        flag2 = false;
                }
            }
            if(flag1 || flag2)
                return true;
            else
                return false;
        }
    }

})
