"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [url, setUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState('');

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shorturl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}${shorturl}`)
        setUrl('')
        setShortUrl ('')
        console.log(result)
        alert(result.message)
      })
      .catch((error) => console.error(error));
  }
  return (
    <div className="bg-Color  pt-24">
      <div className=" backdrop-blur-md bg-opacity-50 bg-purple-500 p-12 rounded-md w-6/12 m-auto">
        <h1 className="text-3xl font-bold text-white text-center">
          Generate Your URL
        </h1>
        <div className="mt-4 text-center">
          <input
            type="text"
            value={url}
            className="mt-2 w-full p-4 text-xl rounded-md"
            placeholder="Enter Your URL"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />{" "}
          <br />
          <input
            type="text"
            value={shorturl}
            className="mt-2 w-full p-4 text-xl rounded-md"
            placeholder="Enter Your Preferred Short URL text"
            onChange={(e) => {
              setShortUrl(e.target.value);
            }}
          />{" "}
          <br />
          <button onClick={generate} className="bg-purple-700 p-5 rounded-md cursor-pointer text-white hover:bg-purple-600 font-bold mt-2 ">
            Generate
          </button>
        </div>
        {
          generated && (
            <code>
              <>
                <div className="font-bold text-lg">
                  
              Your link is <br /> <Link target="_blank" href={generated}>{generated}</Link>
                </div>
              </>
            </code>
          )
        }
      </div>
    </div>
  );
};

export default page;
