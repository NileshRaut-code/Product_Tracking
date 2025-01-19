import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import SubmissionMap from "./Submissionmap";
const Profile = ({ data }) => {
  const userData = data;
  const badges = [
    {
      src: "https://leetcode.com/static/images/badges/2022/lg/2022-annual-50.png",
      alt: "50 Days Badge 2022",
      size: "56px",
    },
    {
      src: "https://assets.leetcode.com/static_assets/marketing/lg50.png",
      alt: "50 Days Badge 2023",
      size: "72px",
    },
    {
      src: "https://assets.leetcode.com/static_assets/public/images/badges/dcc-2023-10.png",
      alt: "Oct LeetCoding Challenge",
      size: "56px",
    },
  ];
  let value = userData.totalSolved;
  let max = 3368;
  const percentage = (value / max) * 100;
  const radius = 78; // Radius of the circle
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      {" "}
      <div className=" min-h-screen flex flex-col bg-[#1a1a1a]">
        <nav className="flex items-center justify-between bg-[#282828] px-4 py-3 text-white shadow-md">
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <div className="hidden h-6 px-6 dark:flex">
              <img
                src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
                alt="LeetCode Logo"
              />
            </div>
            <div className="flex gap-6 ">
              <h1 className="text-lg text-[#fff9] cursor-pointer">Explore</h1>
              <Link to={"/problems"}>
                <h1 className="cursor-pointer text-lg text-[#fff9]">
                  Problems
                </h1>
              </Link>
              <h1 className="text-lg text-[#fff9] cursor-pointer">Contest</h1>
              <h1 className="text-lg text-[#fff9] cursor-pointer">Discuss</h1>
              <h1 className="text-lg text-[#fff9] cursor-pointer">Interview</h1>
              <h1 className="text-lg text-yellow-500 cursor-pointer">Store</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-bell"></i>
            </button>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-cog"></i>
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-lg-full overflow-hidden">
              <img
                src="https://assets.leetcode.com/users/avatars/avatar_1641729009.png"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-yellow-500 bg-yellow-900  px-2 py-1 rounded-lg-md text-sm font-bold">
              Premium
            </div>
          </div>
        </nav>

        <div className="flex flex-row py-6 px-12 gap-4 min-h-[90vh] ">
          <div className="bg-[#282828] rounded-lg  min-w-[24vw] min-h-[90vh]">
            <div className="flex flex-col py-6 px-4">
              <div className="flex space-x-4 text-white">
                <div className="relative flex h-20 w-20 shrink-0">
                  <img
                    src={
                      "https://assets.leetcode.com/users/avatars/avatar_1641729009.png"
                    }
                    alt="Avatar"
                    className="h-22 w-22 rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center" translate="no">
                    <div className="text-lg text-label-1 dark:text-dark-label-1 break-all text-base font-semibold">
                      Nilesh Vishnu Raut
                    </div>
                  </div>
                  <div className="flex items-center" translate="no">
                    <div className="text-gray-400 text-xs">_NileshRaut</div>
                    <div className="ml-1">
                      <img
                        src="https://assets.leetcode.com/static_assets/others/%E5%85%A5%E9%97%A8.png"
                        alt="https://assets.leetcode.com/static_assets/others/%E5%85%A5%E9%97%A8.png"
                        className="h-[12px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 items-end space-x-[5px] text-base text-lg">
                    <span className="text-gray-400">Rank</span>
                    <span className=" font-medium">334,082</span>
                  </div>
                </div>
              </div>
              <div className="py-4 text-gray-400 ">
                Interest : - C++ , DS and Algo , Machine learning , Deep
                Learinig ,Blogging . Experience : 1)Python and MongoDB developer
                Intern @ Alamanet 2)Machine learning - Suven Consultant 3)Azure
                Dev and learner @ Microsoft ( Future Ready Talent )
              </div>
            </div>
            <div className="px-4">
              <div className="bg-[#2cbb5d1f]  text-[#2cbb5d] dark:text-dark-green-s hover:text-green-s dark:hover:text-dark-green-s w-full rounded-lg py-[7px] text-center font-medium">
                Edit Profile
              </div>
            </div>
          </div>
          <div className=" rounded-lg  min-w-[69vw] min-h-[90vh] gap-1 flex flex-col text-white">
            <div className="  flex flex-row justify-between px-2 gap-1">
              <div className="bg-[#282828] rounded-lg min-w-[33vw] min-h-[190px] flex flex-row justify-around">
                <div className="flex items-center justify-center text-white">
                  <svg width="200" height="200" className="rotate-[90deg]">
                    {/* Background Circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r={radius}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r={radius}
                      fill="none"
                      stroke="#ffb700" // Gradient for progress color
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={
                        circumference - (percentage / 100) * circumference
                      }
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Text in the center */}
                  <div className="absolute text-center">
                    <p className="text-lg font-bold">
                      <span className="text-3xl">{value}</span>/{max}
                    </p>
                    <p>✔️Solved</p>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly">
                  <div className="w-[90px]  h-[44px] bg-[#353535] rounded flex flex-col">
                    <h1 className="text-[#1cbaba] text-md flex justify-center items-center">
                      {" "}
                      Easy
                    </h1>
                    <h1 className=" text-sm flex justify-center items-center">
                      {" "}
                      {userData.easySolved}/ {userData.totalEasy}
                    </h1>
                  </div>
                  <div className="w-[90px]  h-[44px] bg-[#353535] rounded flex flex-col">
                    <h1 className="text-[#ffb700] text-md flex justify-center items-center">
                      {" "}
                      Easy
                    </h1>
                    <h1 className=" text-sm flex justify-center items-center">
                      {" "}
                      {userData.mediumSolved}/ {userData.totalMedium}
                    </h1>
                  </div>
                  <div className="w-[90px]  h-[44px] bg-[#353535] rounded flex flex-col">
                    <h1 className="text-[#f63737] text-md flex justify-center items-center">
                      {" "}
                      Easy
                    </h1>
                    <h1 className=" text-sm flex justify-center items-center">
                      {" "}
                      {userData.hardSolved}/ {userData.totalHard}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="bg-[#282828] rounded-lg min-w-[33vw] min-h-[190px]">
                <div className="p-4">
                  {/* Header Section */}
                  <div className="flex items-start justify-between">
                    {/* Badges Count */}
                    <div>
                      <div className="text-label-3 dark:text-dark-label-3 text-xs">
                        Badges
                      </div>
                      <div className="text-label-1 dark:text-dark-label-1 mt-1.5 text-2xl leading-[18px]">
                        4
                      </div>
                    </div>
                    {/* Arrow Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="h-[24px] w-[24px] text-label-3 dark:text-dark-label-3 cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.586 13H3a1 1 0 110-2h15.586L12 4.414A1 1 0 0113.414 3l8.293 8.293a.997.997 0 01-.003 1.417L13.414 21A1 1 0 0112 19.586L18.586 13z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  {/* Badges Display Section */}
                  <div className="flex items-center justify-center my-4">
                    {badges.map((badge, index) => (
                      <div
                        key={index}
                        className={`mr-[28px] h-[${badge.size}] w-[${badge.size}]`}
                        style={{ height: badge.size, width: badge.size }}
                      >
                        <img
                          src={badge.src}
                          alt={badge.alt}
                          className="h-full w-full cursor-pointer object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Most Recent Badge Section */}
                  <div className="text-label-3 dark:text-dark-label-3 text-xs">
                    Most Recent Badge
                  </div>
                  <div className="text-label-1 dark:text-dark-label-1 text-base">
                    50 Days Badge 2023
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 py-4">
              <div className="bg-[#282828] rounded-lg-lg min-h-[190px] flex justify-center items-center">
                {userData.submissionCalendar && <SubmissionMap submissionData={userData.submissionCalendar} />}
              </div>
            </div>
            <div className="px-2">
              <div className="bg-[#282828] rounded-lg min-h-[190px]">
                <div className="max-w-4xl mx-auto p-2">
                  <h1 className="cursor-pointer p-4 rounded-md bg-[#353535] w-fit my-2 t-4 text-white">
                    Recent Submissions
                  </h1>
                  <ul className="space-y-2 mt-4">
                    {userData.recentSubmissions.map((submission, index) => {
                      const relativeTime = moment
                        .unix(submission.timestamp)
                        .fromNow();

                      const bgColor =
                        index % 2 === 0 ? "bg-[#353535]" : "bg-transparent";

                      return (
                        <li
                          key={index}
                          className={`p-4 rounded-md ${bgColor} text-white`}
                        >
                          <div className="flex justify-between">
                            <span className="font-semibold">
                              {submission.title}
                            </span>
                            <span className="text-sm text-gray-400">
                              {relativeTime}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
