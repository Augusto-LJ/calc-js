const buttons = document.querySelectorAll("#buttons-container button")

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            console.log(value);
        } else {
            console.log("Op: " +value);
        }
    })
})