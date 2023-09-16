import "styles/Slider.css";
import { useState, useEffect } from "react";
import FileUpload from "Services/FileUpload/FileUpload";
import image from "img/logo.png";

const Carousel = ({ providerId }: any) => {
  const [names, setNames] = useState<any>(null);
  useEffect(() => {
    FileUpload.getImageNames(providerId).then((res: any) => {
      if (res.status == 200) {
        setNames(res.data);
      }
    });
  }, [providerId]);
  const server = `http://localhost:8080/upload/ProviderImages/${providerId}`;

  return (
    <div className="w-full">
      <div id="slider" className="mx-auto">
        {names ? (
          <>
            {names?.map((c: any, i: number) => (
              <>
                <input
                  type="radio"
                  name="slider"
                  id={"s" + (i + 1).toString()}
                />
              </>
            ))}
          </>
        ) : (
          <>
            <input type="radio" name="slider" id={"s1"} />
          </>
        )}

        {names ? (
          <>
            {names?.map((c: any, i: number) => (
              <>
                <label htmlFor={"s" + (i + 1)} id={"slide" + (i + 1)}>
                  <img
                    src={`${server}/${c}`}
                    alt="artwork"
                    style={{ width: "700px", height: "500px" }}
                    className="sliderImg"
                  />
                </label>
              </>
            ))}
          </>
        ) : (
          <>
            <label htmlFor={"s1"} id={"slide"}>
              <img
                src={image}
                alt="artwork"
                style={{ width: "600px", height: "400px" }}
                className="sliderImg"
              />
            </label>
            {/* {sliderImg?.map((c: any, i: number) => (
              <>
                <label htmlFor={"s" + (i + 1)} id={"slide" + (i + 1)}>
                  <img
                    src={c}
                    alt="artwork"
                    style={{ width: "600px", height: "400px" }}
                    className="sliderImg"
                  />
                </label>
              </>
            ))} */}
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
