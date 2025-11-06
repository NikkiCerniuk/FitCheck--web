"use client" 
//use client is so Next.js(react framework. analogous to springboot for java backend) knows its a client component. 
//present UI, collect data, request a callback 
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

/*
//here we say onAddItem is a prop and then with the second part we explain what it should look like
//void means that the function does not return anything
*/

type ClothingItem = {
  name: string;
  category: string;
};

export function AddClothingItem({
  onAddItem,
}: {
  onAddItem: (item: ClothingItem) => void | Promise<void> //promise void means that the promise resolves w no value
}) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState(""); //only need to explicitly specify the type when it is a null or undefined inital value


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { //this is the type of event for form related events like onSubmit and onInput
    e.preventDefault();//prevents the page from reloading
    setStatus("saving");
    setMessage("Saving item...");

    try {
      //below executes if both name and category are present 
      await (onAddItem({ name: name.trim(), category }));
      setName(""); //blanks out name after successfully adding an item
      setCategory(""); //blanks out category after successfully adding an item
      setStatus("success");
      setMessage("Item successfully added to wardrobe!");

      setTimeout(() => { //shows something briefly to the user then hides it 
        setStatus("idle");
        setMessage("");
      }, 3000);


    } catch (err) {
      setStatus("error");
      setMessage("Couldn’t save item. Please try again.")

    }
  }



  /* I focused on the SWE parts like error handling - NC */
  return (

    <div className="min-h-screen container mx-auto px-6 py-16">
        {/* Header */}

        <div className="text-center mb-16">
          <h1 className="text-black mt-4 font-brand font-[600] uppercase tracking-[0.22em] text-4xl mb-5">
            FitCheck
          </h1>
          <svg className="mx-auto mt-1 mb-7" width="80" height="2" viewBox="0 0 80 2" fill="none">
            <line x1="0" y1="1" x2="80" y2="1" stroke="#999" strokeWidth="1" />
          </svg>

          <p className="mb-15 text-muted-foreground font-[semibold] max-w-xl mx-auto tracking-wide text-xl">
            Add a new piece to your wardrobe collection
          </p>
        </div>

        {/* Card */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white text-card-foreground shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 sm:p-12 pb-20">
            <div className="mb-10">
              <h2 className="font-brand font-[500] tracking-[0.1em] uppercase text-[20px] text-center mb-2">
                New Item
              </h2>
              <svg className="flex justify-center mx-auto" width="50" height="2" viewBox="0 0 80 2" fill="none">
                <line x1="0" y1="1" x2="80" y2="1" stroke="#999" strokeWidth="1" />
              </svg>
            </div>


            <form
              className="space-y-6 sm:space-y-8" 
              onSubmit={handleSubmit}
            >
              {/* Item Name */}
              <div className="space-y-2 sm:space-y-3 mt-17">
                <label
                  htmlFor="item-name"
                  className="block mb-3 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                >
                  Item Name *
                </label>
                <input
                  style={{
                    height: '70px',
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "12px",
                  }}
                  id="item-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Black Leather Jacket"
                  autoComplete="off"
                  required
                  className="mb-8 font-[500] text-[25px]  w-full rounded-md border border-gray-200 bg-gray-100 px-4 outline-none transition-colors focus:border-black/30"
                />
              </div>

              {/* Category */}
              <div className="space-y-2 sm:space-y-3">
                <label
                  htmlFor="category"
                  className="block mb-3 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                >
                  Category *
                </label>

                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="font-[500] text-[25px] w-full rounded-md border border-gray-200 bg-white px-4 tracking-wide appearance-none cursor-pointer focus:outline-none focus:border-black/30 hover:border-black/20 transition-all pr-8"

                    style={{
                      height: '70px',
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "12px",
                    }}

                  >
                    <option value="">Select a category</option>
                    <option value="JACKET">jacket</option>
                    <option value="TOP">top</option>
                    <option value="BOTTOM">bottom</option>
                    <option value="SOCKS">socks</option>
                    <option value="SHOES">shoes</option>


                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </div>




              {/* CTA */}
              <div className="mb-8" style={{ marginTop: '5rem' }}>
                <button
                  type="submit"
                  disabled={!name.trim() || !category || status === "saving"} //=== is a strict inequality where its only true if the type and value are both the same 
                  className="w-full border-0 !border-0 !bg-black !text-white tracking-[0.2em] uppercase text-[20px] font-[600] hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{
                    height: '90px',
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "12px",

                  }}// question mark below means htat if the status is "saving" then display "Saving..."
                >
                  {status === "saving" ? "Saving..." : "Add to Wardrobe"}
                </button>
              </div>


          {/*inline message for add to wardrobe status*/}
          {message && (
          <div
            role={status ==="error" ? "alert": "status"}
            aria-live="polite"
            className={
              status === "error"
              ? "mb-6 bg-red-50 px-3 py-2 text-red-800"
              : "mb-6 bg-green-50 px-3 py-2 text-green-800"
            }
            >
              {message}
          </div>
          )}
            </form>
          </div>
        </div>
      </div>
  );
}



// end of AddClothingItem