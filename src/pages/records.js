import home from "./home";

export default function records() {

    
    const queue = document.getElementById('past-queries-list');

    const data = home

    function newQueryAdd(event) {
        event.preventDefault()


        const new_queue = document.createElement(li);

        new_queue.textContent = data;

        queue.appendChild(new_queue);
    }
    
}