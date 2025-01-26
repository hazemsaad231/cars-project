import newImage from '../../../src/assets/img/new.mp4'

const Image = () => {
    

    return(
        
<div className='w-full h-screen'>
    <video autoPlay loop muted disablePictureInPicture playsinline className='w-full h-screen object-cover'>
        <source src={newImage} type="video/mp4" />
    </video>
</div>
    )
}

export default Image