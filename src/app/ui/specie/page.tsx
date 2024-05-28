import SpeciesList from "@/components/SpeciesList";
import dar from "@/mook/dat.json"
const page = () => {
  return (
    <>
      <SpeciesList species={dar} />
      
    </>
  );
};

export default page;
