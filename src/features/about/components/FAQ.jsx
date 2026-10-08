import data from "../constants/FAQData";

export default function FAQ() {
  return (
    <div className="max-container padding-container py-10">
      <h2 className="font-staatliches text-dark-green text-4xl font-black">
        Frequently asked questions
      </h2>
      <p className="font-satoshi mt-4 max-w-2xl text-xl font-medium text-black sm:text-base md:text-xl">
        Have a different question and can’t find the answer you’re looking for?
        Reach out to our support team by sending us an email and we’ll get back
        to you as soon as we can.
      </p>
      {/* Grid */}
      <div className="py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQItem({ question, answer }) {
  return (
    <div className="w-full py-4">
      <h3 className="font-satoshi text-dark-green text-xl font-black">
        {question}
      </h3>
      <dd className="font-satoshi mt-2 max-w-xl text-base font-light text-gray-800">
        {answer}
      </dd>
    </div>
  );
}
