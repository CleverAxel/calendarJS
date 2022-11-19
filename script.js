const DATE = new Date();
const TABLE = document.querySelector(".calendar");
createRowWeekDaysName();
createRowWeekDaysNumber(DATE);

function createRowWeekDaysNumber(currentDate){
    let daysInMonth = howManyDaysInMonth(DATE.getMonth(), DATE.getFullYear());
    let cloneDate = new Date(currentDate.getTime());
    cloneDate.setDate(1);
    let firstDayOfMonth = cloneDate.getDay();

    /**
     * Je recherche le premier jour du mois.
     * Cette condition sert à modifier l'OFFSET mis en place par les américains pour eux le premier
     * jour de la semaine(donc == 0) est le dimanche, donc je remets le lundi à == 0.
     */
    if(firstDayOfMonth == 0){
        firstDayOfMonth = 6;
    }else{
        firstDayOfMonth--;
    }
    let counterDay = 1;

    while(counterDay <= daysInMonth){
        let tr = document.createElement("tr");

        if(counterDay == 1){
            for(let i = 0; i < 7; i++){
                let td = document.createElement("td");
                if(i >= firstDayOfMonth){
                    td.innerText = counterDay.toString();
                    counterDay++;
                }
                tr.appendChild(td);
            }
        }else{
            for(let i = 0; i < 7; i++){
                let td = document.createElement("td");
                if(counterDay <= daysInMonth){
                    td.innerText = counterDay.toString();
                }
                tr.appendChild(td);
                counterDay++;
            }
        }

        TABLE.appendChild(tr);
    }
}

function createRowWeekDaysName(){
    const WEEK_DAYS_NAME = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    let tr = document.createElement("tr");
    for(let i = 0; i < WEEK_DAYS_NAME.length; i++){
        let td = document.createElement("td");
        td.innerText = WEEK_DAYS_NAME[i];
        tr.appendChild(td);
    }
    TABLE.appendChild(tr);
}


function howManyDaysInMonth(month, year){
    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
        return 31;
    }
    if(month == 3 || month == 5 || month == 8 || month == 10){
        return 30;
    }
    if(month == 1 && ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)){
        return 29;
    }
    return 28;
}