let question_block=document.querySelector('.question-block')
let answer_block=document.querySelectorAll(".answer")
let container_main=document.querySelector('.main')
let container_start=document.querySelector('.start')
let container_h3=container_start.querySelector('h3')
let start_btn=document.querySelector('.start-btn')

let cookie = false
let cookies = document.cookie.split('; ')

for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split('=')[0] == 'numbers_high_score') {
        cookie = cookies[i].split('=')[1]
        break
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

let signs=['+','-','*','/']
function getRandomSigns(){
    return signs[randint(0,3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
  return array;
}
if (cookie) {
    let data = cookie.split('/')
    container_h3.innerHTML = `<h3>Минулого разу ви дали ${data[1]} правильних відповідей із ${data[0]}. Точність - ${Math.round(data[1] * 100 / data[0])}%.</h3>`
}

class Question{
    constructor(){
        let a=randint(1,30)
        let b=randint(1,30)
        let sign=getRandomSigns()
        this.question=`${a} ${sign} ${b}`
        if (sign=='+'){
            this.correct=a+b
        }else if(sign=='-'){
            this.correct=a-b
        }else if(sign=='*'){
            this.correct=a*b
        }else if(sign=='/'){
            this.correct=Math.round(a/b)
        }
        
        this.answers=[
            randint(this.correct-15,this.correct-1),
            randint(this.correct-15,this.correct-1),
            randint(this.correct+15,this.correct+1),
            randint(this.correct+15,this.correct+1),
            this.correct,
        ]
        shuffle(this.answers)
    }
    display(){
        question_block.innerHTML=this.question
        for (let i=0;i<answer_block.length;i+=1){
            answer_block[i].innerHTML=this.answers[i]
        }
    }
}

let total_answers_given=0
let correct_answers_given=0
let current_question=new Question()
current_question.display()

start_btn.addEventListener('click',function(){
    current_question=new Question()
    current_question.display()
    container_main.style.display="flex"
    container_start.style.display='none'
    


setTimeout(function(){
    let new_cookie = `numbers_high_score=${total_answers_given}/${correct_answers_given}; max-age=10000000000`
    document.cookie = new_cookie
    container_main.style.display="none"
    container_start.style.display='flex'
    container_h3.innerHTML=`<h3>Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}.Точність - ${Math.round(correct_answers_given*100/total_answers_given)}.</h3>`
},10000)
})

for (let i=0;i<answer_block.length;i+=1){
    answer_block[i].addEventListener('click',function(){
        if (answer_block[i].innerHTML==current_question.correct){
            correct_answers_given+=1
            answer_block[i].style.background='#00FF00'
            anime({
                targets:answer_block[i],
                background:'#FFFFFF',
                duration:500,
                delay:100,
                easing:'linear'
            })

        }else{
            answer_block[i].style.background='#FF0000'
            anime({
                targets:answer_block[i],
                background:'#FFFFFF',
                duration:500,
                delay:100,
                easing:'linear'
            })
        }
        total_answers_given+=1
        current_question=new Question()
        current_question.display()
    })
}
