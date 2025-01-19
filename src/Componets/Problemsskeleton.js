import React from "react";
import { Link } from "react-router-dom";

const Problemsskeleton = () => {
  // Skeleton placeholders
  const cimages = Array(3).fill({ src: "" });
  const studyplan = Array(6).fill({ src: "", name: "", des: "" });

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] ">
      {/* Navbar */}
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
            <h1 className="text-lg text-[#fff9]">Explore</h1>
            <Link to={"/problems"}>
              <h1 className="text-lg text-[#fff9]">Problems</h1>
            </Link>
            <h1 className="text-lg text-[#fff9]">Contest</h1>
            <h1 className="text-lg text-[#fff9]">Discuss</h1>
            <h1 className="text-lg text-[#fff9]">Interview</h1>
            <h1 className="text-lg text-yellow-500">Store</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 mx-8">
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-bell"></i>
          </button>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-cog"></i>
          </button>
          <Link to={"/p/_NileshRaut"}>
            <div className="w-8 h-8 bg-gray-600 rounded-lg-full overflow-hidden rounded-3xl ">
              <img
                src="https://assets.leetcode.com/users/avatars/avatar_1641729009.png"
                alt="User Avatar"
                className="w-full h-full object-cover "
              />
            </div>
          </Link>
          <div className="text-yellow-500 bg-yellow-700 backdrop-blur-lg	  px-4 py-[7.5px] rounded-lg-md text-sm font-bold rounded-lg">
            Premium
          </div>
        </div>
      </nav>

      <div className="flex flex-row gap-8">
        <div className="w-[75.5%] my-16 ml-4">
          <div className="flex flex-row gap-8 flex-wrap mb-8">
            {cimages.map((_, index) => (
              <div
                key={index}
                className="w-[300px] h-[150px] bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>

          <div className="flex flex-row justify-between mb-4">
            <h2 className="text-2xl text-gray-400 font-bold">
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
            </h2>
            <h2 className="text-blue-300 cursor-pointer">
              <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
            </h2>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            {studyplan.map((_, index) => (
              <div
                key={index}
                className="flex flex-row bg-[#2a2a2a] min-w-[310px] max-h-[88px] rounded-lg gap-2"
              >
                <div className="w-[72px] h-[72px] bg-gray-700 rounded-lg m-[8px] animate-pulse"></div>
                <div className="flex flex-col justify-center w-full">
                  <div className="h-4 w-24 bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 w-40 bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <table className="w-full mt-16 table-auto">
              <thead>
                <tr className="text-gray-400 border-b-2 border-[#222222] h-[40px]">
                  {["Status", "Title", "Solution", "Acceptance", "Difficulty", "Frequently"].map(
                    (header, index) => (
                      <th key={index}>
                        <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "" : "bg-[#2a2a2a]"
                      } h-[50px]`}
                    >
                      {Array(6)
                        .fill()
                        .map((_, idx) => (
                          <td key={idx} className="py-2">
                            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[24.5%] my-16 mr-4 ">
<div className="shadow-lg">
  <div className="p-2 dark:bg-[#2a2a2a] bg-white rounded-t">
    <div className="px-8 flex items-center justify-between">
      <span
        tabIndex="0"
        className="focus:outline-none  text-sm font-bold dark:text-gray-100 text-gray-800"
      >
        Day 8
      </span>
      <div className="flex items-center">
        <button
          aria-label="calendar backward"
          className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-left"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <img
          alt="as"
          className="w-[50px] h-[60px] -mt-8"
          src="https://leetcode.com/static/images/badges/2024/lg/2024-12.png"
        />
        <button
          aria-label="calendar forward"
          className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler  icon-tabler-chevron-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between pt-12 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  Mo
                </p>
              </div>
            </th>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  Tu
                </p>
              </div>
            </th>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  We
                </p>
              </div>
            </th>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  Th
                </p>
              </div>
            </th>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  Fr
                </p>
              </div>
            </th>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  Sa
                </p>
              </div>
            </th>
            <th>
              <div className="w-full flex justify-center">
                <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                  Su
                </p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pt-6">
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
            </td>
            <td className="pt-6">
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
            </td>
            <td className="pt-6">
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  1
                </p>
              </div>
            </td>
            <td className="pt-6">
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  2
                </p>
              </div>
            </td>
            <td className="pt-6">
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  3
                </p>
              </div>
            </td>
            <td className="pt-6">
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  4
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  5
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  6
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  7
                </p>
              </div>
            </td>
            <td>
              <div className="w-full h-full">
                <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                  <Link
                    role="link"
                    tabIndex="0"
                    className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-sm w-8 h-8 flex items-center justify-center font-medium text-white bg-[#2cbb5d] rounded-full"
                  >
                    8
                  </Link>
                </div>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  9
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  10
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  11
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  12
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  13
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  14
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  15
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  16
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  17
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  18
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  19
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  20
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  21
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  22
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  23
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  24
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  25
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  26
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  27
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  28
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  29
                </p>
              </div>
            </td>
            <td>
              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">
                  30
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
      </div>
    </div>
  );
};

export default Problemsskeleton;


