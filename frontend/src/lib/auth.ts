export async function login (email:string, password: string){
    const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST", //post sends data or performs an action
    headers: { "Content-Type": "application/json"}, //tells the server how to interpret the body 
    body: JSON.stringify({email,password}), //we have to convert it to a string because the browser cannot send an object. it must send a string or binary data 
    });


    if (!res.ok) throw new Error(await res.text());
    const token = await res.text(); //res.text returns the body of the response. the token in this case

    localStorage.setItem("token", token); //create a browser storage entry called token and then store token inside of it so it persists across page reloads. 
    return token; //saves time for our first execution of recieving the token
}




export async function register (email:string, password: string){
    const res = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST", //post sends data or performs an action
    headers: { "Content-Type": "application/json"}, //tells the server how to interpret the body 
    body: JSON.stringify({email,password}), //we have to convert it to a string because the browser cannot send an object. it must send a string or binary data 
    });


    if (!res.ok) throw new Error(await res.text());

    return login(email, password);
}



export function logout() {
    localStorage.removeItem("token"); //removes JWT after user logs out. 
  }