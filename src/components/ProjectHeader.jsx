const ProjectHeader = ({
  handleChange,
  handleFocus,
  handleBlur,
  handleCheckbox,
  details
}) => {
  return (
    <div className="row">
      <div className="form-floating col-3">
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
          <p className="col-10 align-center">Viewable by other users?</p>
        </label>
      </div>
    </div>
  )
}

export default ProjectHeader
