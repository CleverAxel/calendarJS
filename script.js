const TODAY_DATE = new Date();
const CONTAINER_CALENDAR = document.querySelector(".containerCalendar");
//const TABLE = document.querySelector(".calendar");

let startMonth = 7; //août 7

for(let i = 0; i < 12; i++){
    let dateIncrement = new Date(TODAY_DATE.getFullYear(), startMonth+i, 1);
    let table = document.createElement("table");
    table.classList.add("calendar");
    createRowMonthNameAndFulleYear(dateIncrement, table);
    createRowWeekDaysName(table);
    createRowWeekDaysNumber(dateIncrement, table);
    CONTAINER_CALENDAR.appendChild(table)
}



function createRowWeekDaysNumber(currentDate, tableToAppend){
    let daysInMonth = howManyDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    currentDate.setDate(1);
    let firstDayOfMonth = currentDate.getDay();
    let counterRow = 0;
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

        //si première semaine on attend qu'au soit au bon jour de la semaine pour commencer l'incrémentation
        if(counterDay == 1){
            for(let i = 0; i < 7; i++){
                let td = document.createElement("td");
                if(i >= firstDayOfMonth){

                    currentDate.setDate(counterDay);
                    if(isWeekEnd(currentDate)){
                        td.classList.add("holiday");
                    }
                    
                    if(isEqualsToToday(currentDate)){
                        td.classList.add("today");
                    }

                    td.innerText = counterDay.toString();
                    counterDay++;
                }
                tr.appendChild(td);
            }
        }else{
            for(let i = 0; i < 7; i++){
                let td = document.createElement("td");
                if(counterDay <= daysInMonth){

                    currentDate.setDate(counterDay);
                    if(isWeekEnd(currentDate)){
                        td.classList.add("holiday");
                    }

                    if(isEqualsToToday(currentDate)){
                        td.classList.add("today");
                    }

                    td.innerText = counterDay.toString();
                }
                tr.appendChild(td);
                counterDay++;
            }
        }

        tableToAppend.appendChild(tr);
        counterRow++;
    }
    if(counterRow == 5){
        createAdditionnalEmptyRow(tableToAppend);
    }
}

function createRowMonthNameAndFulleYear(date, tableToAppend, langTag = "fr-BE"){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.setAttribute("colspan", "7");
    td.innerText = new Intl.DateTimeFormat(langTag, {month:"long", year:"numeric"}).format(date).toUpperCase();
    tr.appendChild(td);
    tableToAppend.appendChild(tr);
}

function createRowWeekDaysName(tableToAppend){
    const WEEK_DAYS_NAME = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    let tr = document.createElement("tr");
    for(let i = 0; i < WEEK_DAYS_NAME.length; i++){
        let td = document.createElement("td");
        td.innerText = WEEK_DAYS_NAME[i];
        tr.appendChild(td);
    }
    tableToAppend.appendChild(tr);
}

function isWeekEnd(date){
    return date.getDay() == 0 || date.getDay() == 6;
}

function createAdditionnalEmptyRow(tableToAppend){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    tr.appendChild(td);
    tableToAppend.appendChild(tr);
}

function isEqualsToToday(date){
    return TODAY_DATE.getDate() == date.getDate() && TODAY_DATE.getMonth() == date.getMonth() && TODAY_DATE.getFullYear() == date.getFullYear();
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