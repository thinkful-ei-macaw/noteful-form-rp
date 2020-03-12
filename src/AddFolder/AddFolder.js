import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import config from "../config";
import ApiContext from "../ApiContext";

export default class AddFolder extends Component {
  static contextType = ApiContext;
  submitButton = e => {
    e.preventDefault();
    let folder = {
      name: e.target["folder-name"].value
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(folderData => {
        this.context.addFolder(folderData);
        this.props.history.push(`/folder/${folderData.id}`);
      });
  };

  render() {
    console.log(this.props);
    return (
      <section className='add_folder'>
        <h2>Create New Folder</h2>
        <NotefulForm onSubmit={this.submitButton}>
          <input type='text' placeholder='Folder Name' name='folder-name' />
          <input type='submit' name='Add Folder' />
        </NotefulForm>
      </section>
    );
  }
}
