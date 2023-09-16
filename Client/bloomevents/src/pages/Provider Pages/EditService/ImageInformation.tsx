import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import React, { useEffect, useState } from "react";
import FileUpload from "Services/FileUpload/FileUpload";
import ImageInformationSkeleton from "skeleton/Service Details/ImageInformationSkeleton";
import AddNewDetailImage from "./AddNewDetailImage";
import ImageInfoCard from "./ImageInfoCard";

function ImageInformation({ providerId, token }: any) {
  const [limit, setLimit] = useState<any>(5);
  const [names, setNames] = useState<any>(null);
  useEffect(() => {
    setTimeout(() => {
      FileUpload.getImageNames(providerId).then((res: any) => {
        if (res.status == 200) {
          setNames(res.data);
          // console.log(res.data.length);
          setLimit(limit - res.data.length);
        }
      });
    }, 1000);
  }, [providerId]);

  const [deleteName, setDeleteName] = useState<any>(null);

  useEffect(() => {
    const filteredData = names?.filter((emp: any) => emp !== deleteName);
    setNames(filteredData);
    if (limit < 5) {
      setLimit(limit + 1);
    }
  }, [deleteName]);

  return (
    <div className="relative bg-white">
      <h1 className="">Your Images</h1>
      <div className="grid h-auto grid-cols-5 gap-3 p-3">
        {names ? (
          names.map((c: any, i: number) => (
            <>
              <ImageInfoCard
                source={c}
                key={i}
                providerId={providerId}
                setDeleteName={setDeleteName}
                limit={limit}
                setLimit={setLimit}
              />
            </>
          ))
        ) : (
          <>
            <ImageInformationSkeleton />
            <ImageInformationSkeleton />
            <ImageInformationSkeleton />
            <ImageInformationSkeleton />
            <ImageInformationSkeleton />
          </>
        )}
      </div>

      {limit >= 0 && (
        <>
          {/* add new Images */}

          {limit > 0 && (
            <>
              <h1 className="">Add New Images</h1>
              <p className="text-sm text-red-600">
                You can upload {limit} images
              </p>
            </>
          )}
          <div>
            <AddNewDetailImage
              limit={limit}
              setLimit={setLimit}
              providerId={providerId}
              setNames={setNames}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ImageInformation;
