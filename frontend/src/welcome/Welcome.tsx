import '../App.css'
import cookbook from './../assets/cookbook.jpg'
import chef from './../assets/chef.jpg'

function Welcome({ onClickEvent }: any) {
  return (
    <div className='h-screen w-screen place-content-center'>
      <div className="flex flex-row justify-around content-center h-5/6">
        <div className="h-8/12 w-5/12 bg-gray-200 rounded-3xl flex items-center justify-center">
          <img src={cookbook} className='rounded-3xl w-10/12' />
        </div>
        <div className="w-6/12 flex flex-col place-content-center">
          <img src={chef} className='w-44 h-44 self-center' />
          <h1 className='flex place-content-center text-7xl'>
            Recipe Book
          </h1>
          <p className='flex place-content-center text-3xl'>
            Discover Recipes
          </p>
          <button
            className='bg-red-300 w-4/12 h-14 rounded-full self-center mt-14 outline-none'
            onClick={onClickEvent}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome;
