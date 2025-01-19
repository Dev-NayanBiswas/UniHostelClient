import { useState } from "react"

function CategoryMeals(){
    const [category, setCategory] = useState(null);


    function handleTabs(cat){
        setCategory(cat);
    }

    console.log(category);

  return (
    <>
    <section>
        <section className="flex justify-between items-center bg-transparent rounded-e-full rounded-s-full border-[2px] border-logo-yellow overflow-hidden lg:w-5/12 md:w-10/12 w-full mx-auto">
            <button onClick={()=>handleTabs("breakfast")}  className={category === 'breakfast' ? "tabActive" : "tabInActive"}>Breakfast</button>
            <button onClick={()=>handleTabs("lunch")}  className={category === 'lunch' ? "tabActive" : "tabInActive"}>Lunch</button>
            <button onClick={()=>handleTabs("dinner")}  className={category === 'dinner' ? "tabActive" : "tabInActive"}>Dinner</button>
            <button onClick={()=>handleTabs(null)}  className={!category ? "tabActive" : "tabInActive"}>All</button>
        </section>
        <section></section>
    </section>
    </>
  )
}

export default CategoryMeals