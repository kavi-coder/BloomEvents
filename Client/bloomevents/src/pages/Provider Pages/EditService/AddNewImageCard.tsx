import React from "react";
import { FcAddImage } from "react-icons/fc";

function AddNewImageCard({ func }: any) {
  return (
    <div
      className={` relative duration-200 ease-in-out rounded-lg w-full h-[202px] border border-black`}>
      <input
        type={"file"}
        multiple
        onChange={func}
        className={"absolute cursor-pointer opacity-0 z-1 w-full h-[200px] "}
      />
      <div className="flex justify-center text-8xl items-center z-2 w-full rounded-lg h-[200px] bg-transparent hover:bg-black">
        <FcAddImage className="" />
      </div>
    </div>
  );
}

export default AddNewImageCard;
