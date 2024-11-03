let input = document.getElementById('input');
let ul = document.getElementById('list');
let list = [];

// Handle form submission and prevent page reload
function handleSubmit(event) {
    event.preventDefault();
    if (input.value.trim() !== "") { // Check if input is not empty
        handleChange(input.value);
        input.value = ""; // Clear input field
    }
}

function printTask() {
    ul.innerHTML = ''; // Clear the existing tasks before re-rendering

    list.forEach(function (task, index) {
        let li = document.createElement('li');
        li.className = "bg-white px-2 py-1 rounded-md flex flex-row justify-between items-center gap-2";
        li.innerHTML = `
            <div class="flex flex-row items-center gap-2">
                <button class="w-[20px] h-[20px] border-2 rounded-md hover:bg-green-400 ${task.done ? 'bg-green-400 border-green-400 text-white' : 'border-green-400 hover:text-white text-green-400'} check-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>                              
                </button>
            </div>                 
                <div class='${task.done ? 'text-gray-400 line-through line-clamp-1 break-all' : 'line-clamp-1 break-all'}'>
                    ${task.value}
                </div>
            <div class="flex flex-row items-center">
                <button class="w-5 h-5 bg-red-100 text-red-400 border-2 border-red-400 rounded-full hover:bg-red-400 hover:text-white delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width='100%' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button> 
            </div>                        
        `;

        li.querySelector('.check-btn').addEventListener('click', function () {
            task.done = !task.done;
            printTask();
        });
        
        li.querySelector('.delete-btn').addEventListener('click', function () {
            list.splice(index, 1); // Remove task from list array
            printTask(); // Re-render the task list to update the UI
        });

        ul.appendChild(li);
    });
}

function handleChange(value) {
    list.push({
        value: value,
        done: false
    });
    printTask();
}
