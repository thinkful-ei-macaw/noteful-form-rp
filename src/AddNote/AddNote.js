import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import NotefulForm from "../NotefulForm/NotefulForm";

export default class AddNote extends Component {
  static contextType = ApiContext;
  submitButton = e => {
    e.preventDefault();
    let note = {
      name: e.target["note-name"].value
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
    const { folders = [] } = this.context;
    return (
      <section className='add_note'>
        <h2>Add Note</h2>
        <NotefulForm onSubmit={this.submitButton}>
          <input name='note-name' placeholder='Name your note'></input>
          <textarea
            className='text_area'
            placeholder='Add text here..'
          ></textarea>
          <select>
            <option value={null}></option>
            {folders.map(folderListing => (
              <option value={folderListing.id}></option>
            ))}
          </select>
          <input type='submit' name='add-note'></input>
        </NotefulForm>
      </section>
    );
  }
}
