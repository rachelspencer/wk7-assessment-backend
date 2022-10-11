
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const form = document.querySelector("form")
const goalsContainer = document.getElementById("goals-container")

const baseURL = `http://localhost:4000/api/goals`

const goalsCallback = ({ data: goals}) => displayGoals(goals)
const errCallback = err => console.log(err.response.data)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const addGoal = body => axios.post(baseURL, body).then(goalsCallback).catch(errCallback)
const removeGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallback).catch(errCallback)
const crossGoal = (id) => axios.put(`${baseURL}/${id}`).then(goalsCallback).catch(errCallback)

const submitHandler = (event) => {
    event.preventDefault()

    const goal = document.getElementById('add-goal')
    const bodyObj = { goal: goal.value }

    addGoal(bodyObj)

    goal.value = ''
}

const createGoalCard = (goal) => {
    const goalCard = document.createElement('div')
    goalCard.classList.add('goal-card')

    goalCard.innerHTML = `
        <p class="goal-title, ${goal.isComplete ? 'goal-completed' : 'goal-incomplete'}">${goal.title}</p>
        <div class='btns-container'>
            <button onclick="crossGoal(${goal.id})">cross off</button>
            <button onclick="removeGoal(${goal.id})">delete</button>
        </div>
    `
    goalsContainer.appendChild(goalCard)
}

const displayGoals = (arr) => {
    console.log('updated array:', arr);
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++){
        createGoalCard(arr[i])
    }
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitHandler) 