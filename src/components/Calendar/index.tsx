import React, { Component } from 'react'


import './index.css'


interface IProps{
    years: number[],
    monthNames: string[],
    weekDaysNames: string[],
    updateTasks: Function
}

// interface IDate{
//     day: Date,
//     active: boolean
// }

// class Data<IDate>{
//     day: Date;
//     active: boolean;
//     constructor(day:Date, active:boolean){
//         this.day = day;
//         this.active = active;
//     }
//     get numberOfDay(): number{
//         return this.day.getDay();
//     }
// }
interface IDate{
    day: number,
    active: boolean,
    selected?: boolean
}

interface IState{
    currentYear: number,
    currentMonth: number,
    currentDay: number,
    selectedDate?: number
}


let years: number[] = [];
for(let i = 1900; i<3001; i++)
    years.push(i);


function getDays(year: number, month: number){
    let dayOfWeek = new Date(year, month, 1).getDay();
    let lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    let lastDayOfMonth = new Date(year, month+1, 0).getDate();
    if(dayOfWeek===0) dayOfWeek = 6;
    else dayOfWeek--;
    let weeks: IDate[][] = [];
    let week: IDate[] = []
    let date = 1;
    for(let j = dayOfWeek-1; j>=0; j--){
        week.push({day: lastDayOfPrevMonth-j, active: false});
    }
    for(let i = dayOfWeek; i<7; i++, date++){
        week.push({day: date, active: true});
    }
    weeks.push(week);
    let active = true;
    for(let i = 1; i<6; i++){
        week = [];
        for(let j = 0; j<7; j++, date++){
            if(date > lastDayOfMonth){
                date = 1;
                active = false;
            }
            week.push({day: date, active});
        }
        weeks.push(week);
    }
    return weeks;
}


export default class Calendar extends Component<IProps> {
    
    static defaultProps: IProps = {
        years,
        monthNames: ["Январь", 
                     "Февраль", 
                     "Март", 
                     "Апрель",
                     "Май",
                     "Июнь",
                     "Июль",
                     "Август",
                     "Сентябрь",
                     "Октябрь",
                     "Ноябрь",
                     "Декабрь",],
        weekDaysNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', ],
        updateTasks: function(){return false}
    }

    state: IState = {
        currentYear: new Date(Date.now()).getFullYear(),
        currentMonth: new Date(Date.now()).getMonth(),
        currentDay: new Date(Date.now()).getDate()
    }


    onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        const index = e.target.options.selectedIndex;
        this.setState({
            currentMonth: index
        });
    }

    onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        const index = e.target.options.selectedIndex;
        const year = e.target.options[index].value;
        this.setState({
            currentYear: year
        });
    }

    onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
        const {currentYear, currentMonth, currentDay} = this.state;
        let newState: IState = {currentYear, currentMonth, currentDay}
        if((e.target as any).value==="back"){
            if(currentMonth!==0){
                newState.currentMonth--;
            }
            else{
                newState.currentMonth = 11;
                newState.currentYear--;
            }
        }
        else if ((e.target as any).value === "next"){
            if(currentMonth!==11){
                newState.currentMonth++;
            }
            else{
                newState.currentMonth = 0;
                newState.currentYear++;
            }
        }
        else if ((e.target as any).value === "today"){
            console.log("here");
            newState.currentMonth = new Date(Date.now()).getMonth();
            newState.currentYear = new Date(Date.now()).getFullYear();
        }
        this.setState(newState);
    }

    onTdClick = (e: React.MouseEvent<HTMLElement>) =>{
        const {currentMonth, currentYear} = this.state;
        const currentDay = (e.target as any).innerHTML;
        const date = new Date(currentYear, currentMonth, currentDay);
        this.props.updateTasks(date, true);
        this.setState({selectedDate: currentDay})
    }

    getTd = (day: IDate, index: number) => {
        const today = new Date(Date.now());
        let td: any;
        if (day.active){
            if(day.day === today.getDate() && this.state.currentMonth === today.getMonth() && this.state.currentYear === today.getFullYear()){
                td = <td onClick = {this.onTdClick} className = "today" key ={index}>{day.day}</td>
            }
            else {
                td = <td onClick = {this.onTdClick} key ={index}>{day.day}</td>
            }
        }
        else{
            td = <td onClick = {this.onTdClick} className = "inactive" key ={index}>{day.day}</td>
        }
        return td;
    }

    render() {

        const {years, monthNames, weekDaysNames} = this.props;
        const {currentYear, currentMonth, currentDay} = this.state;

        const weeks = getDays(currentYear, currentMonth);

        return (
        <div className="calendar">
                <header>
                    {/* it's header of calendar */}
                    {
                        currentYear>1900||currentMonth>0?
                            <button value = "back" onClick = {this.onButtonClick}>{'<'}</button>
                            :
                            <button disabled value = "back" onClick = {this.onButtonClick}>{'<'}</button>
                    }


                    <select onChange = {this.onChangeMonth}>
                        {monthNames.map((name, index) => index===currentMonth?
                            <option selected = {true} key = {name} value = {index}>{name}</option>
                            :
                            <option key = {name} value = {index}>{name}</option>
                        )}
                    </select>


                    <button onClick = {this.onButtonClick} name = "today" value = "today">X</button>
                    

                    <select onChange = {this.onChangeYear}>
                        {years.map((year) => year===currentYear?
                            <option selected = {true} key = {year} value = {year}>{year}</option>
                            :
                            <option key = {year} value = {year}>{year}</option>
                        )}
                    </select>
                    

                    {
                        currentYear<3001||currentMonth<11?
                            <button value = "next" onClick = {this.onButtonClick}>{'>'}</button>
                            :
                            <button disabled value = "next" onClick = {this.onButtonClick}>{'>'}</button>
                    }
                </header>
                <div className="temp">
                    <table>
                        <thead>
                            <tr>
                                {weekDaysNames.map((name, index) =>
                                    <td key = {index}>{name}</td>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                             {weeks.map((week, index) => 
                                <tr key = {index}>
                                    {week.map((day, index) =>
                                        this.getTd(day, index)
                                    )}
                                </tr>
                            )}
                        
                        </tbody>
                    </table>
                </div>
        </div>
        )
    }
}
