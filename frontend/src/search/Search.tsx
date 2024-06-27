import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { Comment, Cuisine, Diet, Difficultie, Recipe } from './FetchInterfaces';


const BASE_URL = 'http://localhost:8080'

function Search({ goBack }: any) {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [difficulties, setDifficulties] = useState<Difficultie[] | null>(null)
  const [pages, setPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [diets, setDiets] = useState<Diet[] | null>(null)
  const [cuisines, setCuisines] = useState<Cuisine[] | null>(null)
  const [comments, setComments] = useState<Comment[] | null>(null)
  const [recipeName, setRecipeName] = useState<string>('')
  const [filterCuisine, setFilterCuisine] = useState<string>('')

  const handleRecipeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
  };

  const handleFilterCuisine = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCuisine(event.target.value);
  };

  useEffect(() => {
    fetchPages(pages, setPages, recipeName)
  }, [pages, recipeName])

  useEffect(() => {
    fetchRecipes(setRecipes, currentPage, recipeName, getCuisineName(cuisines, filterCuisine));
  }, [currentPage, recipeName, filterCuisine])

  useEffect(() => {
    fetchDifficulties(setDifficulties)
    fetchDiets(setDiets)
    fetchCuisines(setCuisines)
    fetchComments(setComments)
  }, [])

  return (
    <div className='w-full'>
      {getNavbar(goBack)}
      <div className='flex flex-row'>
        {getAside(goBack, recipeName, handleRecipeName, filterCuisine, handleFilterCuisine)}
        {getMain(recipes, difficulties, pages, setCurrentPage, diets, cuisines, comments)}
      </div >
    </div >
  );
}

function fetchPages(pages: number, setPages: Function, recipeName: string) {
  const fetchData = async () => {
    try {
      let URL = BASE_URL + '/recipes?_page=' + pages;
      if (recipeName != '') {
        URL = URL + '&q=' + recipeName;
      }
      const response = await fetch(URL);  // Replace with your API endpoint
      const json = await response.json();
      if (json.length != 0) {
        setPages(pages + 1)
      }
    } catch (err) {
      console.log(err)
    }
  };
  fetchData();
}

function fetchRecipes(setRecipes: Function, currentPage: number, recipeName: string, cuisineId: number | null) {
  const fetchData = async () => {
    try {
      let URL = BASE_URL + '/recipes?_page=' + currentPage;
      if (recipeName != '') {
        URL = URL + '&q=' + recipeName;
      }
      if (cuisineId != null) {
        console.log(cuisineId)
        URL = URL + '&cuisineId=' + cuisineId;
      }
      const response = await fetch(URL);  // Replace with your API endpoint
      const json = await response.json();
      setRecipes(json);
    } catch (err) {
      console.log(err)
    }
  };
  fetchData();
}

function fetchDifficulties(setDifficulties: Function) {
  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL + '/difficulties');  // Replace with your API endpoint
      const json = await response.json();
      setDifficulties(json);
    } catch (err) {
      console.log(err)
    }
  };
  fetchData();
}

function fetchCuisines(setCuisines: Function) {
  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL + '/cuisines');  // Replace with your API endpoint
      const json = await response.json();
      setCuisines(json);
    } catch (err) {
      console.log(err)
    }
  };
  fetchData();
}

function fetchDiets(setDiets: Function) {
  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL + '/diets');  // Replace with your API endpoint
      const json = await response.json();
      setDiets(json);
    } catch (err) {
      console.log(err)
    }
  };
  fetchData();
}

function fetchComments(setComments: Function) {
  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL + '/comments');  // Replace with your API endpoint
      const json = await response.json();
      setComments(json);
    } catch (err) {
      console.log(err)
    }
  };
  fetchData();
}

function chooseCurrentPage(pageNum: number, setCurrentPage: Function) {
  return (event: React.MouseEvent) => {
    setCurrentPage(pageNum)
    window.scrollTo(0, 0);
    event.preventDefault();
  }
}

function getNavbar(goBack: any) {
  return (
    <nav className='flex flex-row items-center h-20 shadow-md'>
      <div className='flex flex-row gap-10 items-center ml-14'>
        <h1 className='text-3xl cursor-pointer' onClick={goBack}>
          RecipeBoo
        </h1>
      </div>
    </nav>

  )
}

function getAside(goBack: any, recipeName: string, handleRecipeName: any, filterCuisine: string, setFilterCuisine: any) {
  return (
    <aside className='lg:w-1/4 shadow-md w-0 lg:visible invisible'>
      <div className='flex flex-col items-start gap-4 ml-14'>
        <button onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className='self-start mt-10 size-5' />
        </button>
        <span className='text-xl'>
          Discover Recipes
        </span>
        <div className='w-full'>
          <label htmlFor="input">Search by name</label>
          <input value={recipeName} onChange={handleRecipeName} className='w-9/12 pr-4 pl-4 h-10 outline outline-gray-200 outline-1 rounded-full' type="text"
            placeholder='Enter recipe name' />
        </div>
        <div className='w-full flex flex-col mb-5'>
          <label htmlFor="input">Select cuisine</label>
          <input value={filterCuisine} onChange={setFilterCuisine} className='w-9/12 pr-4 pl-4 h-10 outline outline-gray-200 outline-1 rounded-full' type="text"
            placeholder='Choose cuisine' />
        </div>
      </div>
    </aside>
  )
}

