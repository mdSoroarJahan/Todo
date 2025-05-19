// Input filed for new task
const newTaskInput = document.getElementById("new-task");

// Button to add/update task
const addTaskButton = document.getElementById("addTask");

// List of incomplete tasks
const incompleteTaskList = document.getElementById("items");

// List of complete tasks
const completeTaskList = document.querySelector(".complete-list ul");

// Variable to track the task being edited
let editingTask = null;

// Function to add or update task
function addOrUpdateTask(event){
    // Prevent browser reload
    event.preventDefault();
    // Get the task text
    const taskText = newTaskInput.value.trim();
    // if input is empty
    if(taskText === "") return;

    // add or edit
    if(editingTask){
        // editing task
        editingTask.querySelector("label").textContent = taskText;
        addTaskButton.value = "Add Task";
        editingTask = null;
    }else{
        const listItem = createTaskElement(taskText);
        incompleteTaskList.appendChild(listItem);
    }

    newTaskInput.value = "";//Clear the input field
}

// Function to create a new task element
function createTaskElement(taskText){
    // Li Creation
    const li = document.createElement("li");
    li.classList.add("item");

    //Checkbox Creation
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";

    // Complete event fire
    checkbox.addEventListener("change", completeTask);

    // Label Creation
    const label = document.createElement("label");
    label.textContent = taskText;
    

    // Edit button Creation
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");

    // Edit event fire
    editButton.addEventListener("click", editTask);

    // Add element to the list item(li)
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editButton);

    return li;

}

// Function to edit an existing tank
function editTask(){
    const listItem = this.parentElement;//Getting the parent(li)
    const label = listItem.querySelector("label");//get label
    // populate the new task input field with the incomplete task text
    newTaskInput.value = label.textContent;

    // Update the add task button to update task
    addTaskButton.value = "Update Task";
    editingTask = listItem; //set the editing mode

}

// Function to mark as complete
function completeTask(){
    const listItem = this.parentElement;//getting the parent(li)
    this.remove(); //Remove the checkBox
    listItem.querySelector(".edit").remove();//remove the edit button to the completed panel

    // Delete Button creation
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", deleteTask);

    listItem.appendChild(deleteButton);//adding the delete button to the completed panel's li

    // Adding the task to completed panel
    completeTaskList.appendChild(listItem);
}

//function to delete a completed task
function deleteTask(){
    const listItem = this.parentElement;//get parent
    listItem.remove();
}

// Event listener for adding or updating a task
addTaskButton.addEventListener("click", addOrUpdateTask);