const full_date = new Date(Date());
const date = full_date.getDate();
const month = full_date.getMonth();
const day = full_date.getDay();

const months = [
    'января', 
    'февраля', 
    'марта', 
    'апреля', 
    'мая', 
    'июня', 
    'июля', 
    'августа', 
    'сентября', 
    'октября', 
    'ноября', 
    'декабря'
]

const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
]

let m;
let d;

const get_month = () => {
    for (let i=0; i<12; i++) {
        if (month === i) {
            m = months[i];
        }
    }

    return m;
}

const get_day = () => {
    for (let i=0; i<7; i++) {
        if (day === i) {
           d = days[i];
        }
    }

    return d;
}

get_month();
get_day();

console.log(`Сегодня ${d}, ${date} ${m}`);
