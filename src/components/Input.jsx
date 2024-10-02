/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const Input = ({ icon: Icon, text }) => {
  return (
    <div>
      <div className="relative   rounded-md shadow-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1.5">
          {Icon ? (
            <Icon className="text-gray-500 h-5 w-5 xs:text-xs" />
          ) : (
            <span className="text-gray-500 xs:text-xs">{text}</span>
          )}
        </div>
        <input
          id="price"
          name="price"
          type="text"
          placeholder="Search Node"
          className="block w-40 rounded-md border-0 py-1 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
