import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instruction: string;
  cuisineId: number;
  dietId: number;
  difficultyId: number;
  image?: string;
}

interface Difficulties {
  id: number;
  name: string[];
}

function Search() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [difficulties, setDifficulties] = useState<Difficulties[] | null>(null)
  const [pages, setPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const BASE_URL = 'http://localhost:8080'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + '/recipes?_page=' + pages);  // Replace with your API endpoint
        const json = await response.json();
        console.log(pages)
        if (json.length != 0) {
          setPages(pages + 1)
        }
      } catch (err) {
      } finally {
      }
    };
    fetchData();
  }, [pages])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + '/recipes?_page=' + currentPage);  // Replace with your API endpoint
        const json = await response.json();
        setRecipes(json);
      } catch (err) {
      } finally {
      }
    };
    fetchData();
  }, [currentPage])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + '/difficulties');  // Replace with your API endpoint
        const json = await response.json();
        setDifficulties(json);
      } catch (err) {
      } finally {
      }
    };
    fetchData();
  }, [])

  let chooseCurrentPage = (pageNum: number) => {
    return (event: React.MouseEvent) => {
      setCurrentPage(pageNum)
      window.scrollTo(0, 0);
      event.preventDefault();
    }
  }

  return (
    <div className='h-screen w-screen'>
      <nav className='flex flex-row justify-between items-center h-20 shadow-md'>
        <div className='flex flex-row gap-10 items-center ml-14'>
          <h1 className='text-3xl'>
            RecipeBoo
          </h1>
          <span className='text-xl'>
            Main
          </span>
          <span className='text-xl'>
            Cuisine
          </span>
          <span className='text-xl'>
            Dietary
          </span>
        </div>
        <div className='flex flex-row justify-around gap-10 mr-14 w-2/12'>
          <button className='outline outline-2 rounded-full text-lg h-10 w-1/2'>Add</button>
          <button className='bg-red-600 rounded-full text-white
            text-lg h-10 w-1/2'>Filter</button>
        </div>
      </nav>
      <div className='flex flex-row'>
        <aside className='w-1/4 shadow-md'>
          <div className='flex flex-col items-start gap-4 ml-14'>
            <FontAwesomeIcon icon={faArrowLeft} className='self-start mt-10 size-5' />
            <span className='text-xl'>
              Discover Recipes
            </span>
            <div>
              <label htmlFor="input">Search by name</label>
              <input className='w-9/12 pr-4 pl-4 h-10 outline outline-gray-200 outline-1 rounded-full' type="text"
                placeholder='Enter recipe name' />
            </div>
            <div>
              <label htmlFor="input">Select category</label>
              <input className='w-9/12 pr-4 pl-4 h-10 outline outline-gray-200 outline-1 rounded-full' type="text"
                placeholder='Choose category' />
            </div>
            <div>
              <label htmlFor="input">Select cuisine</label>
              <input className='w-9/12 pr-4 pl-4 h-10 outline outline-gray-200 outline-1 rounded-full' type="text"
                placeholder='Choose cuisine' />
            </div>
            <div>
              <label htmlFor="input">Select preference</label>
              <input className='w-9/12 pr-4 pl-4 h-10 outline outline-gray-200 outline-1 rounded-full' type="text"
                placeholder='Choose preference' />
            </div>
            <button className='bg-red-600 w-9/12 h-10 rounded-full text-white'>
              Search
            </button>
          </div>
          <hr className='mt-6' />
          <div className='flex flex-col gap-6 mt-4 ml-14 mb-9'>
            <div className='flex flex-col gap-2'>
              <span className='text-xl'>Recipe filters</span>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Vegetarian recipes</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Low-carb recipes</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Gluten-free recipes</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Vegan recipes</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-xl'>Ingredient list</span>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Quick and easy</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Healthy choices</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Family-Friendly</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Special occasions</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-xl'>User reviews</span>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>All ratings</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Five stars</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className='ml-2'>Four stars</span>
              </div>
              <div>
                <input type="checkbox" className='accent-red-600' />
                <span className='ml-2 '>Begginer-Friendly</span>
              </div>
            </div>
            <span className='text-xl'>Recipe difficulty</span>
            <div className='flex flex-row gap-2 flex-wrap w-3/4'>
              <button className='outline outline-[0.9px] outline-black h-5 p-3 rounded-full flex place-items-center'>
                Easy
              </button>
              <button className='outline outline-[0.9px] outline-black h-5 p-3 rounded-full flex place-items-center'>
                Medium
              </button>
              <button className='outline outline-[0.9px] outline-black h-5 p-3 rounded-full flex place-items-center'>
                Hard
              </button>
              <button className='outline outline-[0.9px] outline-black h-5 p-3 rounded-full flex place-items-center'>
                Expert
              </button>
              <button className='outline outline-[0.9px] outline-black h-5 p-3 rounded-full flex place-items-center'>
                Master
              </button>
            </div>
          </div>
        </aside>
        <main className='flex flex-col w-3/4 place-items-center'>
          <div className='flex flex-row justify-start w-5/6 mt-6'>
            <span>Results for</span>
          </div>
          <div className='flex flex-row justify-between w-5/6 mt-6'>
            <span className='text-2xl mt-2'>Recipes found for your seach criteria</span>
            <button className='outline ouline-1 outline-gray-300 rounded-full p-2 h-10'>
              Filter by
              <FontAwesomeIcon icon={faChevronDown} className='ml-6' />
            </button>
          </div>
          <div className='w-full flex flex-col place-items-center '>
            {recipes != null
              ?
              recipes.map(recipe => (
                <div className='flex flex-row justify-between shadow-xl h-60 rounded-3xl mb-5 w-5/6'>
                  <div className='flex flex-row m-5 justify-between'>
                    <img src={BASE_URL + recipe.image} className='max-w-52 rounded-3xl' />
                    <div className='flex flex-col ml-5'>
                      <span className='text-xl'>
                        {recipe.name}
                      </span>
                      <span className='flex flex-row flex-wrap w-4/6 gap-x-1.5'>
                        {recipe.ingredients.map(ingredient => (
                          <p>
                            {ingredient}
                            {recipe.ingredients[recipe.ingredients.length - 1] != ingredient ?
                              <>,</>
                              : <></>
                            }
                          </p>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className='mt-10 mr-5 flex flex-col'>
                    <div className='h-5 outline outline-[0.9px] rounded-full p-1 flex place-items-center'>
                      {difficulties != null ?
                        difficulties[recipe.difficultyId - 1].name
                        : ""
                      }
                    </div>
                  </div>
                </div>
              ))
              : "No dishes found"
            }
          </div>
          <div className='flex flex-row gap-5'>
            {(() => {
              const arr = [];
              for (let i = 0; i < pages; i++) {
                arr.push(
                  <button className='rounded-full p-2' onClick={chooseCurrentPage(i)}>
                    {i + 1}
                  </button>
                );
              }
              return arr;
            })()}
          </div>
        </main>
      </div >
      <footer>
        footer
      </footer>
    </div >
  );
}

export default Search;
