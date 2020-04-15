import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import NotefulForm from "../NotefulForm/NotefulForm";
import { distanceInWordsToNow } from "date-fns";

export default class AddNote extends Component {
  static contextType = ApiContext;
  submitButton = e => {
    e.preventDefault();
    let index = e.target["folder_options"].options.selectedIndex;
    let note = {
      name: e.target["note-name"].value,
      content: e.target["text_area"].value,
      modified: Date.now(),
      folderId: e.target["folder_options"].options[index].id
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(note)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(noteData => {
        this.context.addNote(noteData);
        this.props.history.push(`/folder/${note.folderId}`);
      });
  };
  render() {
    const folders = this.context.folders;
    return (
      <section className='add_note'>
        <h2>Add Note</h2>
        <NotefulForm onSubmit={this.submitButton}>
          <input name='note-name' placeholder='Name your note' required></input>
          <textarea
            className='text_area'
            name='text_area'
            placeholder='Add text here..'
            required
          ></textarea>
          <select name="folder_options">

            {folders.map(folderListing => (
              <option name="folder_key"
                id={folderListing.id}
                key={folderListing.id}>{folderListing.name}</option>
            ))}
          </select>
          <input type='submit' name='add-note'></input>
        </NotefulForm>
      </section >
    );
  }
}
