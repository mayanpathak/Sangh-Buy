import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StartSaving = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start Saving Today
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create a new pool or browse existing ones to start saving money together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Create Pool Button */}
          <Button
            onClick={() => navigate("/create-pool")}
            className="h-48 text-left p-8 bg-sangh-600 hover:bg-sangh-700 dark:bg-sangh-700 dark:hover:bg-sangh-800 flex flex-col items-start justify-between group transition-all duration-200"
          >
            <Plus className="h-8 w-8 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Create Pool</h3>
              <p className="text-sm opacity-90">
                Start a new savings pool and invite others to join
              </p>
            </div>
          </Button>

          {/* Browse Pools Button */}
          <Button
            onClick={() => navigate("/browse-pools")}
            variant="outline"
            className="h-48 text-left p-8 border-2 hover:border-sangh-600 dark:hover:border-sangh-400 flex flex-col items-start justify-between group transition-all duration-200"
          >
            <Search className="h-8 w-8 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Browse Pools</h3>
              <p className="text-sm opacity-90">
                Explore and join existing savings pools
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartSaving; 