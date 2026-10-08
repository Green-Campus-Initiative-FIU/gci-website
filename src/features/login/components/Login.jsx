import React from "react";

export default function Login({ error, handleLogin, handleSignup }) {
  return (
    <section className="max-container padding-container">
      <form className="bg-light-green mx-auto my-16 flex w-full max-w-xl flex-col space-y-2.5 rounded-lg p-8 shadow-md">
        <h1 className="font-staatliches text-4xl text-white">
          Access Your Account
        </h1>
        {error && (
          <p className="rounded bg-red-100 p-2 text-red-700">{error}</p>
        )}

        <label
          htmlFor="email"
          className="font-satoshi px-0.5 font-medium text-white"
        >
          Email:
        </label>
        <input
          className="input"
          id="email"
          name="email"
          type="email"
          placeholder="you@fiu.edu"
          required
        />

        <label
          htmlFor="password"
          className="font-satoshi px-0.5 font-medium text-white"
        >
          Password:
        </label>
        <input
          className="input"
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />

        <div className="h-18 mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <button
            className="bg-celadon hover:bg-dark-green text-dark-green font-staatliches m-0.5 rounded-sm py-2 uppercase hover:text-white"
            formAction={handleLogin}
          >
            Log In
          </button>
          <button
            className="bg-cream hover:bg-dark-green text-dark-green font-staatliches m-0.5 rounded-sm uppercase hover:text-white"
            formAction={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
}
