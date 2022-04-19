var selectedRow = null;
const form = document.querySelector('.formal');

const addBtn = document.querySelector('#employ-btn');


addBtn.addEventListener('click', ()=> {
    form.style.display = 'block';
})

const home = document.querySelector('#cancel-btn');

home.addEventListener('click', ()=> {
    form.style.display = 'none'
} )

function onFormSubmit(){
    event.preventDefault();
    var formData = readFormData();
    console.log(formData)
    var number = document.getElementById('number').value
    var first = document.getElementById('firstName').value;
    var last = document.getElementById('lastName').value;
    var department = document.getElementById('department').value;
    var salary = document.getElementById('salary').value;

    if(first === '' || last === '' || department === '' || salary === '' || number === '' ){
        alert('Please fill the blank fields')
    }
    else{
      if(selectedRow === null){
            insertNewRecord(formData);
            document.getElementById("firstName").value = ''
            document.getElementById("lastName").value = ''
            document.getElementById("department").value = ''
            document.getElementById("salary").value = ''
            document.getElementById("number").value = ''
        }
        else{
            updateRecord(formData);
        }
    }
  
}



//Retrieve the data
function readFormData(){
    var formData = {};
    formData["number"] = document.getElementById("number").value;
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["department"] = document.getElementById("department").value;
    formData["salary"] = document.getElementById("salary").value; 
    return formData;
}

//insert the data
function insertNewRecord(data){
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.number
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.firstName + ' '  + data.lastName;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.department;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.salary; 
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`; 
}

//Edit the data
function onEdit(td){
    document.getElementById('save').innerText = 'Update'
    selectedRow = td.parentElement.parentElement;
    console.log(selectedRow)
    let name = selectedRow.cells[1].innerHTML
    console.log(name)
    var firstName = name.split(' ').slice(0,-1).join(' ');
    var lastName = name.split(' ').slice(-1).join(' ');

    document.getElementById('number').value = selectedRow.cells[0].innerHTML;
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('department').value = selectedRow.cells[2].innerHTML;
    document.getElementById('salary').value = selectedRow.cells[3].innerHTML;
}

function resetForm(){
    event.preventDefault();
    document.getElementById("firstName").value = ''
    document.getElementById("lastName").value = ''
    document.getElementById("department").value = ''
    document.getElementById("salary").value = ''
    document.getElementById("number").value = ''
    selectedRow = null
    document.getElementById('save').innerText = 'Save'
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.number;
    selectedRow.cells[1].innerHTML = formData.firstName + ' ' + formData.lastName;
    selectedRow.cells[2].innerHTML = formData.department;
    selectedRow.cells[3].innerHTML = formData.salary;
}

//Delete the data
function onDelete(td){
    if (confirm('Do you want to delete this record?')){
        row = td.parentElement.parentElement;
        console.log(row)
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm()
    }
}
    
