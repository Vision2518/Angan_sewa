import { useParams } from "react-router-dom";
const BranchServices = () => {
  const {place}=useParams();
  console.log(place);
  return <div>Branch Services will show here </div>;
};
export default BranchServices;
