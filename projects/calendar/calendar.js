class Calendar {

    constructor(td) {
        this.td = td;
    }

    _getDays(year = new Date().getFullYear(), month = new Date().getMonth()) {

        let date = new Date(year, month);
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();
        let firstDay = new Date(Date.UTC(currentYear, currentMonth, 1)).getDay();
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        return { firstDay: firstDay, daysInMonth: daysInMonth };
    }


    _deactiveEmptyBlock() {
        for (let i of this.td) {
            if (!(+i.textContent)) {
                i.classList.add('hide');
            }
        }
    }

    _showDays(fDay, lDay) {

        let firstMonthDay = 1;

        for (let i = fDay; i < lDay + fDay; i++) {
            this.td[i].textContent = firstMonthDay++;
        }
    }

    _reloadTable() {
        for (let i of this.td) {
            if (!i.classList.contains('hide')) {
                i.textContent = '';
            } else if (i.classList.contains('hide')) {
                i.classList.remove('hide');
            }
        }
    }

    _calendarController() {

        let dateStr = document.querySelector('.cal-controller-date');
        let dayWeekStr = document.querySelector('.cal-controller-day-week');
        let selectorYear = document.getElementById('selectYear');
        let selectMonth = document.getElementById('selectMonth');
        let showButton = document.getElementById('showButton');
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let dateBuffer = {
            yearBuff: new Date().getFullYear(),
            monthBuff: new Date().getMonth()
        };

        let monthName = new Date().toLocaleString('en', { month: 'long' });

        const dateController = () => {

            //show this date

            let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let dayNumber = new Date().getDay();
            let dayMonth = new Date().getDate();

            dayWeekStr.textContent = daysWeek[dayNumber];

            monthName = new Date().toLocaleString('en', { month: 'long' });

            dateStr.textContent = dayMonth + ' ' + monthName;

            selectorYear.addEventListener('change', (e) => {
                dateBuffer.yearBuff = e.target.value;
            })

            selectMonth.addEventListener('change', (e) => {
                dateBuffer.monthBuff = e.target.value;
            })

            showButton.addEventListener('click', (e) => {

                year = +dateBuffer.yearBuff;
                month = +dateBuffer.monthBuff;

                let dateInfo = this._getDays(year, month);

                this._reloadTable();
                this._showDays(dateInfo.firstDay, dateInfo.daysInMonth);
                this._deactiveEmptyBlock();

                //show this day

                this.td.forEach((day) => {
                    if (year === new Date().getFullYear() && month === new Date().getMonth()) {
                        if (+day.textContent === new Date().getDate()) {
                            day.classList.add('this-day');
                        }
                    } else {
                        day.classList.remove('this-day');
                    }
                })
            })
        }

        const daysController = () => {
            this.td.forEach((day) => {

                //show this day

                if (year === new Date().getFullYear()) {
                    if (+day.textContent === new Date().getDate()) {
                        day.classList.add('this-day');
                    }
                }

                day.addEventListener('click', (e) => {
                    let td = e.target;

                    if (td.classList.contains('hide')) return;

                    let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    let dayNumber = new Date(+year, +month, +td.textContent).getDay();

                    dayWeekStr.textContent = daysWeek[dayNumber];
                    monthName = new Date(year, month).toLocaleString('en', { month: 'long' });
                    dateStr.textContent = td.textContent + ' ' + monthName;
                })
            })
        }

        dateController();
        daysController();
    }


    //run calendar

    run() {
        let dateInfo = this._getDays();

        this._reloadTable();
        this._showDays(dateInfo.firstDay, dateInfo.daysInMonth);
        this._deactiveEmptyBlock();

        this._calendarController();
    }
}