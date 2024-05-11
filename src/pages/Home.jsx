import Categories from "./Categories"
import PopularBook from "./PopularBook"
import Slider from "./Slider"


const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <PopularBook />
    </div>
  )
}

export default Home