import Sidebar from "../Components/CategoryPageComponents/Sidebar";
import MainContent from "../Components/CategoryPageComponents/MainContent"

const CategoryPage = () => {
  return (
    <>
      <div className="w-full px-[16px] md:px-[100px] flex"> 
        <Sidebar className="w-1/3"/>
        <MainContent/>
      </div>
    </>
  )
}

export default CategoryPage;