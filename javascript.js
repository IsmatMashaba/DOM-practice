//get the button
const addUserBtn=document.getElementById('add-user');
const main = document.getElementById('main');
const doubleMoneyBtn =document.getElementById('double');
const showMillionaire=document.getElementById('show-millionaires');
const sortUser=document.getElementById('sort');
const getTotal=document.getElementById('calculate-wealth');
/*user array*/
let userData = [];

const url=`https://randomuser.me/api/`

/*fetch the data*/
async function getUserData() {
    const response = await axios.get(url);
  const data=await response.data;
   /* console.log(data)*/
    const user=data.results[0];

    /*shape user including making balance*/

    const newUser = {
        name: user.name.first,
        balance: Math.floor(Math.random() * 1000000),
    }

    /*push the newUser in the userData array*/
    userData.push(newUser)


    /*display newUser to screen*/
    displayUserInformation(userData)

}
/*function to display user name and balance*/
function displayUserInformation(userData){
    /*target the whole div*/
    main.innerHTML=`<h2><strong>Person</strong> Balance($)</h2>`
    userData.map((item) => {
        /*create a div*/
        const element = document.createElement('div');
        element.innerHTML = `Name: ${item.name} Balance: ${item.balance}`
        /*append element to main div*/
        main.append(element)
    })

}
/*function to double the balance*/
function doubleBalance(){
    /*the the user balance and multiply by 2*/
   const result = userData.map((item)=>{
       /*here we only want to change the balance so we use spread operator*/
        return {...item,balance:item.balance*2}
    })
    /*display the double*/
    displayUserInformation(result)
}

/*function to show millionaire*/
function showMillionaires(){
   const result= userData.filter((item)=>item.balance>500000);
   displayUserInformation(result)

}
/*function to sort*/
function sortByBalance(){
    userData.sort((a,b)=>b.balance-a.balance)
    displayUserInformation(userData)

}
/*function to get total balance*/
function getTotalBalance(){
    const result =userData.reduce(
        ((accumulator, currentValue) => accumulator+currentValue.balance),0
    );
    const totalElement=document.createElement('div')
    totalElement.innerHTML=`<h3>Total: ${result}</h3>`;
    /*assign it inside the main div*/
    main.appendChild(totalElement);

}


addUserBtn.addEventListener('click',getUserData);
doubleMoneyBtn.addEventListener('click',doubleBalance);
showMillionaire.addEventListener('click',showMillionaires);
sortUser.addEventListener('click',sortByBalance);
getTotal.addEventListener('click',getTotalBalance)