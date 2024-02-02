import './FormBtn.css'
const FormBtn = (props) => {
  return (
    <button type="submit" className="formBtn">
              {props.text}
            </button>
  )
}

export default FormBtn