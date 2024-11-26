import { getCategory } from "@/action/category";
import AddCategory from "@/components/category/create";

async function page() {
  const category = await getCategory();
  return (
    <div>
      <>
        <div className="flex justify-around items-center gap-4">
          <div>
            {category?.map((category) => (
              <div key={category.id} className="flex flex-col">
                <ul>
                  <li>{category.name}</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <AddCategory />
          </div>
        </div>
      </>
    </div>
  );
}

export default page;
