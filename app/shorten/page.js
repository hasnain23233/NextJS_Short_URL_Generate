"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Link2, Copy, Check, Loader2, ArrowRight } from "lucide-react";

const Page = () => {
  const [url, setUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!url || !shorturl) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    setGenerated("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shorturl }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong. Try again.");
        return;
      }

      setGenerated(`${process.env.NEXT_PUBLIC_HOST}${shorturl}`);
      setUrl("");
      setShortUrl("");
    } catch (err) {
      console.error(err);
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#0E0E13] pt-24 pb-16 px-4">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
            <Link2 size={13} className="text-[#FFB100]" />
            Link generator
          </div>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Turn a long link into{" "}
            <span className="text-[#FFB100]">short/url</span>
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/40">
                Destination URL
              </label>
              <input
                type="text"
                value={url}
                className="w-full rounded-lg border border-white/10 bg-[#0E0E13] p-3.5 text-white placeholder-white/30 outline-none transition-colors focus:border-[#FFB100]"
                placeholder="https://example.com/your-long-link"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/40">
                Custom slug
              </label>
              <div className="flex items-center rounded-lg border border-white/10 bg-[#0E0E13] focus-within:border-[#FFB100]">
                <span className="pl-3.5 text-sm text-white/30">
                  {process.env.NEXT_PUBLIC_HOST}
                </span>
                <input
                  type="text"
                  value={shorturl}
                  className="w-full bg-transparent p-3.5 pl-1 text-white placeholder-white/30 outline-none"
                  placeholder="my-link"
                  onChange={(e) => setShortUrl(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              onClick={generate}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFB100] p-3.5 font-semibold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Shorten link
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {generated && (
            <div className="mt-6 rounded-lg border border-[#FFB100]/30 bg-[#FFB100]/10 p-4">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-white/40">
                Your link is ready
              </p>
              <div className="flex items-center justify-between gap-3">
                <Link
                  target="_blank"
                  href={generated}
                  className="truncate font-mono text-sm text-[#FFB100] hover:underline"
                >
                  {generated}
                </Link>
                <button
                  onClick={handleCopy}
                  className="flex shrink-0 items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  {copied ? (
                    <>
                      <Check size={13} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;