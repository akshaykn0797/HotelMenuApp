export const storeTokens = (data) => {
    localStorage.setItem("authenticaton", JSON.stringify(data))
}

export const getTokens = () => {
    return JSON.parse(localStorage.getItem("authenticaton"))
}