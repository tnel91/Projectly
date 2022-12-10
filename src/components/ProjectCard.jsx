const ProjectCard = (props) => {
  return (
    <div className="project_card" onClick={() => props.onClick(props.id)}>
      <h4>{props.name}</h4>
      <p>{`Created by: ${props.owner}`}</p>
    </div>
  )
}

export default ProjectCard
