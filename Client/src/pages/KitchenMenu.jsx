import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Tag, ChefHat, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const KitchenMenu = () => {
    const { id } = useParams();
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKitchen = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/kitchen/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch kitchen details.");
                }

                const data = await response.json();
                setMenus(data || []);
            } catch (err) {
                console.error("Error fetching menus:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKitchen();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-2 text-lg font-medium text-orange-900">Loading delicious menu...</span>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-red-500 text-xl font-semibold mb-2">Oops! Something went wrong</div>
            <p className="text-gray-600">{error}</p>
        </div>
    );

    if (menus.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ChefHat className="w-16 h-16 text-orange-400 mb-4" />
            <p className="text-xl font-medium text-orange-900">Our chef is preparing the menu...</p>
        </div>
    );

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="relative text-center mb-16">
    {/* Text Content Centered */}
    <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-orange-100 text-orange-800 font-medium text-sm mb-4">
            <ChefHat className="w-4 h-4" />
            <span>Professional Kitchen Service</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
            Our Culinary Delights
        </h1>
        <p className="text-lg text-orange-700">
            Discover our carefully curated menu featuring the finest ingredients
            and expert craftsmanship in every dish.
        </p>
    </div>

    {/* Customize Button Right Side */}
   <Link to={`/kitchen/${id}/customize-food`}>
   <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-all">
        Customize Your Food
    </button>
   </Link>
</div>



                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menus.map((item, index) => (
                        <div key={index}
                            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-orange-200 h-full flex flex-col">

                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-orange-500 mr-1" />
                                        <span className="font-semibold text-orange-800">{item.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-orange-900">{item.name}</h3>
                                    <span className="text-lg font-bold text-orange-600">{item.price} PKR</span>
                                </div>

                                <div className="space-y-3 flex-grow">
                                    <div className="flex items-center text-orange-600">
                                        <Tag className="w-4 h-4 mr-2" />
                                        <span className="text-sm">{item.category}</span>
                                    </div>

                                    {/* Description with Fixed Height */}
                                    <p className="text-orange-700 text-sm line-clamp-2 h-12">{item.description}</p>

                                    {/* Ingredients Section with Min Height */}
                                    <div className="pt-4 border-t border-orange-200 min-h-16">
                                        <div className="flex flex-wrap gap-2">
                                            {item.ingredients.split(',').map((ingredient, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full"
                                                >
                                                    {ingredient.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Button at Bottom */}
                                <button className="mt-auto w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium 
                                                 hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KitchenMenu;
