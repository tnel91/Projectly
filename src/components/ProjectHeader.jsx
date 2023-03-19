import saveIcon from '../assets/save-64.png'
import { useEffect } from 'react'

const ProjectHeader = ({
  handleChange,
  handleFocus,
  handleBlur,
  handleCheckbox,
  details,
  unsavedChanges
}) => {
  return (
    <div className="row">
      <div className="form-floating col-5">
        <input
          id="projectName"
          className="form-control"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Project Name"
          value={details.projectName}
          required
        />
        <label htmlFor="projectName">Project Name</label>
      </div>
      <div className="row col-3">
        <label className="row align-items-center">
          <input
            className="col-2 h-50"
            id="isPublic"
            type="checkbox"
            checked={details.isPublic}
            onChange={handleCheckbox}
          />
          <p className="col-10 align-center">Public?</p>
        </label>
      </div>
      <div className="col-3">
        {unsavedChanges && <img src={saveIcon} alt="saveIcon" />}
      </div>
    </div>
  )
}

export default ProjectHeader
