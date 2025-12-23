import { useDispatch, useSelector } from "react-redux";
import { updateAddItemField, resetAddItemForm } from "../redux/restaurant-features/addItemSlice";
import { useAddItemMutation } from "../redux/restaurant-features/restaurantApi";
function AddItemForm() {

    const dispatch = useDispatch();
      const foodItem = useSelector((state) => state.addItem);
      const [addItem, { isLoading, data, error }] = useAddItemMutation();
      const handleChange = (e) => {
        dispatch(
          updateAddItemField({
            field: e.target.name,
            value: e.target.value,
          })
        );
      };
    
      const handleSubmit = async () => {
      try {
        // Call RTK Query mutation with signup data
        const result = await addItem(foodItem); 
        // Optionally reset form here
        dispatch(resetAddItemForm());
      } catch (err) {
        console.error("Add Item failed:", err);
      }
    };
    

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Food Item Manager</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Food Name</label>
          <input
            type="text"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            placeholder="Enter food name"
          />
        </div>

        {/* DESCRIPTION TEXTAREA */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={foodItem.description}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            rows="3"
            placeholder="Write detailed description..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Original Price (₹)</label>
          <input
            type="number"
            name="originalPrice"
            value={foodItem.originalPrice}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            placeholder="Original price"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={foodItem.discount}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            placeholder="Discount percentage"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={foodItem.category}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
          >
            <option value="">Select Category</option>
            <option value="Pizza">Pizza</option>
            <option value="Lassi">Lassi</option>
            <option value="Biryani">Biryani</option>
            <option value="">Juice</option>
            <option value="">Dessert</option>
          </select>
        </div>

        {/* IMAGE URL + PREVIEW */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={foodItem.image}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            placeholder="Paste image link"
          />

          {/* Preview */}
          {foodItem.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img
                src={foodItem.image}
                alt="Preview"
                className="w-full object-cover rounded-xl border"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700"
        >
          Add Food Item
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;