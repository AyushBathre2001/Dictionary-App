const mean = document.getElementById("mean")
const meanbox = document.getElementsByClassName("meaning")[0]
const cancel = document.getElementById("cancel")
const search = document.getElementById("mean")
const input = document.getElementById("word")
const save = document.getElementById("savebutt")
const myvoc = document.getElementsByClassName("myvoc")[0]
const local = document.getElementsByClassName("content2")[0]
const myvocbutton = document.getElementById("saved")


myvocbutton.addEventListener('click',()=>{
    myvoc.style.display = "flex"
    local.innerHTML = ""
    for (let i = 0; i < localStorage.length; i++) {
        let newele = document.createElement("div")
        newele.classList.add('section')
        newele.innerHTML = `<h4>${localStorage.key(i)}:</h4><p>${localStorage.getItem(localStorage.key(i))}</p>`
        local.append(newele)
    }
})

const getword = async (word) => {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    let data = await response.json()
    return data
}

const main2 = async (word) => {
    let clutter = ''
    let d = await getword(word)
    let arr = d[0].meanings[0].definitions
    arr.forEach(element => {
        clutter += `<h4>${element.definition}</h4>`
    });

    document.querySelector(".content").innerHTML = `<h1>${word}</h1> ${clutter}`

    save.addEventListener('click',()=>{
        localStorage.setItem(word,arr[0].definition)
        meanbox.style.display = "none"
    })

}

search.addEventListener('click',()=>{
    meanbox.style.display = "flex"
    let w = input.value
    main2(w)
    input.value = ""
})

cancel.addEventListener('click',()=>{
    meanbox.style.display = "none"
})

cancel2.addEventListener('click',()=>{
    myvoc.style.display = "none"
})

