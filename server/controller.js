//addGoal
let goals = []
let globalID = 1

const getCompliment = (req, res) => {
    const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
        
     // choose random compliment
    let randomIndexCompliment = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndexCompliment];
        
    res.status(200).send(randomCompliment);
}
 
const getFortune = (req, res) => {
    const fortunes = ["Your pet is plotting to eat you.", "A family secret will surface. Dolores Umbridge is your aunt.", "Dont. Panic.", "The secret of life is kn&hsngk)ywn4n2ln*&b2KN.", "Kanye will give you a pair of his shoes."];

    // choose random fortune
    let randomIndexFortune = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndexFortune];

    res.status(200).send(randomFortune);
}

const createGoal = (req, res) => {
    const title = req.body.goal;
    goals.push({
        title,
        id: globalID,
        isComplete: false,
    });
    globalID++;
    res.status(200).send(goals);
}

const deleteGoal = (req, res) => {
    const { id } = req.params; 
    for(let i = 0; i < goals.length; i++){
      if(goals[i].id === +id){
        goals.splice(i, 1);
        return res.status(200).send(goals);
      }
    }
    res.status(400).send(goals);
  }

  const updateGoal = (req, res) => {
    const { id } = req.params;
    const goalIndex = goals.findIndex(goal => +goal.id === +id)
    goals[goalIndex].isComplete = true
        
    return res.status(200).send(goals)
}

module.exports = {
    getCompliment,
    getFortune,
    createGoal,
    deleteGoal,
    updateGoal
};