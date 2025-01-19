import { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { io } from "socket.io-client";
import { Link } from 'react-router-dom';
export default function LeetCodeCloneResizable() {
  const [code, setCode] = useState(`function twoSum(num1, nums2) {\n  // Your code here\n}\n twoSum(1,2)`);
  const [output, setOutput] = useState('');
  const [running, setrunning] = useState(false);
  const [solution, setsolution] = useState(false);

  const [leftWidth, setLeftWidth] = useState(50); // Percentage width for the left panel
  const dividerRef = useRef(null);
  const isDragging = useRef(false);
  function generateClientId() {
    return 'client-' + Math.random().toString(36).substr(2, 9);
}

let  clientId="client-ads";
  const [socket, setSocket] = useState(null); 
  
  // Mouse event handlers
  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const containerWidth = dividerRef.current.parentElement.offsetWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };
  useEffect(() => {
    //clientId = generateClientId();
    const ws = new WebSocket(`ws://localhost:3000?clientId=${clientId}`);

    ws.onopen = () => {
      console.log(`Connected to WebSocket server as client ${clientId}`);
    };

    ws.onmessage = (event) => {
      console.log("started");
      
      const message = JSON.parse(event.data);
      
        setOutput(`Output: ${message.output}\nTest Cases ${message.status? "Passed": "Failed"}: 1/1`);
       // setRunning(false);
      
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for client ${clientId}`);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setSocket(ws);

    // Cleanup connection on unmount
    return () => {
      ws.close();
    };
  }, [clientId]);
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Simulating code run
  const handleRunCode = () => {
    console.log(clientId);
    
    setrunning(true)
    setOutput('Running...');
    const data=JSON.stringify({name:"nilesh", year:"js", language:code,clientId })
    console.log(data);
    
    fetch("http://localhost:3000/send",{
      method: 'post',
      headers: { "Content-Type": "application/json" },

      body: data
      
     }).then((res)=>{
  
     }).catch((err)=>{
      console.log(err)
     })

  };

  return (
    <div className='h-screen flex flex-col'>
      <nav className="flex items-center justify-between bg-black px-4 py-2 text-white shadow-md">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
        <div className="hidden h-5 dark:flex">
        <img
                    src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
                    alt="LeetCode Logo"
                  /> 
                  </div> 
                  <div className="flex items-center">
          {/* Problem List */}
          <div className="lc-md:flex group items-center rounded hover:bg-fill-tertiary dark:hover:bg-fill-tertiary">
            <div
              className="group/nav-back cursor-pointer flex items-center h-8 px-2 transition hover:bg-fill-quaternary dark:hover:bg-fill-quaternary text-gray-60 dark:text-gray-60"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 64C0 77.3 10.7 88 24 88H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24C10.7 40 0 50.7 0 64zM192 192c0 13.3 10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H216c-13.3 0-24 10.7-24 24zm24 104c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H216zM0 448c0 13.3 10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM121 268.4c7.8-6.4 7.8-18.3 0-24.7L26.2 165.6C15.7 157 0 164.4 0 177.9V334.1c0 13.5 15.7 20.9 26.2 12.4L121 268.4z"
                ></path>
              </svg>
              <span className="ml-2 text-sm">Problem List</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <a
            className="flex items-center h-8 w-8 hover:bg-fill-quaternary dark:hover:bg-fill-quaternary text-gray-60 dark:text-gray-60"
            href="/problems/evaluate-reverse-polish-notation"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
              ></path>
            </svg>
          </a>
          {/* <a
            className="flex items-center h-8 w-8 hover:bg-fill-quaternary dark:hover:bg-fill-quaternary text-gray-60 dark:text-gray-60"
            href="/problems/evaluate-reverse-polish-notation"
          >
           <svg  className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z"></path></svg>
          </a> */}
        
        </div>   
                  
                      
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-2">
        <div className="flex divide-x-2 divide-black bg-[#222222] h-[32px] rounded-lg">
  <div className="px-4 flex items-center cursor-pointer"  onClick={handleRunCode}>▶️ Run</div>
  <div className="px-4 flex items-center cursor-pointer">✅ Submit</div>
  <div className="px-4 flex items-center cursor-pointer">🐞 Bug</div>
</div>
          <div className="bg-[#222222] p-2 rounded-lg cursor-pointer">
  <svg 
    className="h-4 w-4  " 
    aria-hidden="true" 
    focusable="false" 
    data-prefix="far" 
    data-icon="alarm-clock" 
    role="img" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512"
  >
    <path 
      fill="currentColor" 
      d="M160 25.4C143 9.6 120.2 0 95.2 0C42.6 0 0 42.6 0 95.2c0 18.8 5.5 36.3 14.9 51.1L160 25.4zM256 112a176 176 0 1 1 0 352 176 176 0 1 1 0-352zm0 400c53.2 0 102.1-18.6 140.5-49.5L439 505c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-42.5-42.5c31-38.4 49.5-87.3 49.5-140.5C480 164.3 379.7 64 256 64S32 164.3 32 288c0 53.2 18.6 102.1 49.5 140.5L39 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l42.5-42.5c38.4 31 87.3 49.5 140.5 49.5zM497.1 146.4C506.5 131.6 512 114 512 95.2C512 42.6 469.4 0 416.8 0C391.8 0 369 9.6 352 25.4L497.1 146.4zM280 184c0-13.3-10.7-24-24-24s-24 10.7-24 24V288c0 6.4 2.5 12.5 7 17l48 48c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-41-41V184z"
    ></path>
  </svg>
</div>

<div className="bg-[#222222] p-2 rounded-lg cursor-pointer">  <svg 
    className="h-4 w-4  " 
    aria-hidden="true" 
    focusable="false" 
    data-prefix="far" 
    data-icon="note-sticky" 
    role="img" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512"
  >
    <path 
      fill="currentColor" 
      d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z"
    ></path>
  </svg>
</div>

        
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-bell"></i>
          </button>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-cog"></i>
          </button>
         <Link to={"/p/_NileshRaut"}> <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden">
            <img
              src="https://assets.leetcode.com/users/avatars/avatar_1641729009.png"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div></Link>
          <div className="text-yellow-500 bg-yellow-900  px-2 py-1 rounded-md text-sm font-bold">Premium</div>

        </div>
      </nav>

    
      <div className="flex flex-1 overflow-hidden text-white gap-1 bg-black ">
        {/* Problem Description */}
        
        <div
          className="bg-[#222222]  my-2  rounded-lg ml-4  "
          style={{ width: `${leftWidth}%` }}
        >
              <div  className='bg-[#333333] h-10 flex flex-row rounded-t-lg sticky top-0 z-10'>
          <div className='p-2 flex items-center text-md cursor-pointer' onClick={()=>{setsolution(true)}}><p className='border-r border-[#222222] px-2'>💯 Solution </p></div>
            <div className='p-2 flex items-center text-md cursor-pointer'onClick={()=>{setsolution(false)}} >💁🏻 Description</div>
          </div>
          <div className='overflow-y-auto max-h-[80vh]  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
{!solution && <div className='p-4 '>
        <h2 className="text-lg font-bold mb-4">Two Sum</h2>
          <p>
            Given an array of integers <code>nums</code> and an integer <code>target</code>, return
            indices of the two numbers such that they add up to <code>target</code>.
          </p>
          <p className="mb-4">
            You may assume that each input would have exactly one solution, and you may not use the
            same element twice.
          </p>
          <p>You can return the answer in any order.</p>
          <h3 className="font-bold mt-4 mb-2">Example 1:</h3>
          <pre className="bg-gray-700 p-2 rounded">
            <code>
              Input: nums = 1, target = 1{'\n'}
              Output: 2{'\n'}
              Explanation: nums+target = 2, return 2.
            </code>
          </pre>
          <h3 className="font-bold mt-4 mb-2">Example 2:</h3>
          <pre className="bg-gray-700 p-2 rounded">
            <code>
              Input: nums = 2, target = -1{'\n'}
              Output: 1{'\n'}
              Explanation: nums+target = 1, return 1.
            </code>
          </pre>
          <h3 className="font-bold mt-4 mb-2">Constraints:</h3>
          <ul className="list-disc list-inside">
            <li>2 ≤ nums.length ≤ 10⁴</li>
            <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
            <li>-10⁹ ≤ target ≤ 10⁹</li>
            <li>Only one valid answer exists.</li>
          </ul>
        </div>}

        {solution && <div className='p-4'>
        <h2 className="text-lg font-bold mb-4">Two Sum</h2>
        <pre className="bg-gray-700 p-2 rounded">
        <code>
        {`function twoSum(num1, num2) {\n\nreturn num1+nums2;\n \n}\ntwoSum(1,2)`}
        </code></pre>
        </div>}
          </div>
        


        </div>

        <div
          ref={dividerRef}
          onMouseDown={handleMouseDown}
          className="w-1 bg-black  hover:bg-gray-500 cursor-col-resize"
        ></div>

        <div
          className="flex flex-col my-2 rounded-lg bg-[#222222] mr-4"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className='bg-[#333333] h-10 flex flex-row rounded-t-lg sticky top-0 z-10 '>
          <div className='p-2 flex items-center text-md cursor-pointer'><p className='border-r border-[#222222] px-2'>🚇  Submission </p></div>
            <div className='p-2 flex items-center text-md cursor-pointer' onClick={()=>{setrunning(false)}}>🧑🏻‍💻 Code</div>
          </div>
       {!running &&   <div className="flex-1 rounded-lg p-[2px] ">
            <CodeMirror
              value={code}
              height="81vh"
              theme={vscodeDark}
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
            />
          </div>}

       
        {running &&  <div className="p-4 bg-gray-800 dark:bg-[#222222]">
            <h3 className="font-bold">Output:</h3>
            <pre className="bg-gray-700 p-2 rounded">{output}</pre>
          </div>}
        </div>
      </div>
    </div>
  );
}
