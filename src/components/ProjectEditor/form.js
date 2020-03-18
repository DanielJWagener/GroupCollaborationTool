import React, { useState, useContext } from "react";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

export default function(params) {
  const provider = useContext(ProviderContext);
  const session = useContext(SessionContext);

  const [owner] = useState(session.uid);
  const [name, setName] = useState(params.project.name);
  const [type, setType] = useState(params.project.type);
  const [description, setDescription] = useState(params.project.description);
  const [repoLink, setRepoLink] = useState(params.project.repoLink);
  const [error, setError] = useState("");

  const validate = () => {
    return name.length > 0 && type.length > 0 && description.length > 0;
  };

  const onSubmit = event => {
    event.preventDefault();

    provider
      .updateProject(params.projectId, {
        owner,
        name,
        type,
        description,
        repoLink
      })
      .catch(error => setError(error));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          placeholder="project name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="Open Source">Open Source</option>
          <option value="Private">Private</option>
        </select>
        <br />
        <textarea
          cols="45"
          rows="10"
          placeholder="project description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="repository link"
          value={repoLink}
          onChange={e => setRepoLink(e.target.value)}
        />
        <input type="submit" value="Update" disabled={!validate()} />

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
