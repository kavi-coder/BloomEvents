import { Carousel } from 'react-carousel-minimal';
import { imagedata } from 'docs/imagedata';


function SwiperElemet({width,height,thumbnails,time,b_radius}) {  

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div >
          <Carousel
            data={imagedata}
            time={time}
            width={width}
            height={height}
            // captionStyle={captionStyle}
            radius={b_radius}
            // slideNumber={true}
            // slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={thumbnails}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              // maxWidth: "850px",
              // maxHeight: "500px",
              // margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SwiperElemet