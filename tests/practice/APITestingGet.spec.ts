import {test, request} from "@playwright/test";
import { runInNewContext } from "vm";

let reqContext2;
test.beforeAll("Before All the Test",async()=>{

     reqContext2 = await request.newContext({
        baseURL : "https://restful-booker.herokuapp.com"
      })

})
  

test("API testing get practice 1",async({request})=>{
const resp1 = await request.get("https://restful-booker.herokuapp.com/booking");

console.log(await resp1.json());


})

test("API testing get practice 2",async({})=>{

const reqContext = await request.newContext({

    baseURL : "https://restful-booker.herokuapp.com"
})

const resp1 = await reqContext.get("/booking");

console.log(await resp1.json());

})

test("API testing get practice 3",async({})=>{

const resp1 = await reqContext2.get("/booking");

console.log(await resp1.json());


})
test("API testing Get Practice 4", async({request})=>{
    const resp1 = await request.get("/booking");
    console.log(await resp1.json());
}
)
test("API testing Get Practice 5", async({request})=>{
    const resp1 = await request.get("/booking/2104");
    console.log(await resp1.json());
}
)