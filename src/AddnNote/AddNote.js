import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import NotefulForm from "../NotefulForm/NotefulForm";

export default class AddNote extends Component {
  static contextType = ApiContext;

  render() {
    return (
      <section className='add_note'>
        <h2>Add Note</h2>
        <NotefulForm onSubmit={this.submitButton}>
          <input name='note-name' placeholder='Name your note'></input>
          <textarea
            className='text_area'
            placeholder='Add text here..'
          ></textarea>
        </NotefulForm>
      </section>
    );
  }
}
