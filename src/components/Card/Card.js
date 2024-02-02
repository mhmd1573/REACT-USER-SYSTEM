import  './Card.css'
import PropTypes from 'prop-types';

import { toggleCardForm } from '../../pages/validationUtil';


const Card = ({  title, description, imageUrl   }) => {
  return (
    <div className="card">
        <div className='card-img'>
       {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
       </div>
      <h2 className='card-title'>{title}</h2>
      {description && <p className='card-p'>{description}</p>}
      <button className='card-btn' onClick={toggleCardForm}>Add to Cart</button>
           
  </div>
  )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  };

export default Card