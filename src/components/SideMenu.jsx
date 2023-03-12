const SideMenu = ({ handleChange, handleFocus, handleBlur, details }) => {
  return (
    <div>
      <h1>{details.owner}</h1>
      <div className="form-floating">
        <input
          id="budget"
          className="form-control"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Budget"
          value={details.budget}
        />
        <label htmlFor="budget">Budget:</label>
      </div>
      <div className="form-floating">
        <input
          type="date"
          id="startDate"
          className="form-control"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Start Date"
          value={details.startDate}
        />
        <label htmlFor="startDate">Start Date:</label>
      </div>
      <div className="form-floating">
        <input
          type="date"
          id="endDate"
          className="form-control"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="End Date"
          value={details.endDate}
        />
        <label htmlFor="endDate">End Date:</label>
      </div>
      <div className="form-floating">
        <textarea
          id="description"
          className="form-control"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Description"
          value={details.description}
        />
        <label htmlFor="description">Description</label>
      </div>
    </div>
  )
}

export default SideMenu
