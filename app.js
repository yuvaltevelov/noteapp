document.getElementById('note-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Show the confirmation popup menu
    document.getElementById('confirmationModal').style.display = 'block';
});

// Function to close the popup menu
function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function createNote() {
    closeModal(); // Close the popup menu asking Yes Or No
    // Retrieve form values
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;
    const targetDate = document.getElementById('target-date').value;
    const color = document.getElementById('color-select').value;

    // function to check if the text is in Eivrit
    function isHebrew(text) {
        const hebrew = /[\u0590-\u05FF]/;
        return hebrew.test(text);
    }

    // Set the text dir base on the language I'm writing
    let direction = 'ltr';
    if (isHebrew(noteTitle) || isHebrew(noteContent)) {
        direction = 'rtl';
    }

    // Getting the current dateand what time is it
    const creationDate = new Date();
    const formattedDate = creationDate.getDate().toString().padStart(2, '0') + '/' +
                        (creationDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
                        creationDate.getFullYear() + ' | ' +
                        creationDate.getHours().toString().padStart(2, '0') + ':' +
                        creationDate.getMinutes().toString().padStart(2, '0');

   // Create a new note element
   const noteDiv = document.createElement('div');
   noteDiv.className = 'note shadow p-3 m-1 col-md-3';
   noteDiv.style.backgroundColor = color;
   noteDiv.style.fontSize = '16px';
   noteDiv.style.direction = direction; // Set the text direction cuz of hebrew english rtl, ltr


   //Like barak says : don't use innerHTML XSS Attacks and shit
   const closeSymbol = document.createTextNode('\u00D7');
   noteDiv.appendChild(closeSymbol);

   const titleElement = document.createElement('h4');
   titleElement.textContent = noteTitle;
   noteDiv.appendChild(titleElement);

   const contentElement = document.createElement('p');
   contentElement.textContent = noteContent;
   noteDiv.appendChild(contentElement);

   const creationDateElement = document.createElement('small');
   creationDateElement.textContent = 'Creation date: ' + formattedDate;
   noteDiv.appendChild(creationDateElement);

   const breakElement = document.createElement('br');
   noteDiv.appendChild(breakElement);

   const targetDateElement = document.createElement('small');
   if (targetDate === "") {
       targetDateElement.textContent = null;
   } else {
       targetDateElement.textContent = 'Target Date: ' + targetDate;
       noteDiv.appendChild(targetDateElement);
    
   }

   // Append the note to the notes container
   document.getElementById('notes-container-row').appendChild(noteDiv);

   // Clear the form
   document.getElementById('note-form').reset();
}

document.getElementById('settings-button').addEventListener('click', function() {
    document.getElementById('settings-menu').style.display = 'block';
});

document.getElementById('close-settings').addEventListener('click', function() {
    document.getElementById('settings-menu').style.display = 'none';
});

document.getElementById('font-size').addEventListener('change', function() {
    const fontSize = this.value;
    document.body.style.fontSize = fontSize === 'small' ? '12px' : fontSize === 'medium' ? '16px' : '20px';
});

document.getElementById('theme').addEventListener('change', function() {
    const theme = this.value;
    const isDarkMode = theme === 'dark';
  
    const newBackgroundColor = isDarkMode ? '#333' : '#c8c8c89b';
    const newTextColor = isDarkMode ? '#fff' : '#000';
    const newSettingsBgColor = isDarkMode ? '#555' : '#f4f4f4';
    const newFormBgColor = isDarkMode ? '#444' : '#fff';
  
    document.documentElement.style.setProperty('--background-color', newBackgroundColor);
    document.documentElement.style.setProperty('--text-color', newTextColor);
    document.documentElement.style.setProperty('--settings-bg-color', newSettingsBgColor);
    document.documentElement.style.setProperty('--form-bg-color', newFormBgColor);
  
  });
    



