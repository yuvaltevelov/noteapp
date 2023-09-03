NoteApp
Overview
NoteApp is a front-end application designed for educational purposes. The application allows users to create, view, and delete notes. Each note can have a title, content, target date, and background color. The application also supports text direction based on the language used in the note (LTR for English, RTL for Hebrew).

Technologies Used
HTML
CSS
JavaScript
Features
Create new notes with a title, content, target date, and background color.
View all created notes.
Delete individual notes.
Store notes in the browser's local storage to persist across sessions.
Change font size and theme (light/dark) via settings.
Text direction support based on the language of the note.
Code Structure
JavaScript Functions
getTextColor(backgroundColor)
Determines the appropriate text color based on the background color.

createNote(noteData, save)
Creates a new note and appends it to the DOM.

deleteNote(noteData, noteElement)
Deletes a note from the DOM and local storage.

loadNotes()
Loads notes from local storage and renders them on the page.

closeModal()
Closes the confirmation popup menu.

Event Listeners
submit on note-form: Triggers the note creation process.
click on settings-button: Opens the settings menu.
click on close-settings: Closes the settings menu.
change on font-size: Changes the font size.
change on theme: Changes the theme (light/dark).
Local Storage
Notes and their attributes are stored in local storage to persist across different browsing sessions.

Security Note
This application is for educational purposes and should not be used for storing sensitive information. It uses local storage, which is not secure for sensitive data. Additionally, the application avoids the use of innerHTML to mitigate the risk of XSS attacks.

Feel free to modify this README to better suit your project's specific needs.
