const listner = function (event) {
    const length = this.value.length // this가 textarea가 된다.
    h1.textContent = `글자 수: ${length}`
}

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('textarea')
    const h1 = document.querySelector('h1')

    textarea.addEventListener('keyup', listener)
})