import Select from "react-select";

const customStyles = {
  container(provided, state) {
    const props = state.selectProps;
    return {
      ...provided,
      width: props.customWidth
    }
  }
}

export default function
CustomSelect(props) {
  return (<>
    <Select 
    {...props}
    styles={customStyles}
    />
  </>)
}