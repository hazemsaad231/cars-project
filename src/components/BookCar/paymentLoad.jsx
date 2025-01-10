import { ColorRing } from 'react-loader-spinner'
const Wait = () => {
    return (
        <div className="flex items-center justify-center">
        <ColorRing
  visible={true}
  height="32"
  width="32"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
        </div>
    )
}


export default Wait