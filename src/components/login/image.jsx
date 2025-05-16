import newImage from '../../../src/assets/img/New.jpeg'

const Image = () => {
    

    return(
        
<div className='w-full h-screen'> 

    <img src={newImage} alt="" className='w-full h-screen object-center' />
    {/* <video autoPlay loop muted disablePictureInPicture playsInline className='w-full h-screen object-cover'>
        <source src={newImage} type="video/mp4" />
    </video> */}
</div>

    )
}

export default Image


