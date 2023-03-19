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
      <div className="form-floating col-9 col-md-10">
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
      <div className="row col-3 col-md-2">
        <label className="align-items-center">
          <input
            id="isPublic"
            type="checkbox"
            checked={details.isPublic}
            onChange={handleCheckbox}
          />
          <p className="align-center">Public?</p>
        </label>
      </div>
      <div className="position-absolute top-0 end-0">
        {unsavedChanges && <img src={saveIcon} alt="saveIcon" />}
      </div>
    </div>
  )
}

export default ProjectHeader
