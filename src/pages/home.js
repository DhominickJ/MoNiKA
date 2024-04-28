import records from "./records"

export default function home() {
    document.getElementById('name')
        .innerHTML = 'Sumi~'

    const data = document.getElementById('query')

    // Specifying the buttons
    const button = document.getElementById('submit-query')

    button.addEventListener('click', records.newQueryAdd)
    return data
}