import { Link } from "react-router-dom";

function NavElement({ linkAddress, name }: any) {
  return (
    <div>
      <li className="inline p-5 hover:text-[#000000] hover:duration-300 ">
        <Link to={linkAddress}>{name}</Link>
      </li>
    </div>
  );
}

export default NavElement;
