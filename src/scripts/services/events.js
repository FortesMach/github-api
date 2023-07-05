import { baseUrl, eventsQuantity } from "/src/scripts/variables.js"

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}${userName}/events?per_page=${eventsQuantity}`)
    //console.log(response.json())
    return await response.json()
}

export { getEvents }