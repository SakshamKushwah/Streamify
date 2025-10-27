import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router";
import { MapPinIcon } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("/api/users/friends", { withCredentials: true });
        setFriends(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const getLanguageFlag = (language) => {
    if (!language) return null;
    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];
    if (!countryCode) return null;

    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${language} flag`}
        className="inline-block w-4 h-3 mr-1"
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Your Friends</h1>

          {loading ? (
            <p className="text-lg text-base-content/70">Loading friends...</p>
          ) : friends.length === 0 ? (
            <p className="text-lg text-base-content/70">
              You don’t have any friends yet 😅
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {friends.map((friend) => (
                <div
                  key={friend._id}
                  className="card bg-base-200 shadow-md hover:shadow-lg transition-all w-72 h-88 mx-auto"
                >
                  <div className="card-body flex flex-col items-center justify-between text-center p-5">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                      <div className="avatar">
                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={friend?.profilePic || "/default-avatar.png"}
                            alt={friend?.fullName || "User"}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Name + Email */}
                      <div className="mt-3">
                        <h2 className="font-semibold text-lg text-base-content truncate max-w-[160px] mx-auto">
                          {friend.fullName}
                        </h2>
                        <p className="text-xs text-base-content/60 truncate max-w-[180px] mx-auto">
                          {friend.email}
                        </p>
                      </div>

                      {/* 🌍 Language + Region */}
                      <div className="mt-3 flex flex-col items-center gap-1 text-sm">
                        {friend.nativeLanguage && (
                          <span className="badge badge-secondary">
                            {getLanguageFlag(friend.nativeLanguage)}
                            Native: {friend.nativeLanguage}
                          </span>
                        )}

                        {friend.location && (
                          <div className="flex items-center text-xs opacity-70">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            {friend.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ✅ Message button only */}
                    <div className="card-actions mt-4 w-full">
                      <Link
                        to={`/chat/${friend._id}`}
                        className="btn btn-sm btn-primary w-full"
                      >
                        Message
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FriendsPage;
