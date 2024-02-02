import  './Icons.css'
import socialIconsData from '../../data/socialIconsData';
const Icons = () => {
  return (
    <div className="icons">
    {socialIconsData.map((social, index) => (
      <div key={index} className="icon">
        {social.icon}
        <span className="icon-label">{social.name}</span>
      </div>
    ))}
  </div>
  )
}

export default Icons