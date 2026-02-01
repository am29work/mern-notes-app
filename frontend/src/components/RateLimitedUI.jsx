import { useState } from "react"; // Fix 2: Added import
import { ZapIcon } from "lucide-react"; // Fix 1: Removed ZepIcon typo
import Navbar from "../components/Navbar";

const RateLimitedUI = () => {   
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center p-6 gap-4">
                    {/* Added bg- prefix here */}
                    <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full border border-primary/30">
                        <ZapIcon className="size-10 text-primary" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        {/* Changed front-bold to font-bold */}
                        <h3 className="text-xl font-bold mb-2"> Rate Limit Reached</h3>
                        <p className="text-base-content mb-1">
                            You have reached the rate limit. Please try again later.
                        </p>
                        <p className="text-sm text-base-content/70">
                            Try again in a few seconds for the best experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RateLimitedUI;