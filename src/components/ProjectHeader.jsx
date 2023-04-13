const ProjectHeader = ({ handleChange, handleFocus, handleBlur, details }) => {
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
    </div>
  )
}

export default ProjectHeader
