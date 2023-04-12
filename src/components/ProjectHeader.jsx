import saveIcon from '../assets/save-64.png'

const ProjectHeader = ({
  handleChange,
  handleFocus,
  handleBlur,
  handleCheckbox,
  details,
  unsavedChanges,
  deleteProject
}) => {
  return (
    <div className="row">
      <div className="form-floating col-6 col-lg-7 col-xl-6 col-xxl-5">
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
      <div className="row col-3 col-lg-2">
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
      <div className="col-2 col-lg-2">
        <button className="btn btn-danger" onClick={deleteProject}>
          Delete Project
        </button>
      </div>
      <div className="position-absolute top-0 end-0">
        {unsavedChanges && <img src={saveIcon} alt="saveIcon" />}
      </div>
    </div>
  )
}

export default ProjectHeader
