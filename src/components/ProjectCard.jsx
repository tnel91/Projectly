const ProjectCard = ({ id, name, owner, onClick }) => {
  return (
    <div
      className="project_card card border-success m-2 p-2"
      onClick={() => onClick(id)}
    >
      <h4 className="text-primary">{name}</h4>
      <p>{`Created by: ${owner}`}</p>
    </div>
  )
}

export default ProjectCard
