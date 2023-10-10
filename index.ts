#!usr/bin/env node 
import inquirer from "inquirer";

let continueTransaction:boolean = true;

type UserType = {
    name:string,
    pin:number,
    balance:number,
}

let user:UserType = {
    name:"rumman touqeer",
    pin:2424,
    balance:20000,

}
const resp = await inquirer.prompt([
    {
        name:"pin",
        message:"Enter a pin",
        type:"number",
    },

])
while(continueTransaction){
console.log("resp:",resp);
if(resp.pin!=user.pin){
    console.log("you have entered wrong pin");
}

else{
    const resp = await inquirer.prompt([
        {
            name:"selectedTypes",
            type:"list",
            message:"select an option",
            choices:["withDraw","fastCash","balanceInquiry"],

        },
        {
            name:"amount",
            type:"list",
            message:"please select an amount",
            choices:[500,1000,2000,3000],
            when(resp){
                return resp.selectedTypes == "fastCash"
            }
        },
        {
            name:"amount",
            type:"number",
            message:"please enter an amount",
            when(resp){
                return resp.selectedTypes == "withDraw"
            }
        },



    ])
    if(resp.selectedTypes == "withDraw"){
    //console.log("selectedTypes",resp);
    let balance = user.balance - resp.amount;
    console.log(`Now your balance is ${balance}`)
    continueTransaction = true;
    const toRepeat = await inquirer.prompt([
        {
            name:"repeat",
            type:"confirm",
            message:"do you want to perform another transaction?"

        }


    ])
    if(toRepeat.repeat == true){
        continueTransaction = true;
    }
    else{
        continueTransaction = false;
    }









    }
    else if(resp.selectedTypes == "balanceInquiry"){
        let balance = user.balance;
        console.log(`Your balance is ${balance}`)
        continueTransaction = true;
    }
    else if(resp.selectedTypes == "fastCash"){
        let balance = user.balance - resp.amoumt;
        console.log(`Now your balance is ${balance}`)
        continueTransaction = false;

    }
    else{

    }

}
};