function getMain(recipes: Recipe[] | null, difficulties: Difficultie[] | null, pages: number, setCurrentPage: Function,
  diets: Diet[] | null, cuisines: Cuisine[] | null, comments: Comment[] | null) {
  return (
    <main className='flex flex-col place-items-center lg:w-3/4 w-full'>
      <div className='flex flex-row justify-start w-5/6 mt-6'>
        <span>Results for</span>
      </div>
      <div className='w-5/6'>
        <span className='text-2xl mt-2'>Recipes found for your seach criteria</span>
      </div>
      <div className='w-full flex flex-col place-items-center '>
        {recipes != null && recipes.length == 0
          ?
          recipes.map(recipe => (
            <div className='flex flex-row justify-between shadow-xl h-60 rounded-3xl mb-5 w-5/6'>
              <div className='flex flex-row m-5 justify-between w-4/6'>
                <div className='w-52 h-52 flex place-items-center'>
                  <img src={BASE_URL + recipe.image} className='max-w-52 max-h-52 rounded-3xl' />
                </div>
                <div className='flex flex-col ml-5 overflow-hidden'>
                  <span className='text-xl'>
                    {recipe.name}
                  </span>
                  <p className='flex flex-row flex-wrap w-4/6 gap-x-1.5 mt-2'>
                    <span className='font-bold mr-1'>
                      Ingredients:
                    </span>
                    {recipe.ingredients.map(ingredient => (
                      <p>
                        {ingredient}
                        {recipe.ingredients[recipe.ingredients.length - 1] != ingredient ?
                          <>,</>
                          : <></>
                        }
                      </p>
                    ))}
                  </p>
                  <p className='w-4/6 mt-2 max-[1250px]:invisible'>
                    <span className='font-bold mr-1'>
                      Steps:
                    </span>
                    {recipe.instructions}
                  </p>
                  {getComment(recipe.id, comments)}
                </div>
              </div>
              <div className='mt-5 mr-8 flex flex-col'>
                <div className='h-5 flex place-items-center justify-center'>
                  {getRating(recipe.id, comments)}
                </div>
                <div className='h-5 mt-8 flex place-items-center justify-center'>
                  <span className='outline outline-[0.9px] rounded-full p-2 '>
                    {difficulties != null ?
                      difficulties[recipe.difficultyId - 1].name
                      : ""
                    }
                  </span>
                </div>
                <div className='h-5 mt-8 flex place-items-center justify-center'>
                  <span className='outline outline-[0.9px] rounded-full p-2 '>
                    {diets != null ?
                      diets[recipe.dietId - 1].name
                      : ""
                    }
                  </span>
                </div>
                <div className='h-5 mt-8 flex place-items-center justify-center'>
                  <span className='outline outline-[0.9px] rounded-full p-2 '>
                    {cuisines != null ?
                      cuisines[recipe.cuisineId - 1].name
                      : ""
                    }
                  </span>
                </div>
              </div>
            </div>
          ))
          :
          <span className='mt-10'>
            "No dishes found"
          </span>
        }
      </div>
      <div className='flex flex-row gap-5'>
        {(() => {
          const arr = [];
          for (let i = 0; i < pages; i++) {
            arr.push(
              <button className='rounded-full p-2' onClick={chooseCurrentPage(i, setCurrentPage)}>
                {i + 1}
              </button>
            );
          }
          return arr;
        })()}
      </div>
    </main>

  )
}

function getRating(recipeId: number, comments: Comment[] | null) {
  let node = null
  comments?.forEach((comment, _) => {
    if (comment.recipeId == recipeId) {
      node = (
        <span className='outline outline-[0.9px] rounded-full p-2 '>
          {comment.rating}
          <FontAwesomeIcon icon={faStar} className='ml-1' />
        </span>
      )
    }
  })
  return node
}

function getComment(recipeId: number, comments: Comment[] | null) {
  let node = null
  comments?.forEach((comment, _) => {
    if (comment.recipeId == recipeId) {
      node = (
        <p className='w-4/6 visible mt-2 max-[1250px]:invisible max-[1250px]:h-0'>
          <span className='font-bold mr-1'>
            Comment:
          </span>
          {comment.comment}
        </p>
      )
    }
  })
  return node
}

function getCuisineName(cuisines: Cuisine[] | null, cuisine: string): number | null {
  let cuisineId: number | null = null
  cuisines?.forEach((val) => {
    if (cuisine != '' && val.name.toLowerCase().includes(cuisine.toLowerCase())) {
      console.log(val.name)
      cuisineId = val.id
    }
  })
  return cuisineId
}

export default Search;
