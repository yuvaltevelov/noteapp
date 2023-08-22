document.getElementById('note-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Show the confirmation popup menu
    document.getElementById('confirmationModal').style.display = 'block';
});

// Function to close the popup menu
function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function getTextColor(backgroundColor) {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    // Return white or black text depending on the luminance
    return luminance > 0.5 ? '#000' : '#FFF';
}

function createNote(noteData, save = true) {
    closeModal(); // Close the popup menu asking Yes Or No
    // Retrieve form values

    // const noteTitle = document.getElementById('note-title').value;
    const noteTitle = noteData ? noteData.noteTitle : document.getElementById('note-title').value;
    localStorage.setItem('noteTitle', noteTitle);
    const savedNoteTitle = localStorage.getItem('noteTitle');


    // const noteContent = document.getElementById('note-content').value;
    const noteContent = noteData ? noteData.noteContent : document.getElementById('note-content').value;
    localStorage.setItem('noteContent', noteContent);
    const savedNoteContent = localStorage.getItem('noteContent');


    // const targetDate = document.getElementById('target-date').value;
    const targetDate = noteData ? noteData.targetDate : document.getElementById('target-date').value;
    localStorage.setItem('targetDate', targetDate);
    const savedTargetDate = localStorage.getItem('targetDate');


    // const color = document.getElementById('color-select').value;
    const color = noteData ? noteData.color : document.getElementById('color-select').value;
    localStorage.setItem('BgColor', color);
    const savedBgColor = localStorage.getItem('BgColor');


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
   const textColor = getTextColor(color); // determine the appropriate text color based on the background color
   noteDiv.style.color = textColor;
   noteDiv.style.fontSize = '16px';
   noteDiv.style.direction = direction; // Set the text direction cuz of hebrew english rtl, ltr


   //Like barak says : don't use innerHTML XSS Attacks and shit
//    const closeSymbol = document.createTextNode('\u00D7');
//    noteDiv.appendChild(closeSymbol);
// Create close button
    const closeButton = document.createElement('span');
    closeButton.className = 'note-close-button';
    closeButton.textContent = '\u00D7';
    closeButton.addEventListener('click', function() {
        deleteNote(noteData, noteDiv);
    });
    noteDiv.appendChild(closeButton);

   const titleElement = document.createElement('h4');
   titleElement.textContent = savedNoteTitle;
   noteDiv.appendChild(titleElement);

   const contentElement = document.createElement('p');
   contentElement.textContent = savedNoteContent;
   contentElement.classList.add('scrollable-content');

   noteDiv.appendChild(contentElement);

   const creationDateElement = document.createElement('small');
   creationDateElement.classList.add('create-date');
   creationDateElement.textContent = 'Creation date: ' + formattedDate;
   noteDiv.appendChild(creationDateElement);
   creationDateElement.style.color = textColor;


   const breakElement = document.createElement('br');
   noteDiv.appendChild(breakElement);

   const targetDateElement = document.createElement('small');
   targetDateElement.classList.add('target-date');
   //document.documentElement.style.setProperty('--text-color', newTextColor);
   if (savedTargetDate === "") {
       targetDateElement.textContent = null;
    } else {
        targetDateElement.textContent = 'Target Date: ' + savedTargetDate;
        noteDiv.appendChild(targetDateElement);
        targetDateElement.style.color = textColor;
        contentElement.style.textAlign = 'center';

    
   }

   // Append the note to the notes container
   document.getElementById('notes-container-row').appendChild(noteDiv);

   // Clear the form
   document.getElementById('note-form').reset();
   if (save) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push({
      noteTitle: savedNoteTitle,
      noteContent: savedNoteContent,
      targetDate: savedTargetDate,
      color: savedBgColor,
      creationDate: formattedDate
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}


function deleteNote(noteData, noteElement) {
    // Remove note from DOM
    noteElement.remove();

    // Retrieve notes from local storage
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    // Find index of the note to delete
    const index = notes.findIndex(note => 
        note.noteTitle === noteData.noteTitle &&
        note.noteContent === noteData.noteContent &&
        note.targetDate === noteData.targetDate &&
        note.color === noteData.color &&
        note.creationDate === noteData.creationDate
    );

    // Remove note from array if found
    if (index > -1) {
        notes.splice(index, 1);
    }

    // Save updated notes back to local storage
    localStorage.setItem('notes', JSON.stringify(notes));
}


// Function to load notes from local storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach(note => createNote(note, false));
}


document.getElementById('settings-button').addEventListener('click', function() {
    document.getElementById('settings-menu').style.display = 'block';
});

document.getElementById('close-settings').addEventListener('click', function() {
    document.getElementById('settings-menu').style.display = 'none';
});

// document.getElementById('font-size').addEventListener('change', function() {
//     const fontSize = this.value;
//     const newFontSize = fontSize === 'small' ? '12px' : fontSize === 'medium' ? '16px' : '20px';
//     document.documentElement.style.setProperty('--font-size', newFontSize);
// });

document.getElementById('font-size').addEventListener('change', function() {
    const newSize = this.value + 'px';
    document.documentElement.style.setProperty('--font-size', newSize);
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
    

  window.onload = loadNotes;