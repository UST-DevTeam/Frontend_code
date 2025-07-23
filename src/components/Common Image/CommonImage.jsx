// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'

// <Zoom>
//   <img
//     src={imageRefValue.current}

//     alt=""
//   />
// </Zoom>
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ZoomableImage = ({ imageSrc }) => {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img
          src={imageSrc}
          alt="Zoomable"
          className="w-screen h-[90vh] object-fill rounded-md"
        />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ZoomableImage;

