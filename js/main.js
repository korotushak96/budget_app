let start = document.querySelector('#start'),
    budget = document.querySelector('.budget-value'),
    daybudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalExpenses = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthsavings = document.querySelector('.monthsavings-value'),
    yearsavings = document.querySelector('.yearsavings-value'),
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkbox = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    percent = document.querySelector('.choose-percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value'),
    buttons = document.getElementsByTagName('button');
    
    let money, time 

    for(let i=0; i<buttons.length-1; i++){
        buttons[i].disabled = true;
    }

start.addEventListener('click', function(){
    for(let i=0; i<buttons.length-1; i++){
        buttons[i].disabled = false;
    }

    money = +prompt('Ваш бюджет на месяц?');
    time = prompt('Введите дату в формате YYYY-MM-DD');
    while (isNaN(money) || money=='' || money == null){
        money = +prompt('Ваш бюджет на месяц?');
    }
    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click',  function(){
    let sum = 0;

    for (let i=0; i<expensesItem.length; i++){
        console.log(i);
        let expense = expensesItem[i].value,
        expenseCost = expensesItem[++i].value;
        if (typeof (expense) != null && typeof(expenseCost) !=null && expense.length<=50){
            console.log('all is fine');
            appData.expenses[expense] = expenseCost;
            sum += +expenseCost;
        } else {
            console.log('wrong answer');
            i=i-1;
        }
        
    }
    appData.expense = sum;
    expenses.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function (){
    for (let i=0; i< optionalExpensesItem.length;i++){
        let answer = optionalExpensesItem[i].value;
        appData.optionalExpenses[i]=answer;
        optionalExpenses.textContent += answer + ' ';
    }
} );

countBudgetBtn.addEventListener('click', function(){
    if (!appData.budget){
        level.textContent = 'write your budget!'
        return;
    }

    appData.moneyPerDay = (appData.budget-appData.expense)/30;
    daybudget.textContent = appData.moneyPerDay.toFixed(2);
    
    if (appData.moneyPerDay<5){
        level.textContent='low';
    } else if (appData.moneyPerDay<10){
        level.textContent='normal';
    } else if (appData.moneyPerDay>=10){
        level.textContent='good';
    } else {
        level.textContent='error';
    }
})

chooseIncome.addEventListener('input', function(){
    let items = chooseIncome.value; 
    income.textContent = items;   
    appData.income = items.split(', ');
})

checkbox.addEventListener('click', function(){
    if(appData.savings){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
})

chooseSum.addEventListener('input', function(){
    if(!appData.savings) {
        chooseSum.value = '0';
        percent.value = '0';
        return;
    } 

        let save = +chooseSum.value,
            per = +percent.value;
        
        appData.monthIncome= save/100/per;
        appData.yearIncome= save/100/12*per;
        monthsavings.textContent = appData.monthIncome;
        yearsavings.textContent = appData.yearIncome;
})

percent.addEventListener('input', function(){
    if(!appData.savings) {
        chooseSum.value = '0';
        percent.value = '0';
        return;
    } 

        let save = +chooseSum.value,
            per = +percent.value;
        
        appData.monthIncome= save/100/per;
        appData.yearIncome= save/100/12*per;
        monthsavings.textContent = appData.monthIncome;
        yearsavings.textContent = appData.yearIncome;
})

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: '',
    detectDayBudget: function(){
        
        alert('Ваш доход на день' + appData.moneyPerDay);
    },
    detectLevel: function(){
        
    },
    checkSavings: function (){
        if (appData.savings){
            let save = +prompt('Какая сума накоплений');
            let percent = +prompt('Под какой процент');
            ;
            alert ('Доход в месяц от депозита: ' + percent)
        }
    },
    chooseOptExpenses: '',
    chooseIncome: function(){
        let items = prompt('Что еще принесет доход, перечислите через запятую');
        while (!items){
            items = prompt('Что еще принесет доход, перечислите через запятую');
        }
        appData.income = items.split(', ');
    },
    incomes: function(){
        this.income.forEach((item, value)=> alert('способ зароботка №' + (value+1) + ' это ' + item))
    },
    ourData: function(){
        let allData = [];
        for(let key in appData){
            allData.push(key);
        }
        alert('we have data like' + allData);
    }
};


    
                
    
                
                
                
                