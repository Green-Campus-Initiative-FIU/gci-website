import { footer_navigation } from "@/constants";

export default function SimpleFooter() {
  return (
    <footer className="bg-light-green relative overflow-hidden">
      {/* Plant Background Image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop")`,
        }}
      />

      <div className="mx-auto max-w-7xl overflow-hidden px-6 sm:py-20 lg:px-8 relative z-10">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {footer_navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-staatliches text-base/6 font-normal text-white hover:font-semibold"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {footer_navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-dark-green text-white"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-white">
          &copy; 2025 Green Campus Initiative, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
