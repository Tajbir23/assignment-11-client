import Categories from "./Categories"
import PopularBook from "./PopularBook"
import Slider from "./Slider"
import Subscribe from "./Subscribe"


const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <PopularBook />
      <Subscribe />
    </div>
  )
}

export default Home