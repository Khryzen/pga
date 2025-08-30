export default function Footer() {
  return (
    <footer className="bg-[#588de9] text-white py-10 mt-12">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left description + social icons */}
        <div>
          <p className="mb-4 text-sm leading-relaxed">
            Connecting the school&apos;s Catholic missionary identity with the
            online world.
          </p>
          <div className="flex space-x-4 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-gray-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-200">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-semibold mb-3">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our History
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Leadership
              </a>
            </li>
          </ul>
        </div>

        {/* Academics */}
        <div>
          <h4 className="font-semibold mb-3">Academics</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Programs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Admissions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Departments
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Alumni
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/40 mt-8 pt-4 text-center text-sm">
        © 2024 Puerto Galera Academy. All rights reserved.
      </div>
    </footer>
  );
}
